<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_number' => $this->order_number,
            'status' => $this->status,
            'customer_name' => $this->customer_name,
            'customer_email' => $this->customer_email,
            'shipping_address' => $this->shipping_address,
            'phone' => $this->phone,
            'total_amount' => (float) $this->total_amount,
            'items' => OrderItemResource::collection($this->items),
            'estimated_arrival' => $this->estimated_arrival ? $this->estimated_arrival->format('M d, Y') : null,
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
