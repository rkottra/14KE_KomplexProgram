<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

use App\Http\Controllers\TermekController;
use App\Http\Controllers\LoginController;

Route::resource("termek", 
    TermekController::class)
    ->only(["index", "show"]);


Route::middleware('auth:sanctum')->resource("termek", 
    TermekController::class)
    ->except(["edit", "create", "index" ,"show"]);

Route::post("login",  [LoginController::class, 'login']);
Route::post("register",  [LoginController::class, 'register']);
Route::post("logout", [LoginController::class, 'logout']);