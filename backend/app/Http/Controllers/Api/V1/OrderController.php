<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

use App\Http\Resources\OrderResource;

class OrderController extends Controller
{
    /**
     * Display a listing of personal orders.
     */
    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->with(['items.product', 'items.variant'])
            ->latest()
            ->paginate(15);

        return OrderResource::collection($orders);
    }

    /**
     * Store a newly created order (Checkout).
     */
    public function store(Request $request)
    {
        $request->validate([
            'address_id' => 'nullable|exists:addresses,id',
            'address' => 'required_without:address_id|array',
            'address.name' => 'required_without:address_id|string|max:255',
            'address.email' => 'required_without:address_id|email|max:255',
            'address.address' => 'required_without:address_id|string',
            'address.phone' => 'required_without:address_id|string|max:20',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.variant_id' => 'nullable|exists:product_variants,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($request) {
            $customerName = '';
            $customerEmail = '';
            $shippingAddress = '';
            $phone = '';

            if ($request->address_id && $request->user()) {
                $address = \App\Models\Address::findOrFail($request->address_id);
                $customerName = $request->user()->name;
                $customerEmail = $request->user()->email;
                $shippingAddress = $address->address;
                $phone = $address->phone;
            } else {
                // High-fidelity fallback for Guest manifestations
                $customerName = $request->input('address.name') ?? ($request->user() ? $request->user()->name : '');
                $customerEmail = $request->input('address.email') ?? ($request->user() ? $request->user()->email : '');
                $shippingAddress = $request->input('address.address') ?? '';
                $phone = $request->input('address.phone') ?? '';
            }

            $totalAmount = 0;
            $orderItems = [];

            foreach ($request->items as $itemData) {
                $product = Product::lockForUpdate()->findOrFail($itemData['product_id']);
                
                // 1. Stock Validation
                if (!$product->is_active || $product->stock_quantity < $itemData['quantity']) {
                    throw ValidationException::withMessages([
                        'items' => ["Ritual failed: '{$product->name}' is currently out of manifestation (out of stock)."],
                    ]);
                }

                $price = $product->price;
                $variant = null;

                if (isset($itemData['variant_id'])) {
                    $variant = ProductVariant::findOrFail($itemData['variant_id']);
                    $price += $variant->price_adjustment;
                }

                $itemTotal = $price * $itemData['quantity'];
                $totalAmount += $itemTotal;

                // 2. Prepare Order Items
                $orderItems[] = [
                    'product_id' => $product->id,
                    'product_variant_id' => $variant ? $variant->id : null,
                    'quantity' => $itemData['quantity'],
                    'price' => $price,
                ];

                // 3. Decrement Stock
                $product->stock_quantity -= $itemData['quantity'];
                $product->save();
            }

            // 4. Create Order
            $order = Order::create([
                'order_number' => 'BK-' . strtoupper(Str::random(8)),
                'user_id' => $request->user() ? $request->user()->id : null,
                'status' => 'ordered',
                'customer_name' => $customerName,
                'customer_email' => $customerEmail,
                'shipping_address' => $shippingAddress,
                'phone' => $phone,
                'total_amount' => $totalAmount,
                'estimated_arrival' => now()->addDays(3),
            ]);

            // 5. Save Items
            foreach ($orderItems as $item) {
                $order->items()->create($item);
            }

            return response()->json([
                'message' => 'Ritual initiated. Your order has been placed successfully.',
                'order_number' => $order->order_number,
                'total_amount' => $totalAmount,
            ], 201);
        });
    }

    /**
     * Display the specified order.
     */
    public function show($orderNumber, Request $request)
    {
        $order = Order::where('order_number', $orderNumber)
            ->where('user_id', $request->user()->id)
            ->with(['items.product', 'items.variant'])
            ->firstOrFail();

        return new OrderResource($order);
    }
}
