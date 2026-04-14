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
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [\App\Http\Controllers\Api\V1\AuthController::class, 'logout']);
        Route::get('/me', [\App\Http\Controllers\Api\V1\AuthController::class, 'me']);
    });

    // Order Tracking Routes
    Route::get('/orders/track/{order_number}', [\App\Http\Controllers\Api\V1\OrderTrackingController::class, 'track']);

    // Product Routes
    Route::get('/products', function (Request $request) {
        $query = \App\Models\Product::where('is_active', true)
            ->with(['category', 'variants', 'specifications']);
        
        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        return \App\Http\Resources\ProductResource::collection($query->get());
    });

    Route::get('/products/{slug}', function ($slug) {
        $product = \App\Models\Product::where('slug', $slug)
            ->where('is_active', true)
            ->with(['category', 'variants', 'specifications'])
            ->firstOrFail();
            
        return new \App\Http\Resources\ProductResource($product);
    });

    // Category Routes
    Route::get('/categories', function () {
        $categories = \App\Models\Category::whereNull('parent_id')
            ->with('recursiveChildren')
            ->where('is_active', true)
            ->get();
        return \App\Http\Resources\CategoryResource::collection($categories);
    });
});
