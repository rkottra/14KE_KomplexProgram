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

use App\Http\Controllers\ProductController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CategoryController;

// nem kell  hozzá jogosultság:
// GET típusú lekérések
Route::resource("termek", ProductController::class)->only(["index", "show"]);

// kell  hozzá jogosultság:
// POST/PUT/PATCH/DELETE típusú lekérések
/*Route::middleware('auth:sanctum')->resource("termek", ProductController::class)
    ->except(["edit", "create", "index" ,"show"]);*/
/*Route::middleware('auth:sanctum')->resource("termek", ProductController::class)
    ->only(["destroy", "update", "store"]);*/

Route::middleware(['auth:sanctum', 'ability:delete'])
    ->resource("termek", ProductController::class)
    ->only(["destroy"]);

Route::middleware(['auth:sanctum', 'ability:update'])
    ->resource("termek", ProductController::class)
    ->only(["destroy", "update"]);


Route::middleware(['auth:sanctum', 'ability:insert'])
    ->resource("termek", ProductController::class)
    ->only(["store"]);



Route::post("login",    [LoginController::class, 'login']);
Route::post("register", [LoginController::class, 'register']);
Route::middleware('auth:sanctum')->post("logout",   [LoginController::class, 'logout']);


Route::resource("kategoria", CategoryController::class)
    ->only(["index"]);
