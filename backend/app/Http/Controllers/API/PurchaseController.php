<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Purchase;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    public function index()
    {
        $purchases = Purchase::with('farm')->get();
        return response()->json([
            'data' => $purchases->map(function ($purchase) {
                return [
                    'id' => $purchase->id,
                    'farm_id' => $purchase->farm_id,
                    'purchase_date' => $purchase->purchase_date,
                    'item_name' => $purchase->item_name,
                    'quantity' => $purchase->quantity,
                    'cost' => $purchase->cost,
                    'farm' => $purchase->farm ? [
                        'id' => $purchase->farm->id,
                        'size' => $purchase->farm->size,
                    ] : null,
                    'created_at' => $purchase->created_at,
                    'updated_at' => $purchase->updated_at,
                ];
            }),
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'farm_id' => 'required|exists:farms,id',
            'purchase_date' => 'required|date',
            'item_name' => 'required|string|max:255',
            'quantity' => 'required|numeric|min:0',
            'cost' => 'required|numeric|min:0',
        ]);

        $purchase = Purchase::create($request->only([
            'farm_id',
            'purchase_date',
            'item_name',
            'quantity',
            'cost',
        ]));

        return response()->json([
            'message' => 'Purchase created successfully',
            'data' => [
                'id' => $purchase->id,
                'farm_id' => $purchase->farm_id,
                'purchase_date' => $purchase->purchase_date,
                'item_name' => $purchase->item_name,
                'quantity' => $purchase->quantity,
                'cost' => $purchase->cost,
            ],
        ], 201);
    }

    public function show(Purchase $purchase)
    {
        $purchase->load('farm');
        return response()->json([
            'data' => [
                'id' => $purchase->id,
                'farm_id' => $purchase->farm_id,
                'purchase_date' => $purchase->purchase_date,
                'item_name' => $purchase->item_name,
                'quantity' => $purchase->quantity,
                'cost' => $purchase->cost,
                'farm' => $purchase->farm ? [
                    'id' => $purchase->farm->id,
                    'size' => $purchase->farm->size,
                ] : null,
                'created_at' => $purchase->created_at,
                'updated_at' => $purchase->updated_at,
            ],
        ], 200);
    }

    public function update(Request $request, Purchase $purchase)
    {
        $request->validate([
            'farm_id' => 'required|exists:farms,id',
            'purchase_date' => 'required|date',
            'item_name' => 'required|string|max:255',
            'quantity' => 'required|numeric|min:0',
            'cost' => 'required|numeric|min:0',
        ]);

        $purchase->update($request->only([
            'farm_id',
            'purchase_date',
            'item_name',
            'quantity',
            'cost',
        ]));

        return response()->json([
            'message' => 'Purchase updated successfully',
            'data' => [
                'id' => $purchase->id,
                'farm_id' => $purchase->farm_id,
                'purchase_date' => $purchase->purchase_date,
                'item_name' => $purchase->item_name,
                'quantity' => $purchase->quantity,
                'cost' => $purchase->cost,
            ],
        ], 200);
    }

    public function destroy(Purchase $purchase)
    {
        $purchase->delete();
        return response()->json([
            'message' => 'Purchase deleted successfully',
        ], 200);
    }
}