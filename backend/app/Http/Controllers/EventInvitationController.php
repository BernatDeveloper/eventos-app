<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventInvitation;
use App\Models\User;
use App\Notifications\EventInvitationNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class EventInvitationController extends Controller
{
    /**
     * Send an invitation to a user for a specific event.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'event_id' => 'required|uuid|exists:events,id',
            'recipient_id' => 'required|uuid|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => __('invitations.validation_failed'),
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $event = Event::findOrFail($request->event_id);

            if (Auth::id() !== $event->creator_id) {
                return response()->json(['message' => __('invitations.unauthorized_invite')], 403);
            }

            if ($request->recipient_id === $event->creator_id) {
                return response()->json(['message' => __('invitations.cannot_invite_self')], 400);
            }

            if ($event->participant_limit && $event->participants()->count() >= $event->participant_limit) {
                return response()->json(['message' => __('invitations.participant_limit_reached')], 400);
            }

            $existingInvitation = EventInvitation::where('event_id', $event->id)
                ->where('recipient_id', $request->recipient_id)
                ->first();

            if ($existingInvitation) {
                return response()->json(['message' => __('invitations.already_invited')], 400);
            }

            $invitation = EventInvitation::create([
                'event_id' => $event->id,
                'sender_id' => Auth::id(),
                'recipient_id' => $request->recipient_id,
                'status' => 'pending',
            ]);

            User::findOrFail($request->recipient_id)->notify(new EventInvitationNotification($invitation));

            return response()->json([
                'message' => __('invitations.invitation_sent'),
                'invitation' => $invitation,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('invitations.error_sending'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Accept an event invitation.
     */
    public function accept($id)
    {
        try {
            $invitation = EventInvitation::findOrFail($id);

            if (Auth::id() !== $invitation->recipient_id) {
                return response()->json(['message' => __('invitations.unauthorized_accept')], 403);
            }

            if ($invitation->status !== 'pending') {
                return response()->json(['message' => __('invitations.already_processed')], 400);
            }

            if (
                $invitation->event->participant_limit &&
                $invitation->event->participants()->count() >= $invitation->event->participant_limit
            ) {
                $invitation->update(['status' => 'rejected']);
                return response()->json(['message' => __('invitations.participant_limit_reached')], 400);
            }

            $invitation->update(['status' => 'accepted']);
            $invitation->event->participants()->attach(Auth::id());

            return response()->json(['message' => __('invitations.accepted_successfully')], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('invitations.error_accepting'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Reject an event invitation.
     */
    public function reject($id)
    {
        try {
            $invitation = EventInvitation::findOrFail($id);

            if (Auth::id() !== $invitation->recipient_id) {
                return response()->json(['message' => __('invitations.unauthorized_reject')], 403);
            }

            if ($invitation->status !== 'pending') {
                return response()->json(['message' => __('invitations.already_processed')], 400);
            }

            $invitation->update(['status' => 'rejected']);

            return response()->json(['message' => __('invitations.rejected_successfully')], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('invitations.error_rejecting'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * List all invitations sent by the authenticated user.
     */
    public function sent()
    {
        try {
            $invitations = EventInvitation::where('sender_id', Auth::id())
                ->with(['event', 'recipient'])
                ->get();

            return response()->json([
                'message' => __('invitations.sent_retrieved'),
                'invitations' => $invitations,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('invitations.error_sent_retrieving'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * List all invitations received by the authenticated user.
     */
    public function received()
    {
        try {
            $invitations = EventInvitation::where('recipient_id', Auth::id())
                ->with(['event', 'sender'])
                ->get();

            return response()->json([
                'message' => __('invitations.received_retrieved'),
                'invitations' => $invitations,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('invitations.error_received_retrieving'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
