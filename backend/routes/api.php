<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckUserRole;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

// Rutas protegidas con autenticación JWT
Route::middleware('jwt.auth')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('/me', [UserController::class, 'getAuthUser']);

    // Rutas donde el usuario debe ser dueño de la cuenta o admin
    Route::middleware(CheckUserRole::class)->group(function () {
        Route::get('/user/{id}', [UserController::class, 'getUser']);
        Route::patch('/user/{id}/update-name', [UserController::class, 'updateUsername']);
        Route::patch('/user/{id}/update-image', [UserController::class, 'updateProfileImage']);
        Route::patch('/user/{id}/update-password', [UserController::class, 'updatePassword']);
        Route::delete('/user/{id}/delete', [UserController::class, 'deleteUser']);
    });
});
