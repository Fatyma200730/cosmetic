<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // ✅ Import du modèle User
use Tymon\JWTAuth\Facades\JWTAuth; // ✅ Import de JWTAuth
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // 🔹 Fonction d'inscription (Register)
    public function register(Request $request)
    {
        // ✅ Validation des données directement
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        // ✅ Création de l'utilisateur
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // ✅ Génération du token JWT
        $token = JWTAuth::fromUser($user);

        // ✅ Retourner le token et l'utilisateur
        return response()->json([
            'message' => 'Inscription réussie',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    // 🔹 Fonction de connexion (Login)
    public function login(Request $request)
    {
        // ✅ Validation des champs directement
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['message' => 'Identifiants incorrects'], 401);
        }

        return response()->json([
            'message' => 'Connexion réussie',
            'token' => $token,
            'user' => Auth::user()
        ]);
    }

    // 🔹 Fonction pour récupérer l'utilisateur connecté
    public function me()
    {
        return response()->json(Auth::user());
    }
}
