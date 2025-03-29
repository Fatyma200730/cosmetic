<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ReviewController extends Controller
{
    // ✅ Récupérer tous les avis
    public function index()
    {
        $reviews = Review::all();
        return response()->json($reviews);
    }

    // ✅ Ajouter un avis sans connexion
    public function store(Request $request)
    {
        // Validation des données
        $request->validate([
            'name' => 'required|string|max:255', // ✅ Nom obligatoire
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // ✅ Vérification de l'image
        ]);

        $review = new Review();
        $review->name = $request->name;
        $review->rating = $request->rating;
        $review->comment = $request->comment;

        // ✅ Gérer l'upload d'image si présente
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('reviews', 'public'); // Stocker dans storage/app/public/reviews
            $review->image = $path;
        }

        $review->save();

        return response()->json($review, 201);
    }
}
