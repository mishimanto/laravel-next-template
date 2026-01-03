<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Create Roles
        $roles = [
            [
                'name' => 'Super Admin',
                'slug' => 'super_admin',
                'description' => 'Has full system access',
                'permissions' => ['*'],
                'is_default' => false,
            ],
            [
                'name' => 'Admin',
                'slug' => 'admin',
                'description' => 'Can manage users and content',
                'permissions' => [
                    'user.create',
                    'user.read',
                    'user.update',
                    'user.delete',
                    'dashboard.view',
                    'settings.view',
                ],
                'is_default' => false,
            ],
            [
                'name' => 'User',
                'slug' => 'user',
                'description' => 'Regular user with basic access',
                'permissions' => [
                    'profile.view',
                    'profile.update',
                    'dashboard.view',
                ],
                'is_default' => true,
            ],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }

        // Create Super Admin User
        $superAdminRole = Role::where('slug', 'super_admin')->first();
        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'password' => Hash::make('password'),
            'role_id' => $superAdminRole->id,
            'phone' => '+1234567890',
            'is_active' => true,
        ]);

        // Create Admin User
        $adminRole = Role::where('slug', 'admin')->first();
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role_id' => $adminRole->id,
            'phone' => '+1234567891',
            'is_active' => true,
        ]);

        // Create Regular User
        $userRole = Role::where('slug', 'user')->first();
        User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role_id' => $userRole->id,
            'phone' => '+1234567892',
            'is_active' => true,
        ]);
    }
}