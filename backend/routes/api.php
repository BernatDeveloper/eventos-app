<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminUserController;
use App\Http\Middleware\IsUserAuth;
use App\Http\Middleware\IsAdmin;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
// Rutas para cualquier usuario autenticado
Route::middleware([IsUserAuth::class])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [UserController::class, 'getAuthUser']);
    Route::patch('/user/update-name', [UserController::class, 'updateUsername']);
    Route::patch('/user/update-image', [UserController::class, 'updateProfileImage']);
    Route::patch('/user/update-password', [UserController::class, 'updatePassword']);

    // Rutas exclusivas para el administrador
    Route::middleware([IsAdmin::class])->group(function () {
        Route::get('/users', [AdminUserController::class, 'getAllUsers']);
        Route::get('/user/{id}', [AdminUserController::class, 'getUser']);
        Route::put('/user/{id}/update', [AdminUserController::class, 'updateUser']);
        Route::patch('/user/{id}/update-image', [AdminUserController::class, 'updateProfileImage']);
        Route::patch('/user/{id}/update-password', [AdminUserController::class, 'updatePassword']);
        Route::patch('/user/{id}/update-type', [AdminUserController::class, 'updateType']);
        Route::patch('/user/{id}/update-role', [AdminUserController::class, 'updateRole']);
        Route::delete('/user/{id}', [AdminUserController::class, 'deleteUser']);
    });
});
