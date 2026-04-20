<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of root categories with recursive rituals.
     */
    public function index()
    {
        $categories = Category::whereNull('parent_id')
            ->with('recursiveChildren')
            ->where('is_active', true)
            ->get();
            
        return CategoryResource::collection($categories);
    }
}
