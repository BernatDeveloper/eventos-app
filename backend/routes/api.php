<?php

use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Route; 
use App\Http\Controllers\AuthController; 

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

// Rutas protegidas con autenticación JWT
Route::middleware('jwt.auth')->group(function () {  
    Route::get('user', [AuthController::class, 'getUser']);
    Route::post('logout', [AuthController::class, 'logout']);
});
