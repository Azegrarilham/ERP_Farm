<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'farm_id',
        'name',
        'particular_price',
        'gros_price',
        'gros_threshold',
    ];

    // Cast decimal fields for proper type handling
    protected $casts = [
        'particular_price' => 'decimal:2',
        'gros_price' => 'decimal:2',
        'gros_threshold' => 'decimal:2',
    ];

    // Relationship: A product belongs to a farm
    public function farm()
    {
        return $this->belongsTo(Farm::class, 'farm_id');
    }

    // Relationship: A product has many order items
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'product_id');
    }
}