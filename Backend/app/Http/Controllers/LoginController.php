<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use App\Models\User;
use App\Models\Permission;

class LoginController extends Controller
{
    public function register(Request $request) {
        try {
            $user = User::create([
                'name' => 'én',
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            return response()->json("új user sikerült", 200);
        } catch (Exception $e) {
            return response()->json("hiba:".$e->getMessage(), 503);
        }

    }

    public function login(Request $request) {
        try {
            //itt lesz a validáció

            if (!Auth::attempt($request->only(["email", "password"]))) {
                return response()->json("Nem megfelelő felhasználónév vagy jelszó!", 401);    
            }
            $user = User::where("email", $request->email)->first();
            
            $permissions = Permission::where("user_id", $user->id)->pluck("role");

            /*if ($user->email == "kottra.richard@jedlik.eu") {
                $response = new \Illuminate\Http\Response([ "token"=> $user->createToken("Termék", ["update", "delete", "insert"])->plainTextToken], 200);
            } else {
                $response = new \Illuminate\Http\Response([ "token"=> $user->createToken("Termék", ["insert"])->plainTextToken], 200);
            }*/
            
            $response = new \Illuminate\Http\Response([ 
                "token"=> $user->createToken("Termék", $permissions->toArray())->plainTextToken,
                "abilities" => $permissions->toArray()], 200);
            
 
/*            $response->withCookie(
                cookie('token', $user->createToken("név")->plainTextToken, 1800,null, null, false, false)
            );*/

            return $response;
            /*return response()->json([
                "token"=> 
            ], 200);*/

        } catch (Exception $e) {
            return response()->json("hiba", 503);
        }
    }

    /*public function logout(Request $request) {
        return response()->json($request->user(), 533);
    }*/
    public function logout() {
        Auth::user()->currentAccessToken()->delete();
        return response()->json("sikeres kijelentkezés", 200);
    }
}
