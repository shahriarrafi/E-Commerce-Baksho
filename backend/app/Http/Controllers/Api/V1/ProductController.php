<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a paginated listing of active products.
     */
    public function index(Request $request)
    {
        $query = Product::where('is_active', true)
            ->with(['categories', 'variants', 'specifications']);
        
        // Filter by category
        if ($request->has('category')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Support for Trending Products
        if ($request->has('trending')) {
            // For now, trending refers to recently created products
            // In high-scale environments, this would use 'view_count' or sales data
            $query->latest();
        } else {
            $query->latest();
        }

        $perPage = $request->query('limit', 20);

        // Implementation of optimized pagination for high traffic
        return ProductResource::collection($query->paginate($perPage));
    }

    /**
     * Manifest a single product discovery ritual.
     */
    public function show($slug)
    {
        $product = Product::where('slug', $slug)
            ->where('is_active', true)
            ->with(['categories', 'variants', 'specifications'])
            ->firstOrFail();
            
        return new ProductResource($product);
    }

    /**
     * High-speed search manifestation portal.
     */
    public function search(Request $request)
    {
        $q = $request->query('q');
        
        $products = Product::where('is_active', true)
            ->where(function ($query) use ($q) {
                $query->where('name', 'like', "%{$q}%")
                      ->orWhere('description', 'like', "%{$q}%");
            })
            ->with(['categories', 'variants', 'specifications'])
            ->paginate(20);

        return ProductResource::collection($products);
    }

    /**
     * Dedicated New Arrivals ritual.
     */
    public function newArrivals()
    {
        $products = Product::whereHas('categories', function($q) {
                $q->where('slug', 'new-arrivals');
            })
            ->where('is_active', true)
            ->with(['categories', 'variants', 'specifications'])
            ->latest()
            ->paginate(12);

        return ProductResource::collection($products);
    }
}
