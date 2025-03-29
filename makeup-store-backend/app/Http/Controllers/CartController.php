<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use Tymon\JWTAuth\Facades\JWTAuth;

class CartController extends Controller
{
    public function getCart()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $cartItems = Cart::where('user_id', $user->id)->with('product')->get();
            return response()->json($cartItems);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la récupération du panier'], 500);
        }
    }

    public function updateCart(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $cartItem = Cart::where('id', $request->cart_id)->where('user_id', $user->id)->first();

            if (!$cartItem) {
                return response()->json(['error' => 'Produit non trouvé'], 404);
            }

            if ($request->quantity < 1) {
                $cartItem->delete();
                return response()->json(['message' => 'Produit supprimé du panier']);
            }

            $cartItem->quantity = $request->quantity;
            $cartItem->save();

            return response()->json(['message' => 'Quantité mise à jour', 'cart' => $cartItem]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur mise à jour panier', 'details' => $e->getMessage()], 500);
        }
    }

    public function removeFromCart($cartId)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $cartItem = Cart::where('id', $cartId)->where('user_id', $user->id)->first();

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
