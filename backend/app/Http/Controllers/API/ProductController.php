<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['farm', 'orderItems'])->get();
        return response()->json([
            'data' => $products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'farm_id' => $product->farm_id,
                    'name' => $product->name,
                    'particular_price' => $product->particular_price,
                    'gros_price' => $product->gros_price,
                    'gros_threshold' => $product->gros_threshold,
                    'farm' => $product->farm ? [
                        'id' => $product->farm->id,
                        'size' => $product->farm->size,
                    ] : null,
                    'order_items' => $product->orderItems->map(function ($orderItem) {
                        return [
                            'id' => $orderItem->id,
                            'quantity' => $orderItem->quantity,
                        ];
                    }),
                    'created_at' => $product->created_at,
                    'updated_at' => $product->updated_at,
                ];
            }),
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'farm_id' => 'required|exists:farms,id',
            'name' => 'required|string|max:255',
            'particular_price' => 'required|numeric|min:0',
            'gros_price' => 'required|numeric|min:0',
            'gros_threshold' => 'required|numeric|min:0',
        ]);

        $product = Product::create($request->only([
            'farm_id',
            'name',
            'particular_price',
            'gros_price',
            'gros_threshold',
        ]));

        return response()->json([
            'message' => 'Product created successfully',
            'data' => [
                'id' => $product->id,
                'farm_id' => $product->farm_id,
                'name' => $product->name,
                'particular_price' => $product->particular_price,
                'gros_price' => $product->gros_price,
                'gros_threshold' => $product->gros_threshold,
            ],
        ], 201);
    }

    public function show(Product $product)
    {
        $product->load(['farm', 'orderItems']);
        return response()->json([
            'data' => [
                'id' => $product->id,
                'farm_id' => $product->farm_id,
                'name' => $product->name,
                'particular_price' => $product->particular_price,
                'gros_price' => $product->gros_price,
                'gros_threshold' => $product->gros_threshold,
                'farm' => $product->farm ? [
                    'id' => $product->farm->id,
                    'size' => $product->farm->size,
                ] : null,
                'order_items' => $product->orderItems->map(function ($orderItem) {
                    return [
                        'id' => $orderItem->id,
                        'quantity' => $orderItem->quantity,
                    ];
                }),
                'created_at' => $product->created_at,
                'updated_at' => $product->updated_at,
            ],
        ], 200);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'farm_id' => 'required|exists:farms,id',
            'name' => 'required|string|max:255',
            'particular_price' => 'required|numeric|min:0',
            'gros_price' => 'required|numeric|min:0',
            'gros_threshold' => 'required|numeric|min:0',
        ]);

        $product->update($request->only([
            'farm_id',
            'name',
            'particular_price',
            'gros_price',
            'gros_threshold',
        ]));

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => [
                'id' => $product->id,
                'farm_id' => $product->farm_id,
                'name' => $product->name,
                'particular_price' => $product->particular_price,
                'gros_price' => $product->gros_price,
                'gros_threshold' => $product->gros_threshold,
            ],
        ], 200);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json([
            'message' => 'Product deleted successfully',
        ], 200);
    }
}