<?php

namespace App\Http\Controllers;

use App\Models\Termek;
use App\Http\Requests\StoreTermekRequest;
use App\Http\Requests\UpdateTermekRequest;
use Illuminate\Support\Facades\Auth;

class TermekController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Termek::get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTermekRequest $request)
    {
       /* if (Auth::user()->tokenCan("insert"))
        {*/
            $termek = new Termek();
            
            $termek->nev        = $request->nev;
            $termek->nettoAr    = $request->nettoAr;
            $termek->afa        = $request->afa;
            $termek->kepUrl     = $request->kepUrl;
            $termek->save();
            return $termek;
        /*} else {
            return response("Nincs jogod hozzá", 404);
        }*/

    }

    /**
     * Display the specified resource.
     */
    public function show(Termek $termek)
    {
        return $termek;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTermekRequest $request, Termek $termek)
    {
        $termek->nev        = $request->nev;
        $termek->nettoAr    = $request->nettoAr;
        $termek->afa        = $request->afa;
        $termek->kepUrl     = $request->kepUrl;
        $termek->save();
        return $termek;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Termek $termek)
    {
        return $termek->delete();
    }
}
