<?php
// app/Http/Controllers/Api/ProfileController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProfileController extends Controller
{
    // Get user profile
    public function show()
    {
        $user = Auth::user()->load('role');
        return response()->json([
            'success' => true,
            'user' => $user
        ]);
    }

    // Update profile information
    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'user' => $user->fresh()->load('role')
        ]);
    }

    // Update avatar
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = Auth::user();

        // Delete old avatar if exists
        if ($user->avatar && Storage::exists('public/avatars/' . $user->avatar)) {
            Storage::delete('public/avatars/' . $user->avatar);
        }

        // Store new avatar
        $avatarName = $user->id . '_avatar_' . time() . '.' . $request->avatar->extension();
        $request->avatar->storeAs('public/avatars', $avatarName);

        // Update user record
        $user->avatar = $avatarName;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Avatar updated successfully',
            'avatar_url' => Storage::url('avatars/' . $avatarName),
            'user' => $user->fresh()->load('role')
        ]);
    }

    // Change password
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|current_password',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = Auth::user();
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Password changed successfully'
        ]);
    }
}