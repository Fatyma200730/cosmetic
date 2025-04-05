<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class CartController extends Controller
{
    public function saveCart(Request $request)
    {
        dd($request->all());
        $user = Auth::user();
        $cartData = $request->input('cart');  // Panier envoyé depuis le frontend

        if (!$cartData || !is_array($cartData)) {
            return response()->json(['message' => 'Données du panier invalides', 'data' => $cartData], 400);
        }
        foreach ($cartData as $product) {
            $existingCartItem = Cart::where('user_id', $user->id)
                ->where('product_id', $product['product_id'])
                ->first();

            if ($existingCartItem) {
                // Mise à jour de la quantité du produit dans le panier
                $existingCartItem->update([
                    'quantity' => $product['quantity']
                ]);
            } else {
                // Ajout d'un nouveau produit au panier
                Cart::create([
                    'user_id' => $user->id,
                    'product_id' => $product['product_id'],
                    'quantity' => $product['quantity'],
                ]);
            }
        }

        return response()->json(['message' => 'Panier enregistré avec succès']);
    }
    public function addToCart(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Vous devez être connecté'], 401);
        }

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $product = Product::find($request->product_id);

        if (!$product) {
            return response()->json(['error' => 'Produit introuvable'], 404);
        }

        // Vérifier si le produit est déjà dans le panier
        $cartItem = Cart::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            // Si le produit existe déjà, on incrémente de 1 seulement
            $cartItem->quantity += 1;
            $cartItem->save();
        } else {
            // Sinon, on l'ajoute avec quantité 1
            $cartItem = Cart::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => 1
            ]);
        }

        return response()->json(['message' => 'Produit ajouté au panier', 'cart' => $cartItem], 201);
    }
    public function getCart()
    {
        $user = Auth::user();
        $cartItems = Cart::where('user_id', $user->id)->with('product')->get();

        return response()->json($cartItems);
    }


    public function updateCart(Request $request, $id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $cartItem = Cart::where('id', $id)->where('user_id', $user->id)->first();

            if (!$cartItem) {
                return response()->json(['error' => 'Produit non trouvé'], 404);
            }

            // Validation de la quantité
            $request->validate(['quantity' => 'required|integer|min:1']);

            // Mise à jour de la quantité
            $cartItem->update(['quantity' => $request->quantity]);

            return response()->json(['message' => 'Quantité mise à jour', 'cart' => $cartItem]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur mise à jour panier', 'details' => $e->getMessage()], 500);
        }
    }

    public function removeFromCart($id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $cartItem = Cart::where('id', $id)->where('user_id', $user->id)->first();

            if (!$cartItem) {
                return response()->json(['error' => 'Produit non trouvé'], 404);
            }

            $cartItem->delete();
            return response()->json(['message' => 'Produit supprimé du panier']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur suppression produit'], 500);
        }
    }
}
