<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    // 🔹 Inscription (Register)
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'phone' => 'nullable|string|max:15',
            'address' => 'nullable|string|max:255',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);
                
        return response()->json([
            'message' => 'Inscription réussie',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    // 🔹 Connexion (Login)
    public function login(Request $request)
    {
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
            'user' => auth()->user(),
            'token' => $token
        ]);
    }

    // 🔹 Récupération des infos utilisateur connecté
    public function me()
    {
        try {
            $user = auth()->user();  // Récupérer l'utilisateur connecté
            if (!$user) {
                return response()->json(['message' => 'Utilisateur non authentifié'], 401);
            }
            return response()->json($user);  // Retourner les informations de l'utilisateur
        } catch (JWTException $e) {
            return response()->json(['message' => 'Token invalide ou expiré'], 401);
        }
    }

    // 🔹 Mettre à jour les informations de l'utilisateur
    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:15',
            'password' => 'nullable|string|min:6',  // Si l'utilisateur veut changer son mot de passe
        ]);

        $user = auth()->user();  // Récupérer l'utilisateur connecté

        // Mettre à jour les informations
        $user->name = $request->name;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->phone = $request->phone;

        // Si l'utilisateur a fourni un nouveau mot de passe, on le hache et on le met à jour
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();  // Sauvegarder les modifications dans la base de données

        return response()->json($user);  // Retourner les informations mises à jour
    }

    // 🔹 Mettre à jour la photo de profil de l'utilisateur

    public function uploadProfileImage(Request $request)
    {
        $request->validate([
            'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    
        $user = auth()->user();  // Récupérer l'utilisateur connecté
        $imageName = time() . '.' . $request->profile_image->extension();  // Nom unique pour l'image
    
        // Stocker l'image dans storage/app/public/profile_images en utilisant la façade Storage
        Storage::disk('public')->putFileAs('profile_images', $request->file('profile_image'), $imageName);
    
        // Générer l'URL publique accessible (assurez-vous d'avoir créé le lien symbolique avec "php artisan storage:link")
        $user->profile_image = Storage::url('profile_images/' . $imageName);
        $user->save();  // Sauvegarder le chemin dans la base de données
    
        return response()->json(['profile_image' => $user->profile_image]);
    }
    
    // 🔹 Déconnexion
    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(['message' => 'Déconnexion réussie']);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Échec de la déconnexion'], 500);
        }
    }

    // 🔹 Rafraîchir le token
    public function refresh()
    {
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            return response()->json(['token' => $newToken]);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Impossible de rafraîchir le token'], 401);
        }
    }
}
