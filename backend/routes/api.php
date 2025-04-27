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
use App\Http\Controllers\LocationController;
use App\Http\Controllers\NotificationController;
use App\Http\Middleware\EnsureUserOwnsEventParticipant;
use App\Http\Middleware\IsUserAuth;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Auth;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
// Rutas para cualquier usuario autenticado
Route::middleware([IsUserAuth::class])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // User
    Route::get('/me', [UserController::class, 'getAuthUser']);
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
        Route::patch('/events/{event}/locations', [EventController::class, 'updateLocation']);
        Route::delete('/events/{event}', [EventController::class, 'destroy']);
    });

    // Event participants
    Route::get('/user/participating-events', [EventParticipantController::class, 'participatingEvents']); // Listar eventos en los que el usuario está participando
    Route::get('/events/{event}/participants', [EventParticipantController::class, 'showParticipants']); // Mostrar participantes de un evento
    Route::post('/event-participants', [EventParticipantController::class, 'store']);
    Route::delete('/events/{event}/participants/{user}', [EventParticipantController::class, 'destroy'])->middleware([EnsureUserOwnsEventParticipant::class]);

    // Event invitation
    Route::post('/invitations', [EventInvitationController::class, 'store']);
    Route::put('/invitations/{id}/accept', [EventInvitationController::class, 'accept']);
    Route::put('/invitations/{id}/reject', [EventInvitationController::class, 'reject']);
    Route::get('/invitations/sent', [EventInvitationController::class, 'sent']);
    Route::get('/invitations/received', [EventInvitationController::class, 'received']);

    // Notification
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::get('/notifications/{id}', [NotificationController::class, 'show']);
    Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);


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
