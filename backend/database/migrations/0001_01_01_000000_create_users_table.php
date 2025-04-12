<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id'); // BIGINT, primary key, auto-increment
            $table->string('name'); // VARCHAR(255)
            $table->string('email')->unique(); // VARCHAR(255), unique
            $table->string('password'); // VARCHAR(255)
            $table->enum('role', ['farmer', 'client']); // ENUM('farmer', 'client')
            $table->timestamps(); // created_at, updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};