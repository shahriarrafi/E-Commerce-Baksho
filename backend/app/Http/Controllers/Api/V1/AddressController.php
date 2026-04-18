<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    /**
     * Display a listing of personal vault addresses.
     */
    public function index(Request $request)
    {
        return response()->json($request->user()->addresses);
    }

    /**
     * Store a newly created vault address.
     */
    public function store(Request $request)
    {
        $request->validate([
            'label' => 'nullable|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string|max:20',
            'is_default' => 'boolean',
        ]);

        if ($request->is_default) {
            $request->user()->addresses()->update(['is_default' => false]);
        }

        $address = $request->user()->addresses()->create($request->all());

        return response()->json($address, 201);
    }

    /**
     * Update the specified vault address.
     */
    public function update(Request $request, Address $address)
    {
        if ($address->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'label' => 'nullable|string|max:255',
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255',
            'address' => 'sometimes|string',
            'phone' => 'sometimes|string|max:20',
            'is_default' => 'boolean',
        ]);

        if ($request->is_default) {
            $request->user()->addresses()->update(['is_default' => false]);
        }

        $address->update($request->all());

        return response()->json($address);
    }

    /**
     * Remove the specified vault address.
     */
    public function destroy(Request $request, Address $address)
    {
        if ($address->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $address->delete();

        return response()->json(null, 204);
    }

    /**
     * Set the specified address as the default sanctuary.
     */
    public function setDefault(Request $request, Address $address)
    {
        if ($address->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->user()->addresses()->update(['is_default' => false]);
        $address->update(['is_default' => true]);

        return response()->json($address);
    }
}
