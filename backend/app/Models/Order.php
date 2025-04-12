<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'client_id',
        'farm_id',
        'total_price',
        'status',
    ];

    // Cast fields
    protected $casts = [
        'total_price' => 'decimal:2',
        'status' => 'string', // For enum
    ];

    // Relationship: An order belongs to a client (user)
    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    // Relationship: An order belongs to a farm
    public function farm()
    {
        return $this->belongsTo(Farm::class, 'farm_id');
    }

    // Relationship: An order has many order items
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }
}