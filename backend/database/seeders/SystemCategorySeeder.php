<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SystemCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Category::updateOrCreate(
            ['slug' => 'new-arrivals'],
            [
                'name' => 'New Arrivals',
                'is_active' => true,
                'icon' => 'heroicon-o-sparkles',
            ]
        );
    }
}
