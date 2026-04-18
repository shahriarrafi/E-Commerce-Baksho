<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => (float) $this->price,
            'inStock' => $this->stock_quantity > 0,
            'stock_quantity' => $this->stock_quantity,
            'shippingInfo' => $this->shipping_info,
            'isActive' => $this->is_active,
            'category' => $this->categories->first() ? $this->categories->first()->name : null,
            'category_slug' => $this->categories->first() ? $this->categories->first()->slug : null,
            'categories' => $this->categories->map(fn ($cat) => [
                'name' => $cat->name,
                'slug' => $cat->slug,
            ]),
            'images' => $this->getMedia('products')->map(fn ($media) => $media->getFullUrl()),
            'variants' => $this->variants->groupBy('type')->map(function ($items, $type) {
                return [
                    'type' => $type,
                    'options' => $items->pluck('name'),
                ];
            })->values(),
            'specifications' => $this->specifications->map(fn ($spec) => [
                'label' => $spec->label,
                'value' => $spec->value,
            ]),
            'created_at' => $this->created_at->format('M d, Y'),
        ];
    }
}
