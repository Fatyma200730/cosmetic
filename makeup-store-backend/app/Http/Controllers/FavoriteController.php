<?php
namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class FavoriteController extends Controller
{
    // Protéger toutes les routes du contrôleur avec JWT
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    // Récupérer les favoris de l'utilisateur connecté
    public function index()
    {
        $user = JWTAuth::parseToken()->authenticate();
        return response()->json($user->favorites()->with('product')->get());
    }

    // Ajouter un produit aux favoris
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        $user = JWTAuth::parseToken()->authenticate();

        $favorite = Favorite::firstOrCreate([
            'user_id' => $user->id,
            'product_id' => $request->product_id
        ]);

        return response()->json(['message' => 'Produit ajouté aux favoris', 'favorite' => $favorite]);
    }

    // Supprimer un produit des favoris
    public function destroy($id)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $favorite = Favorite::where('user_id', $user->id)->where('product_id', $id)->first();
        if ($favorite) {
            $favorite->delete();
            return response()->json(['message' => 'Produit retiré des favoris']);
        }
        return response()->json(['message' => 'Produit non trouvé'], 404);
    }
}
