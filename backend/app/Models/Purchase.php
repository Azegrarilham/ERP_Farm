<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    protected $fillable = [
        'farm_id',
        'purchase_date',
        'item_name',
        'quantity',
        'cost',
    ];

    // Cast fields
    protected $casts = [
        'purchase_date' => 'date',
        'quantity' => 'decimal:2',
        'cost' => 'decimal:2',
    ];

    // Relationship: A purchase belongs to a farm
    public function farm()
    {
        return $this->belongsTo(Farm::class, 'farm_id');
    }
}