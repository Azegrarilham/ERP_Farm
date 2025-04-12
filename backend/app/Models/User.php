<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    // Table name (optional, Laravel infers 'users' from class name)
    protected $table = 'users';

    // Fillable fields for mass assignment
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    // Hidden fields (e.g., for API responses)
    protected $hidden = [
        'password',
    ];

    // Cast fields (e.g., enum)
    protected $casts = [
        'role' => 'string', // Laravel 9+ can use enum casting, but string works for now
    ];

    // Relationship: A user (farmer) has one farm
    public function farm()
    {
        return $this->hasOne(Farm::class, 'user_id');
    }

    // Relationship: A user (client) has many orders
    public function orders()
    {
        return $this->hasMany(Order::class, 'client_id');
    }
}