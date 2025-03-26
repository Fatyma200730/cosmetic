<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::with('category')->get());
    }

    public function getNewArrivals() {
        $newArrivals = Product::orderBy('created_at', 'desc')->limit(12)->get();
        return response()->json($newArrivals);
    }

    public function searchByCategory(Request $request)
    {
        $query = $request->input('q');
    
        if (!$query) {
            return response()->json(['error' => 'Aucune requête fournie'], 400);
        }
    
        // Trouver la catégorie en ignorant la casse
        $category = Categorie::where('name', 'LIKE', "%" . strtolower($query) . "%")->first();
    
        if (!$category) {
            return response()->json(['message' => 'Aucune catégorie trouvée'], 404);
        }
    
        // Récupérer les produits associés
        $products = Product::where('category_id', $category->id)->get();
    
        return response()->json($products);
    }

    // App\Http\Controllers\ProductController.php

public function getProductsByCategory($category_id)
{
    // Vérifiez si la catégorie existe
    $category = Categorie::find($category_id);
    if (!$category) {
        return response()->json(['message' => 'Catégorie non trouvée'], 404);
    }

    // Récupérez les produits liés à cette catégorie
    $products = Product::where('category_id', $category_id)->get();

    // Retournez les produits au format JSON
    return response()->json($products);
}

public function show($id)
{
    $product = Product::with('category')->find($id);

    if (!$product) {
        return response()->json(['message' => 'Produit introuvable'], 404);
    }

    return response()->json($product);
}

    

    
}

