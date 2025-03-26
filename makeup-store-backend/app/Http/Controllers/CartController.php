<?php
namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class CartController extends Controller
{
    // ✅ Ajouter un produit au panier (Gestion utilisateur et invité)
    public function addToCart(Request $request)
    {
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity', 1);

        try {
            // Tente de récupérer l'utilisateur authentifié via JWT
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }

        // Ajouter ou mettre à jour le panier pour l'utilisateur connecté
        $cartItem = Cart::where('user_id', $user->id)
                        ->where('product_id', $productId)
                        ->first();
    
        if ($cartItem) {
            // Si l'élément existe déjà, on met à jour la quantité
            $cartItem->quantity += $quantity;
            $cartItem->save();
        } else {
            // Sinon, on crée un nouvel élément dans le panier
            $cartItem = Cart::create([
                'user_id' => $user->id,
                'product_id' => $productId,
                'quantity' => $quantity,
            ]);
        }
    
        // Vérification si l'élément a bien été ajouté au panier
        \Log::info('Produit ajouté au panier', ['cart_item' => $cartItem]);
    
        return response()->json(['message' => 'Produit ajouté au panier'], 201);
    }

    // ✅ Récupérer le panier (avec détails des produits)
    public function getCart()
    {
        try {
            // Tente de récupérer l'utilisateur authentifié via JWT
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }

        $cartItems = Cart::with('product')->where('user_id', $user->id)->get();
        return response()->json($cartItems);
    }

    // ✅ Supprimer un produit du panier
    public function removeFromCart($cartId)
    {
        try {
            // Tente de récupérer l'utilisateur authentifié via JWT
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }

        $cartItem = Cart::where('id', $cartId)->where('user_id', $user->id)->first();

        if (!$cartItem) {
            return response()->json(['error' => 'Produit non trouvé dans le panier'], 404);
        }

        $cartItem->delete();
        return response()->json(['message' => 'Produit supprimé du panier']);
    }

    // ✅ Confirmer la commande (exige connexion)
    public function confirmOrder()
    {
        try {
            // Tente de récupérer l'utilisateur authentifié via JWT
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }

        $cartItems = Cart::where('user_id', $user->id)->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['error' => 'Votre panier est vide'], 400);
        }

        // 🔥 Ici, on peut ajouter la logique pour enregistrer la commande (Order model)
        // Pour l'instant, on vide juste le panier
        Cart::where('user_id', $user->id)->delete();

        return response()->json(['message' => 'Commande confirmée avec succès']);
    }
}
