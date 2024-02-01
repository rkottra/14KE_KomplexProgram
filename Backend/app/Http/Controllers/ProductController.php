<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::with("category")->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
       /* if (Auth::user()->tokenCan("insert"))
        {*/
            $termek = new Product();
            
            $termek->name       = $request->name;
            $termek->price      = $request->price;
            $termek->tax        = $request->tax;
            $termek->url        = $request->url;
            $termek->save();
            return $termek;
        /*} else {
            return response("Nincs jogod hozzá", 404);
        }*/

    }

    /**
     * Display the specified resource.
     */
    public function show(Product $termek)
    {
        return $termek;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $termek)
    {
        $termek->name       = $request->name;
        $termek->price      = $request->price;
        $termek->tax        = $request->tax;
        $termek->url        = $request->url;
        $termek->save();
        return $termek;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $termek)
    {
        return $termek->delete();
    }
}
