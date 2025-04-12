<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Farm;
use Illuminate\Http\Request;

class FarmController extends Controller
{
    public function index()
    {
        $farms = Farm::with(['user', 'products', 'purchases', 'orders'])->get();
        return response()->json([
            'data' => $farms->map(function ($farm) {
                return [
                    'id' => $farm->id,
                    'user_id' => $farm->user_id,
                    'size' => $farm->size,
                    'user' => $farm->user ? [
                        'id' => $farm->user->id,
                        'name' => $farm->user->name,
                        'email' => $farm->user->email,
                        'role' => $farm->user->role,
                    ] : null,
                    'products' => $farm->products->map(function ($product) {
                        return [
                            'id' => $product->id,
                            'name' => $product->name,
                        ];
                    }),
                    'purchases' => $farm->purchases->map(function ($purchase) {
                        return [
                            'id' => $purchase->id,
                            'item_name' => $purchase->item_name,
                        ];
                    }),
                    'orders' => $farm->orders->map(function ($order) {
                        return [
                            'id' => $order->id,
                            'total_price' => $order->total_price,
                        ];
                    }),
                    'created_at' => $farm->created_at,
                    'updated_at' => $farm->updated_at,
                ];
            }),
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id|unique:farms,user_id',
            'size' => 'required|numeric|min:0',
        ]);

        $farm = Farm::create($request->only(['user_id', 'size']));

        return response()->json([
            'message' => 'Farm created successfully',
            'data' => [
                'id' => $farm->id,
                'user_id' => $farm->user_id,
                'size' => $farm->size,
            ],
        ], 201);
    }

    public function show(Farm $farm)
    {
        $farm->load(['user', 'products', 'purchases', 'orders']);
        return response()->json([
            'data' => [
                'id' => $farm->id,
                'user_id' => $farm->user_id,
                'size' => $farm->size,
                'user' => $farm->user ? [
                    'id' => $farm->user->id,
                    'name' => $farm->user->name,
                    'email' => $farm->user->email,
                    'role' => $farm->user->role,
                ] : null,
                'products' => $farm->products->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                    ];
                }),
                'purchases' => $farm->purchases->map(function ($purchase) {
                    return [
                        'id' => $purchase->id,
                        'item_name' => $purchase->item_name,
                    ];
                }),
                'orders' => $farm->orders->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'total_price' => $order->total_price,
                    ];
                }),
                'created_at' => $farm->created_at,
                'updated_at' => $farm->updated_at,
            ],
        ], 200);
    }

    public function update(Request $request, Farm $farm)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id|unique:farms,user_id,' . $farm->id,
            'size' => 'required|numeric|min:0',
        ]);

        $farm->update($request->only(['user_id', 'size']));

        return response()->json([
            'message' => 'Farm updated successfully',
            'data' => [
                'id' => $farm->id,
                'user_id' => $farm->user_id,
                'size' => $farm->size,
            ],
        ], 200);
    }

    public function destroy(Farm $farm)
    {
        $farm->delete();
        return response()->json([
            'message' => 'Farm deleted successfully',
        ], 200);
    }
}