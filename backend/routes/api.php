<?php

use App\Http\Controllers\Admin\AdminEventController;
use App\Http\Controllers\Admin\AdminUserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventCategoryController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\EventInvitationController;
use App\Http\Controllers\EventParticipantController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\NotificationController;
use App\Http\Middleware\EnsureUserCreatorOrAdmin;
use App\Http\Middleware\EnsureUserOwnsEventParticipant;
use App\Http\Middleware\IsUserAuth;
use App\Http\Middleware\IsAdmin;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::get('locale/{lang}', [LocaleController::class, 'setLocale']);
Route::get('/locale', function () {
    return response()->json([
        'locale' => session('locale', 'es'), // 'es' por defecto
    ]);
});

// Rutas para cualquier usuario autenticado
Route::middleware([IsUserAuth::class])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // User
    Route::get('/me', [UserController::class, 'getAuthUser']);
    Route::get('/user/search-by-name', [UserController::class, 'searchByName'])->middleware([EnsureUserCreatorOrAdmin::class]);
    Route::patch('/user/update-name', [UserController::class, 'updateUsername']);

    // Categories
    Route::get('/event-categories', [EventCategoryController::class, 'index']);
    Route::get('/event-categories/{eventCategory}', [EventCategoryController::class, 'show']);

    // Locations
    Route::get('/locations/{location}', [LocationController::class, 'show']);
    Route::delete('/locations/{location}', [LocationController::class, 'destroy']);
    Route::post('/locations', [LocationController::class, 'store']);
    Route::middleware('location.owner_or_admin')->group(function () {
        Route::put('/locations/{location}', [LocationController::class, 'update']);
    });

    // Events
    Route::get('/my-events', [EventController::class, 'myEvents']);
    Route::post('/events', [EventController::class, 'store']);
    Route::get('/events/{event}', [EventController::class, 'show']);

    // Middleware with alias put it in bootstrap/app.php
    Route::middleware(['event.owner_or_admin'])->group(function () {
        Route::put('/events/{event}', [EventController::class, 'update']);
        Route::delete('/events/{event}', [EventController::class, 'destroy']);
        Route::patch('/events/{event}/locations', [EventController::class, 'updateLocation']);
        Route::patch('/events/{event}/category', [EventController::class, 'updateEventCategory']);
    });

    // Event participants
    Route::get('/user/participating-events', [EventParticipantController::class, 'participatingEvents']); // Listar eventos en los que el usuario está participando
    Route::get('/events/{event}/participants', [EventParticipantController::class, 'showParticipants']); // Mostrar participantes de un evento
    Route::post('/event-participants', [EventParticipantController::class, 'store']);
    Route::delete('/events/{event}/participants/{user}', [EventParticipantController::class, 'destroy'])->middleware([EnsureUserOwnsEventParticipant::class]);

    // Event invitation
    Route::post('/event-invitations', [EventInvitationController::class, 'store']);
    Route::put('/event-invitations/{id}/accept', [EventInvitationController::class, 'accept']);
    Route::put('/event-invitations/{id}/reject', [EventInvitationController::class, 'reject']);
    Route::get('/event-invitations/sent', [EventInvitationController::class, 'sent']);
    Route::get('/event-invitations/received', [EventInvitationController::class, 'received']);

    // Notification
    Route::prefix('notifications')->group(function () {
        Route::get('/', [NotificationController::class, 'index']);
        Route::get('/count', [NotificationController::class, 'count']);
        Route::get('/unread', [NotificationController::class, 'unread']);
        Route::put('/mark-all-as-read', [NotificationController::class, 'markAllAsRead']);
        Route::put('/{id}/mark-as-read', [NotificationController::class, 'markAsRead']);
        Route::delete('/{id}', [NotificationController::class, 'destroy']);
        Route::delete('/clear', [NotificationController::class, 'clear']);
    });

    // Rutas exclusivas para el administrador
    Route::middleware([IsAdmin::class])->group(function () {

        // User
        Route::get('/users', [AdminUserController::class, 'getAllUsers']);
        Route::get('/user/{id}', [AdminUserController::class, 'getUser']);
        Route::put('/user/{id}/update', [AdminUserController::class, 'updateUser']);
        Route::patch('/user/{id}/update-image', [AdminUserController::class, 'updateProfileImage']);
        Route::patch('/user/{id}/update-password', [AdminUserController::class, 'updatePassword']);
        Route::patch('/user/{id}/update-type', [AdminUserController::class, 'updateType']);
        Route::patch('/user/{id}/update-role', [AdminUserController::class, 'updateRole']);
        Route::delete('/user/{id}', [AdminUserController::class, 'deleteUser']);

        // Categories
        Route::post('/event-categories', [EventCategoryController::class, 'store']);
        Route::put('/event-categories/{eventCategory}', [EventCategoryController::class, 'update']);
        Route::delete('/event-categories/{eventCategory}', [EventCategoryController::class, 'destroy']);

        // Locations
        Route::get('/locations', [LocationController::class, 'index']);

        // Events
        Route::get('/events', [AdminEventController::class, 'index']);
    });
});
