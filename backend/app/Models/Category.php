<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'parent_id',
        'icon',
        'is_active',
    ];

    protected static $permanentSlugs = ['new-arrivals'];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($category) {
            if (in_array($category->slug, static::$permanentSlugs)) {
                throw new \Exception("The ritual manifestation '{$category->name}' is permanent and cannot be banished.");
            }
        });

        static::updating(function ($category) {
            if ($category->isDirty('slug') && in_array($category->getOriginal('slug'), static::$permanentSlugs)) {
                $category->slug = $category->getOriginal('slug');
            }
        });
    }

    /**
     * Get the parent category.
     */
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    /**
     * Get the products in this category.
     */
    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    /**
     * Get the child categories.
     */
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    /**
     * Recursive relationship for children.
     */
    public function recursiveChildren()
    {
        return $this->children()->with('recursiveChildren');
    }
}
