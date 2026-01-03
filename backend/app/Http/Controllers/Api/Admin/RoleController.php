<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cache;
use App\Traits\ApiResponse;

class RoleController extends Controller
{
    use ApiResponse;

    public function index()
    {
        try {
            $roles = Cache::remember('all_roles', 3600, function () {
                return Role::all();
            });

            return $this->successResponse($roles, 'Roles retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to retrieve roles', $e->getMessage(), 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255|unique:roles',
                'slug' => 'required|string|max:255|unique:roles',
                'description' => 'nullable|string',
                'permissions' => 'required|array',
                'permissions.*' => 'string',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator);
            }

            $role = Role::create($request->all());

            Cache::forget('all_roles');

            return $this->successResponse($role, 'Role created successfully', 201);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to create role', $e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        try {
            $role = Cache::remember("role_{$id}", 3600, function () use ($id) {
                return Role::findOrFail($id);
            });

            return $this->successResponse($role, 'Role retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Role not found', $e->getMessage(), 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255|unique:roles,name,' . $id,
                'slug' => 'required|string|max:255|unique:roles,slug,' . $id,
                'description' => 'nullable|string',
                'permissions' => 'required|array',
                'permissions.*' => 'string',
            ]);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator);
            }

            $role = Role::findOrFail($id);
            $role->update($request->all());

            Cache::forget('all_roles');
            Cache::forget("role_{$id}");

            return $this->successResponse($role, 'Role updated successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to update role', $e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $role = Role::findOrFail($id);
            
            if ($role->is_default) {
                return $this->errorResponse('Cannot delete default role', null, 403);
            }

            if ($role->users()->count() > 0) {
                return $this->errorResponse('Cannot delete role with assigned users', null, 403);
            }

            $role->delete();

            Cache::forget('all_roles');
            Cache::forget("role_{$id}");

            return $this->successResponse(null, 'Role deleted successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to delete role', $e->getMessage(), 500);
        }
    }
}