<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use App\Traits\ApiResponse;

class DashboardController extends Controller
{
    use ApiResponse;

    public function stats()
    {
        try {
            $stats = Cache::remember('admin_dashboard_stats', 300, function () {
                return [
                    'total_users' => User::count(),
                    'active_users' => User::where('is_active', true)->count(),
                    'total_admins' => User::whereHas('role', function ($q) {
                        $q->whereIn('slug', ['super_admin', 'admin']);
                    })->count(),
                    'total_roles' => Role::count(),
                    'recent_users' => User::with('role')
                        ->orderBy('created_at', 'desc')
                        ->take(10)
                        ->get(),
                    'user_growth' => $this->getUserGrowthData(),
                ];
            });

            return $this->successResponse($stats, 'Dashboard stats retrieved');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to get dashboard stats', $e->getMessage(), 500);
        }
    }

    private function getUserGrowthData()
    {
        return User::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('COUNT(*) as count')
        )
        ->where('created_at', '>=', now()->subDays(30))
        ->groupBy('date')
        ->orderBy('date')
        ->get();
    }
}