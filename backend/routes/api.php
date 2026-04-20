<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    // Auth Routes
    Route::post('/register', [\App\Http\Controllers\Api\V1\AuthController::class, 'register']);
    Route::post('/login', [\App\Http\Controllers\Api\V1\AuthController::class, 'login']);
    
    // Global Order & Review Rituals
    Route::post('/orders', [\App\Http\Controllers\Api\V1\OrderController::class, 'store']);
    Route::get('/products/{slug}/reviews', [\App\Http\Controllers\Api\V1\ReviewController::class, 'getProductReviews']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [\App\Http\Controllers\Api\V1\AuthController::class, 'logout']);
        Route::get('/me', [\App\Http\Controllers\Api\V1\AuthController::class, 'me']);
        Route::put('/profile', [\App\Http\Controllers\Api\V1\AuthController::class, 'updateProfile']);

        // Authenticated Order History
        Route::get('/orders', [\App\Http\Controllers\Api\V1\OrderController::class, 'index']);
        
        // Authenticated Address Routes
        Route::get('/addresses', [\App\Http\Controllers\Api\V1\AddressController::class, 'index']);
        Route::post('/addresses', [\App\Http\Controllers\Api\V1\AddressController::class, 'store']);
        Route::put('/addresses/{address}', [\App\Http\Controllers\Api\V1\AddressController::class, 'update']);
        Route::delete('/addresses/{address}', [\App\Http\Controllers\Api\V1\AddressController::class, 'destroy']);
        Route::patch('/addresses/{address}/default', [\App\Http\Controllers\Api\V1\AddressController::class, 'setDefault']);

        // Review Submission Ritual
        Route::post('/reviews', [\App\Http\Controllers\Api\V1\ReviewController::class, 'store']);
    });

    // Review Discovery Ritual
    Route::get('/products/{slug}/reviews', [\App\Http\Controllers\Api\V1\ReviewController::class, 'getProductReviews']);

    // Order Tracking Routes
    Route::get('/orders/track/{order_number}', [\App\Http\Controllers\Api\V1\OrderTrackingController::class, 'track']);

    // Product Discovery Rituals
    Route::get('/products/search', [\App\Http\Controllers\Api\V1\ProductController::class, 'search']);
    Route::get('/products', [\App\Http\Controllers\Api\V1\ProductController::class, 'index']);
    Route::get('/products/{slug}', [\App\Http\Controllers\Api\V1\ProductController::class, 'show']);
    Route::get('/new-arrivals', [\App\Http\Controllers\Api\V1\ProductController::class, 'newArrivals']);

    // FAQ Knowledge Portal
    Route::get('/faqs', [\App\Http\Controllers\Api\V1\FAQController::class, 'index']);

    // Category Hierarchy Ritual
    Route::get('/categories', [\App\Http\Controllers\Api\V1\CategoryController::class, 'index']);
});
