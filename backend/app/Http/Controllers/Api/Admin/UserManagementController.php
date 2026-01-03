<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cache;
use App\Traits\ApiResponse;

class UserManagementController extends Controller
{
    use ApiResponse;

    public function index(Request $request)
    {
        try {
            $page = $request->get('page', 1);
            $perPage = $request->get('per_page', 10);
            $search = $request->get('search', '');

            $cacheKey = "admin_users_page_{$page}_per_{$perPage}_search_{$search}";
            
            $users = Cache::remember($cacheKey, 300, function () use ($search, $perPage) {
                $query = User::with('role')
                    ->when($search, function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                          ->orWhere('email', 'like', "%{$search}%")
                          ->orWhere('phone', 'like', "%{$search}%");
                    })
                    ->orderBy('created_at', 'desc');

                return $query->paginate($perPage);
            });

            return $this->successResponse($users, 'Users retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to retrieve users', $e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        try {
            $user = Cache::remember("user_{$id}_full", 300, function () use ($id) {
                return User::with('role')->findOrFail($id);
            });

            return $this->successResponse($user, 'User retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('User not found', $e->getMessage(), 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
                'phone' => 'nullable|string|max:20',
                'role_id' => 'sometimes|exists:roles,id',
                'is_active' => 'sometimes|boolean',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator);
            }

            $user = User::findOrFail($id);
            $user->update($request->all());

            Cache::forget("user_{$id}");
            Cache::forget("user_{$id}_full");
            Cache::forget('admin_dashboard_stats');

            return $this->successResponse($user, 'User updated successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to update user', $e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            
            if (auth()->id() == $id) {
                return $this->errorResponse('Cannot delete your own account', null, 403);
            }

            $user->delete();

            Cache::forget("user_{$id}");
            Cache::forget("user_{$id}_full");
            Cache::forget('admin_dashboard_stats');

            return $this->successResponse(null, 'User deleted successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to delete user', $e->getMessage(), 500);
        }
    }

    public function toggleStatus($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->is_active = !$user->is_active;
            $user->save();

            Cache::forget("user_{$id}");
            Cache::forget("user_{$id}_full");
            Cache::forget('admin_dashboard_stats');

            $status = $user->is_active ? 'activated' : 'deactivated';
            return $this->successResponse($user, "User {$status} successfully");
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to toggle user status', $e->getMessage(), 500);
        }
    }
}