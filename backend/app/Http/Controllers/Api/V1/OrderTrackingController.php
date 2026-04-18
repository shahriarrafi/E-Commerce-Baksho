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
            'data' => [
                'order_number' => $order->order_number,
                'current_status' => $this->getStatusLabel($order->status),
                'customer_name' => $order->customer_name ?? 'কিউরেটর',
                'created_at' => $order->created_at->format('d M, Y'),
                'items_count' => $order->items->count(),
                'tracking_history' => $this->generateTrackingHistory($order),
            ]
        ]);
    }

    private function getStatusLabel($status)
    {
        switch ($status) {
            case 'ordered': return 'অর্ডার সম্পন্ন';
            case 'processing': return 'প্রস্তুত হচ্ছে';
            case 'shipped': return 'ডেলিভারিতে আছে';
            case 'delivered': return 'ডেলিভারি হয়েছে';
            default: return 'অজানা';
        }
    }

    private function generateTrackingHistory($order)
    {
        $statuses = ['ordered', 'processing', 'shipped', 'delivered'];
        $history = [];
        $currentIndex = array_search($order->status, $statuses);

        foreach ($statuses as $index => $status) {
            $is_completed = $index < $currentIndex;
            $is_current = $index === $currentIndex;
            
            $history[] = [
                'status' => $status,
                'label' => $this->getStatusLabel($status),
                'time' => $is_completed || $is_current ? ($index == 0 ? $order->created_at->format('h:i A') : 'প্রতীক্ষিত') : '--',
                'is_completed' => $is_completed,
                'is_current' => $is_current,
            ];
        }

        return $history;
    }
}
