<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Product;
use App\Models\Review;
use App\Models\Order;

class ReviewController extends Controller
{
    /**
     * Store a newly created review.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        // Ritual Verification: Check if curator has previously manifested this treasure
        $isVerified = Order::where('user_id', auth()->id())
            ->where('status', 'delivered')
            ->whereHas('items', function ($query) use ($validated) {
                $query->where('product_id', $validated['product_id']);
            })
            ->exists();

        $review = Review::create([
            'user_id' => auth()->id(),
            'product_id' => $validated['product_id'],
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'is_verified' => $isVerified,
            'is_visible' => true,
        ]);

        return response()->json([
            'message' => 'Review ritual complete. Your feedback has been unboxed.',
            'review' => $review
        ], 201);
    }

    /**
     * Display a listing of reviews for a product.
     */
    public function getProductReviews($slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();
        
        $reviews = Review::where('product_id', $product->id)
            ->where('is_visible', true)
            ->with('user:id,name')
            ->latest()
            ->get()
            ->map(function ($review) {
                return [
                    'id' => $review->id,
                    'user_id' => $review->user_id,
                    'user_name' => $review->user->name ?? 'কিউরেটর',
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'is_verified' => $review->is_verified,
                    'is_visible' => $review->is_visible,
                    'created_at' => $review->created_at,
                ];
            });

        return response()->json([
            'average_rating' => round($reviews->avg('rating'), 1) ?: 0,
            'total_reviews' => $reviews->count(),
            'reviews' => $reviews
        ]);
    }
}
