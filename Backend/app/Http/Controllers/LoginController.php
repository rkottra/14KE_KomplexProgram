<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

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
            
            return response()->json([
                "token"=> $user->createToken("név")->plainTextToken
            ], 200);

        } catch (Exception $e) {
            return response()->json("hiba", 503);
        }
    }
}
