<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with(['farm', 'orders'])->get();
        return response()->json([
            'data' => $users->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'farm' => $user->farm ? [
                        'id' => $user->farm->id,
                        'size' => $user->farm->size,
                    ] : null,
                    'orders' => $user->orders->map(function ($order) {
                        return [
                            'id' => $order->id,
                            'total_price' => $order->total_price,
                            'status' => $order->status,
                        ];
                    }),
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                ];
            }),
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'required|in:farmer,client',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ], 201);
    }

    public function show(User $user)
    {
        $user->load(['farm', 'orders']);
        return response()->json([
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'farm' => $user->farm ? [
                    'id' => $user->farm->id,
                    'size' => $user->farm->size,
                ] : null,
                'orders' => $user->orders->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'total_price' => $order->total_price,
                        'status' => $order->status,
                    ];
                }),
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ],
        ], 200);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|in:farmer,client',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
        ]);

        return response()->json([
            'message' => 'User updated successfully',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ], 200);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([
            'message' => 'User deleted successfully',
        ], 200);
    }
}