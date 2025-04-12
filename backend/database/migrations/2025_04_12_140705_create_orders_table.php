<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id'); // BIGINT, primary key, auto-increment
            $table->unsignedBigInteger('client_id'); // BIGINT, foreign key to users
            $table->unsignedBigInteger('farm_id'); // BIGINT, foreign key to farms
            $table->decimal('total_price', 8, 2); // DECIMAL(8,2)
            $table->enum('status', ['pending', 'confirmed', 'cancelled']); // ENUM
            $table->timestamps(); // created_at, updated_at

            // Foreign key constraints
            $table->foreign('client_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');

            $table->foreign('farm_id')
                  ->references('id')
                  ->on('farms')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};