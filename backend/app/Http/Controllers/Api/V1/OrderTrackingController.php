<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderTrackingController extends Controller
{
    /**
     * Track an order by its order number.
     */
    public function track($orderNumber)
    {
        $order = Order::where('order_number', $orderNumber)
            ->with(['items.product', 'items.variant'])
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Unable to find that ritual order. Please check the ID.',
            ], 404);
        }

        return response()->json([
            'id' => $order->order_number,
            'status' => $order->status,
            'items' => $order->items->map(function ($item) {
                return [
                    'name' => $item->product->name,
                    'price' => (float) $item->price,
                    'quantity' => $item->quantity,
                    'variant' => $item->variant ? $item->variant->name : null,
                ];
            }),
            'date' => $order->created_at->format('M d, Y'),
            'estimatedArrival' => $order->estimated_arrival ? $order->estimated_arrival->format('M d, Y') : 'Processing...',
            'total_amount' => (float) $order->total_amount,
        ]);
    }
}
