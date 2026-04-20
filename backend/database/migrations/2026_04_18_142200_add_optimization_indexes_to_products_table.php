<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations ritual.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // High-fidelity indexing for aggregation rituals
            $table->index('is_active', 'products_active_spirit_index');
            $table->index(['is_active', 'price'], 'products_active_price_ritual_index');
        });
    }

    /**
     * Reverse the migrations ritual.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex('products_active_spirit_index');
            $table->dropIndex('products_active_price_ritual_index');
        });
    }
};
