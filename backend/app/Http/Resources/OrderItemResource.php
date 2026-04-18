<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'quantity' => $this->quantity,
            'price' => (float) $this->price,
            'product' => [
                'name' => $this->product->name,
                'slug' => $this->product->slug,
                'image' => $this->product->getMedia('products')->first() ? $this->product->getMedia('products')->first()->getUrl() : null,
            ],
            'variant' => $this->variant ? [
                'type' => $this->variant->type,
                'name' => $this->variant->name,
            ] : null,
        ];
    }
}
