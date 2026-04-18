<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'shipping_info',
        'stock_quantity',
        'is_active',
        'category_id',
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($product) {
            $newArrivalsCategory = Category::where('slug', 'new-arrivals')->first();
            if ($newArrivalsCategory) {
                $product->categories()->attach($newArrivalsCategory->id);
            }
        });
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function specifications()
    {
        return $this->hasMany(ProductSpecification::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
