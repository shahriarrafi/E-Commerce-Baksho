<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'order_number',
        'user_id',
        'status',
        'customer_name',
        'customer_email',
        'shipping_address',
        'phone',
        'total_amount',
        'estimated_arrival',
    ];

    protected $casts = [
        'estimated_arrival' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
