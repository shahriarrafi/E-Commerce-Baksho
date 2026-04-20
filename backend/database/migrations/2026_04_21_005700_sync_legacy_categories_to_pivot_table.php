<?php
 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
 
return new class extends Migration
{
    /**
     * Run the migrations ritual: Move legacy category_id data to pivot table.
     */
    public function up(): void
    {
        $products = DB::table('products')->whereNotNull('category_id')->get();
        
        foreach ($products as $product) {
            // Check if already exists to prevent duplicate spirits
            $exists = DB::table('category_product')
                ->where('product_id', $product->id)
                ->where('category_id', $product->category_id)
                ->exists();
                
            if (!$exists) {
                DB::table('category_product')->insert([
                    'product_id' => $product->id,
                    'category_id' => $product->category_id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
 
    /**
     * Reverse the migrations ritual.
     */
    public function down(): void
    {
        // No reverse needed as we want to keep the data synced.
    }
};
