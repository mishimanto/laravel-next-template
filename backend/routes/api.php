<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Api\Admin\UserManagementController;
use App\Http\Controllers\Api\User\DashboardController as UserDashboardController;

// Public routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
});

// Protected routes
Route::middleware(['jwt.auth'])->group(function () {
    
    // Auth routes
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });

    // User routes
    Route::prefix('user')->group(function () {
        Route::get('/dashboard', [UserDashboardController::class, 'index']);
    });

    // Admin routes - TEMPORARILY remove role middleware
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard/stats', [AdminDashboardController::class, 'stats']);
        
        // User Management
        Route::prefix('users')->group(function () {
            Route::get('/', [UserManagementController::class, 'index']);
            Route::get('/{id}', [UserManagementController::class, 'show']);
            Route::put('/{id}', [UserManagementController::class, 'update']);
            Route::delete('/{id}', [UserManagementController::class, 'destroy']);
            Route::post('/{id}/toggle-status', [UserManagementController::class, 'toggleStatus']);
        });
    });

    // Super Admin only routes - TEMPORARILY remove role middleware
    Route::prefix('super-admin')->group(function () {
        Route::apiResource('roles', \App\Http\Controllers\Api\Admin\RoleController::class);
    });

    Route::prefix('user')->group(function () {
        Route::get('/', [ProfileController::class, 'show']);
        Route::put('/profile', [ProfileController::class, 'update']);
        Route::post('/avatar', [ProfileController::class, 'updateAvatar']);
        Route::put('/password', [ProfileController::class, 'changePassword']);
    });
});