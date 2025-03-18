<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

// Rutas protegidas con autenticación JWT
Route::middleware('jwt.auth')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('/user/{id}', [UserController::class, 'getUser']);
    Route::patch('/user/{id}/update-name', [UserController::class, 'updateUsername']);
    Route::patch('/user/{id}/update-image', [UserController::class, 'updateProfileImage']);
    Route::patch('/user/{id}/update-password', [UserController::class, 'updatePassword']);
    Route::delete('/user/{id}/delete', [UserController::class, 'deleteUser']);
});
