<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Traits\ApiResponse;

class DashboardController extends Controller
{
    use ApiResponse;

    public function index(Request $request)
    {
        try {
            $user = $request->user();
            
            $dashboardData = Cache::remember("user_dashboard_{$user->id}", 300, function () use ($user) {
                return [
                    'user' => $user->load('role'),
                    'stats' => [
                        'joined_date' => $user->created_at->format('M d, Y'),
                        'account_status' => $user->is_active ? 'Active' : 'Inactive',
                        'last_login' => now()->format('Y-m-d H:i:s'),
                    ],
                    'recent_activity' => $this->getRecentActivity($user),
                ];
            });

            return $this->successResponse($dashboardData, 'User dashboard data retrieved');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to load dashboard', $e->getMessage(), 500);
        }
    }

    private function getRecentActivity($user)
    {
        return [
            [
                'id' => 1,
                'activity' => 'Account Created',
                'date' => $user->created_at->format('Y-m-d H:i'),
                'icon' => 'user-plus',
            ],
            [
                'id' => 2,
                'activity' => 'Profile Updated',
                'date' => $user->updated_at->format('Y-m-d H:i'),
                'icon' => 'edit',
            ],
        ];
    }
}