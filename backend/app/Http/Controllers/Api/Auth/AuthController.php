<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Cache;
use App\Traits\ApiResponse;

class AuthController extends Controller
{
    use ApiResponse;

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation failed', $validator->errors(), 422);
        }

        try {
            $userRole = Role::where('slug', 'user')->first();
            
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => $userRole->id,
                'phone' => $request->phone,
            ]);

            $token = JWTAuth::fromUser($user);

            Cache::put('user_' . $user->id, $user, 3600);

            return $this->successResponse([
                'user' => $user,
                'token' => $token,
                'token_type' => 'bearer',
                'expires_in' => config('jwt.ttl') * 60
            ], 'Registration successful', 201);
        } catch (\Exception $e) {
            return $this->errorResponse('Registration failed', $e->getMessage(), 500);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse('Validation failed', $validator->errors(), 422);
        }

        try {
            $credentials = $request->only('email', 'password');
            
            if (!$token = JWTAuth::attempt($credentials)) {
                return $this->errorResponse('Invalid credentials', null, 401);
            }

            $user = auth()->user();
            
            if (!$user->is_active) {
                auth()->logout();
                return $this->errorResponse('Account is deactivated', null, 403);
            }

            Cache::put('user_' . $user->id, $user, 3600);

            return $this->successResponse([
                'user' => $user,
                'token' => $token,
                'token_type' => 'bearer',
                'expires_in' => config('jwt.ttl') * 60,
                'role' => $user->role->slug
            ], 'Login successful');
        } catch (\Exception $e) {
            return $this->errorResponse('Login failed', $e->getMessage(), 500);
        }
    }

    public function logout()
    {
        try {
            $user = auth()->user();
            Cache::forget('user_' . $user->id);
            
            auth()->logout();
            
            return $this->successResponse(null, 'Successfully logged out');
        } catch (\Exception $e) {
            return $this->errorResponse('Logout failed', $e->getMessage(), 500);
        }
    }

    public function me()
    {
        try {
            $user = auth()->user();
            $cachedUser = Cache::remember('user_' . $user->id, 3600, function () use ($user) {
                return $user->load('role');
            });
            
            return $this->successResponse($cachedUser, 'User data retrieved');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to get user data', $e->getMessage(), 500);
        }
    }

    public function refresh()
    {
        try {
            $newToken = auth()->refresh();
            
            return $this->successResponse([
                'token' => $newToken,
                'token_type' => 'bearer',
                'expires_in' => config('jwt.ttl') * 60
            ], 'Token refreshed successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Token refresh failed', $e->getMessage(), 401);
        }
    }
}