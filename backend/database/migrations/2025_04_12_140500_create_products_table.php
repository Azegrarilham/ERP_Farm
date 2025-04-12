<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id'); // BIGINT, primary key, auto-increment
            $table->unsignedBigInteger('farm_id'); // BIGINT, foreign key
            $table->string('name'); // VARCHAR(255)
            $table->decimal('particular_price', 8, 2); // DECIMAL(8,2)
            $table->decimal('gros_price', 8, 2); // DECIMAL(8,2)
            $table->decimal('gros_threshold', 8, 2); // DECIMAL(8,2)
            $table->timestamps(); // created_at, updated_at

            // Foreign key constraint
            $table->foreign('farm_id')
                  ->references('id')
                  ->on('farms')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};