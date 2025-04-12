<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Farm extends Model
{
    protected $fillable = [
        'user_id',
        'size',
    ];

    // Relationship: A farm belongs to a user (farmer)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relationship: A farm has many products
    public function products()
    {
        return $this->hasMany(Product::class, 'farm_id');
    }

    // Relationship: A farm has many purchases
    public function purchases()
    {
        return $this->hasMany(Purchase::class, 'farm_id');
    }

    // Relationship: A farm has many orders (received from clients)
    public function orders()
    {
        return $this->hasMany(Order::class, 'farm_id');
    }
}