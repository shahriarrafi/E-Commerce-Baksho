<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FAQ;
use Illuminate\Http\Request;

class FAQController extends Controller
{
    /**
     * Display a listing of grouped FAQs.
     */
    public function index()
    {
        return response()->json(
            FAQ::where('is_active', true)
                ->orderBy('sort_order')
                ->get()
                ->groupBy('category')
        );
    }
}
