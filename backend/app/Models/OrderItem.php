<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'subtotal',
    ];

    // Cast fields
    protected $casts = [
        'quantity' => 'decimal:2',
        'subtotal' => 'decimal:2',
    ];

    // Relationship: An order item belongs to an order
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    // Relationship: An order item belongs to a product
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}