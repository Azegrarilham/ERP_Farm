<?php

use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\FarmController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\PurchaseController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\OrderItemController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('api')->group(function () {
    // Users Routes
    Route::get('users', [UserController::class, 'index']);         // List all users
    Route::post('users', [UserController::class, 'store']);        // Create a user
    Route::get('users/{user}', [UserController::class, 'show']);   // Show a user
    Route::put('users/{user}', [UserController::class, 'update']); // Update a user
    Route::delete('users/{user}', [UserController::class, 'destroy']); // Delete a user

    // Farms Routes
    Route::get('farms', [FarmController::class, 'index']);
    Route::post('farms', [FarmController::class, 'store']);
    Route::get('farms/{farm}', [FarmController::class, 'show']);
    Route::put('farms/{farm}', [FarmController::class, 'update']);
    Route::delete('farms/{farm}', [FarmController::class, 'destroy']);

    // Products Routes
    Route::get('products', [ProductController::class, 'index']);
    Route::post('products', [ProductController::class, 'store']);
    Route::get('products/{product}', [ProductController::class, 'show']);
    Route::put('products/{product}', [ProductController::class, 'update']);
    Route::delete('products/{product}', [ProductController::class, 'destroy']);

    // Purchases Routes
    Route::get('purchases', [PurchaseController::class, 'index']);
    Route::post('purchases', [PurchaseController::class, 'store']);
    Route::get('purchases/{purchase}', [PurchaseController::class, 'show']);
    Route::put('purchases/{purchase}', [PurchaseController::class, 'update']);
    Route::delete('purchases/{purchase}', [PurchaseController::class, 'destroy']);

    // Orders Routes
    Route::get('orders', [OrderController::class, 'index']);
    Route::post('orders', [OrderController::class, 'store']);
    Route::get('orders/{order}', [OrderController::class, 'show']);
    Route::put('orders/{order}', [OrderController::class, 'update']);
    Route::delete('orders/{order}', [OrderController::class, 'destroy']);

    // Order Items Routes
    Route::get('order-items', [OrderItemController::class, 'index']);
    Route::post('order-items', [OrderItemController::class, 'store']);
    Route::get('order-items/{orderItem}', [OrderItemController::class, 'show']);
    Route::put('order-items/{orderItem}', [OrderItemController::class, 'update']);
    Route::delete('order-items/{orderItem}', [OrderItemController::class, 'destroy']);
});