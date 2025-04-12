<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('purchases', function (Blueprint $table) {
            $table->bigIncrements('id'); // BIGINT, primary key, auto-increment
            $table->unsignedBigInteger('farm_id'); // BIGINT, foreign key
            $table->date('purchase_date'); // DATE
            $table->string('item_name'); // VARCHAR(255)
            $table->decimal('quantity', 8, 2); // DECIMAL(8,2)
            $table->decimal('cost', 8, 2); // DECIMAL(8,2)
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
        Schema::dropIfExists('purchases');
    }
};