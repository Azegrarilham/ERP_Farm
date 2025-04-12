<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->bigIncrements('id'); // BIGINT, primary key, auto-increment
            $table->unsignedBigInteger('order_id'); // BIGINT, foreign key
            $table->unsignedBigInteger('product_id'); // BIGINT, foreign key
            $table->decimal('quantity', 8, 2); // DECIMAL(8,2)
            $table->decimal('subtotal', 8, 2); // DECIMAL(8,2)
            $table->timestamps(); // created_at, updated_at

            // Foreign key constraints
            $table->foreign('order_id')
                  ->references('id')
                  ->on('orders')
                  ->onDelete('cascade');

            $table->foreign('product_id')
                  ->references('id')
                  ->on('products')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};