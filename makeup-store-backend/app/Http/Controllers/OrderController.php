<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    // Confirmer la commande
    public function confirmOrder()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Vous devez être connecté'], 401);
        }

        $cartItems = Cart::where('user_id', $user->id)->with('product')->get();
        if ($cartItems->isEmpty()) {
            return response()->json(['error' => 'Votre panier est vide'], 400);
        }

        // Calculer le prix total
        $totalPrice = $cartItems->sum(fn ($item) => $item->product->price * $item->quantity);

        // Enregistrer la commande
        $order = Order::create([
            'user_id' => $user->id,
            'items' => $cartItems->map(fn ($item) => [
                'product_id' => $item->product->id,
                'name' => $item->product->name,
                'price' => $item->product->price,
                'quantity' => $item->quantity,
            ]),
            'total_price' => $totalPrice,
            'status' => 'en attente',
        ]);

        // Vider le panier après commande
        Cart::where('user_id', $user->id)->delete();

        return response()->json(['message' => 'Commande confirmée', 'order' => $order], 201);
    }

    // Récupérer les commandes de l'utilisateur
    public function getUserOrders()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Vous devez être connecté'], 401);
        }

        $orders = Order::where('user_id', $user->id)->get();

        return response()->json($orders);
    }
}
