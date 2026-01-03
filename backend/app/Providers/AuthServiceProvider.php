<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->registerPolicies();

        // Define super admin gate
        Gate::define('super_admin', function ($user) {
            return $user->role->slug === 'super_admin';
        });

        // Define admin gate
        Gate::define('admin', function ($user) {
            return in_array($user->role->slug, ['super_admin', 'admin']);
        });

        // Define user gate
        Gate::define('user', function ($user) {
            return $user->role->slug === 'user';
        });

        // Dynamic permission check
        Gate::define('has_permission', function ($user, $permission) {
            if ($user->role->slug === 'super_admin') {
                return true;
            }
            
            return $user->role->hasPermission($permission);
        });
    }
}