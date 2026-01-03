<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;

class LogoutController extends Controller
{
    use ApiResponse;

    public function logout(Request $request)
    {
        try {
            auth()->logout();
            
            return $this->successResponse(null, 'Successfully logged out');
        } catch (\Exception $e) {
            return $this->errorResponse('Logout failed', $e->getMessage(), 500);
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