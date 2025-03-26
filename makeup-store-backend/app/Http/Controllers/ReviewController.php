<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth; // Importer JWTAuth pour l'authentification

class ReviewController extends Controller
{
    // Récupérer tous les avis avec les informations sur l'utilisateur
    public function index()
    {
        $reviews = Review::with('user')->get();
        return response()->json($reviews);
    }

    // Ajouter un nouvel avis
    public function store(Request $request)
    {
        // Vérifier les données et créer un avis
        $user = auth()->user(); // Récupérer l'utilisateur authentifié via JWT
    
        // Validation
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
        ]);
    
        $review = new Review();
        $review->rating = $request->input('rating');
        $review->comment = $request->input('comment');
        $review->user_id = $user->id;
        $review->save();
    
        return response()->json($review, 201);
    }
    
}
