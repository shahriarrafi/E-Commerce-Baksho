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
        Route::put('/profile', [\App\Http\Controllers\Api\V1\AuthController::class, 'updateProfile']);

        // Authenticated Order Routes
        Route::get('/orders', [\App\Http\Controllers\Api\V1\OrderController::class, 'index']);
        Route::post('/orders', [\App\Http\Controllers\Api\V1\OrderController::class, 'store']);
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

    // Product Routes
    Route::get('/products/search', function (Request $request) {
        $q = $request->query('q');
        $products = \App\Models\Product::where('is_active', true)
            ->where(function ($query) use ($q) {
                $query->where('name', 'like', "%{$q}%")
                      ->orWhere('description', 'like', "%{$q}%");
            })
            ->with(['categories', 'variants', 'specifications'])
            ->get();
        return \App\Http\Resources\ProductResource::collection($products);
    });

    Route::get('/products', function (Request $request) {
        $query = \App\Models\Product::where('is_active', true)
            ->with(['categories', 'variants', 'specifications']);
        
        if ($request->has('category')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        return \App\Http\Resources\ProductResource::collection($query->get());
    });

    Route::get('/products/{slug}', function ($slug) {
        $product = \App\Models\Product::where('slug', $slug)
            ->where('is_active', true)
            ->with(['categories', 'variants', 'specifications'])
            ->firstOrFail();
            
        return new \App\Http\Resources\ProductResource($product);
    });

    // FAQ Routes
    Route::get('/faqs', function () {
        return response()->json(
            \App\Models\FAQ::where('is_active', true)
                ->orderBy('sort_order')
                ->get()
                ->groupBy('category')
        );
    });

    // Category Routes
    Route::get('/categories', function () {
        $categories = \App\Models\Category::whereNull('parent_id')
            ->with('recursiveChildren')
            ->where('is_active', true)
            ->get();
        return \App\Http\Resources\CategoryResource::collection($categories);
    });

    // Dedicated New Arrivals Ritual
    Route::get('/new-arrivals', function () {
        $products = \App\Models\Product::whereHas('categories', function($q) {
                $q->where('slug', 'new-arrivals');
            })
            ->where('is_active', true)
            ->with(['categories', 'variants', 'specifications'])
            ->latest()
            ->get();
        return \App\Http\Resources\ProductResource::collection($products);
    });
});
