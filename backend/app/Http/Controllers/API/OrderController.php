<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['client', 'farm', 'orderItems'])->get();
        return response()->json([
            'data' => $orders->map(function ($order) {
                return [
                    'id' => $order->id,
                    'client_id' => $order->client_id,
                    'farm_id' => $order->farm_id,
                    'total_price' => $order->total_price,
                    'status' => $order->status,
                    'client' => $order->client ? [
                        'id' => $order->client->id,
                        'name' => $order->client->name,
                        'email' => $order->client->email,
                    ] : null,
                    'farm' => $order->farm ? [
                        'id' => $order->farm->id,
                        'size' => $order->farm->size,
                    ] : null,
                    'order_items' => $order->orderItems->map(function ($orderItem) {
                        return [
                            'id' => $orderItem->id,
                            'product_id' => $orderItem->product_id,
                            'quantity' => $orderItem->quantity,
                            'subtotal' => $orderItem->subtotal,
                        ];
                    }),
                    'created_at' => $order->created_at,
                    'updated_at' => $order->updated_at,
                ];
            }),
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'client_id' => 'required|exists:users,id',
            'farm_id' => 'required|exists:farms,id',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $order = Order::create($request->only([
            'client_id',
            'farm_id',
            'total_price',
            'status',
        ]));

        return response()->json([
            'message' => 'Order created successfully',
            'data' => [
                'id' => $order->id,
                'client_id' => $order->client_id,
                'farm_id' => $order->farm_id,
                'total_price' => $order->total_price,
                'status' => $order->status,
            ],
        ], 201);
    }

    public function show(Order $order)
    {
        $order->load(['client', 'farm', 'orderItems']);
        return response()->json([
            'data' => [
                'id' => $order->id,
                'client_id' => $order->client_id,
                'farm_id' => $order->farm_id,
                'total_price' => $order->total_price,
                'status' => $order->status,
                'client' => $order->client ? [
                    'id' => $order->client->id,
                    'name' => $order->client->name,
                    'email' => $order->client->email,
                ] : null,
                'farm' => $order->farm ? [
                    'id' => $order->farm->id,
                    'size' => $order->farm->size,
                ] : null,
                'order_items' => $order->orderItems->map(function ($orderItem) {
                    return [
                        'id' => $orderItem->id,
                        'product_id' => $orderItem->product_id,
                        'quantity' => $orderItem->quantity,
                        'subtotal' => $orderItem->subtotal,
                    ];
                }),
                'created_at' => $order->created_at,
                'updated_at' => $order->updated_at,
            ],
        ], 200);
    }

    public function update(Request $request, Order $order)
    {
        $request->validate([
            'client_id' => 'required|exists:users,id',
            'farm_id' => 'required|exists:farms,id',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $order->update($request->only([
            'client_id',
            'farm_id',
            'total_price',
            'status',
        ]));

        return response()->json([
            'message' => 'Order updated successfully',
            'data' => [
                'id' => $order->id,
                'client_id' => $order->client_id,
                'farm_id' => $order->farm_id,
                'total_price' => $order->total_price,
                'status' => $order->status,
            ],
        ], 200);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json([
            'message' => 'Order deleted successfully',
        ], 200);
    }
}