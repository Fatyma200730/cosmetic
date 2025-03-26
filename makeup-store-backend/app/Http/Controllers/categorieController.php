<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;

class categorieController extends Controller
{
    public function index()
    {
        // Récupérer toutes les catégories
        $categories = Categorie::all();
        
        // Retourner les catégories sous forme de réponse JSON
        return response()->json($categories);
    }
    
}
