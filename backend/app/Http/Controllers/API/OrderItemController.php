<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    public function index()
    {
        $orderItems = OrderItem::with(['order', 'product'])->get();
        return response()->json([
            'data' => $orderItems->map(function ($orderItem) {
                return [
                    'id' => $orderItem->id,
                    'order_id' => $orderItem->order_id,
                    'product_id' => $orderItem->product_id,
                    'quantity' => $orderItem->quantity,
                    'subtotal' => $orderItem->subtotal,
                    'order' => $orderItem->order ? [
                        'id' => $orderItem->order->id,
                        'total_price' => $orderItem->order->total_price,
                    ] : null,
                    'product' => $orderItem->product ? [
                        'id' => $orderItem->product->id,
                        'name' => $orderItem->product->name,
                    ] : null,
                    'created_at' => $orderItem->created_at,
                    'updated_at' => $orderItem->updated_at,
                ];
            }),
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric|min:0',
            'subtotal' => 'required|numeric|min:0',
        ]);

        $orderItem = OrderItem::create($request->only([
            'order_id',
            'product_id',
            'quantity',
            'subtotal',
        ]));

        return response()->json([
            'message' => 'Order Item created successfully',
            'data' => [
                'id' => $orderItem->id,
                'order_id' => $orderItem->order_id,
                'product_id' => $orderItem->product_id,
                'quantity' => $orderItem->quantity,
                'subtotal' => $orderItem->subtotal,
            ],
        ], 201);
    }

    public function show(OrderItem $orderItem)
    {
        $orderItem->load(['order', 'product']);
        return response()->json([
            'data' => [
                'id' => $orderItem->id,
                'order_id' => $orderItem->order_id,
                'product_id' => $orderItem->product_id,
                'quantity' => $orderItem->quantity,
                'subtotal' => $orderItem->subtotal,
                'order' => $orderItem->order ? [
                    'id' => $orderItem->order->id,
                    'total_price' => $orderItem->order->total_price,
                ] : null,
                'product' => $orderItem->product ? [
                    'id' => $orderItem->product->id,
                    'name' => $orderItem->product->name,
                ] : null,
                'created_at' => $orderItem->created_at,
                'updated_at' => $orderItem->updated_at,
            ],
        ], 200);
    }

    public function update(Request $request, OrderItem $orderItem)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric|min:0',
            'subtotal' => 'required|numeric|min:0',
        ]);

        $orderItem->update($request->only([
            'order_id',
            'product_id',
            'quantity',
            'subtotal',
        ]));

        return response()->json([
            'message' => 'Order Item updated successfully',
            'data' => [
                'id' => $orderItem->id,
                'order_id' => $orderItem->order_id,
                'product_id' => $orderItem->product_id,
                'quantity' => $orderItem->quantity,
                'subtotal' => $orderItem->subtotal,
            ],
        ], 200);
    }

    public function destroy(OrderItem $orderItem)
    {
        $orderItem->delete();
        return response()->json([
            'message' => 'Order Item deleted successfully',
        ], 200);
    }
}