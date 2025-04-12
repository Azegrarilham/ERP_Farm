<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('farms', function (Blueprint $table) {
            $table->bigIncrements('id'); // BIGINT, primary key, auto-increment
            $table->unsignedBigInteger('user_id')->unique(); // BIGINT, foreign key, unique (one farm per farmer)
            $table->decimal('size', 8, 2); // DECIMAL(8,2)
            $table->string('location'); // DECIMAL(8,2)
            $table->timestamps(); // created_at, updated_at
            // Foreign key constraint
            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('farms');
    }
};