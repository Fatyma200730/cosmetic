<?php
namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class OrderController extends Controller
{
    // Confirmer la commande
    public function confirmOrder()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            $cartItems = Cart::where('user_id', $user->id)->with('product')->get();
            if ($cartItems->isEmpty()) {
                return response()->json(['error' => 'Votre panier est vide'], 400);
            }

            // Calcul du prix total
            $totalPrice = $cartItems->sum(fn($item) => $item->product->price * $item->quantity);

            // Création de la commande
            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => $totalPrice,
                'status' => 'en attente',
            ]);

            // Création des lignes de commande dans `order_items`
            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product->id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price, // Prix figé au moment de la commande
                ]);
            }

            // Vider le panier après confirmation
            Cart::where('user_id', $user->id)->delete();

            return response()->json(['message' => 'Commande confirmée avec succès', 'order' => $order], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la confirmation de la commande', 'details' => $e->getMessage()], 500);
        }
    }

    // Récupérer les commandes de l'utilisateur
    public function getUserOrders()
    {
        try {
            // Authentifier l'utilisateur avec JWT
            $user = JWTAuth::parseToken()->authenticate();

            if (!$user) {
                return response()->json(['error' => 'Utilisateur non authentifié'], 401);
            }

            // Récupérer les commandes de l'utilisateur et les éléments de la commande avec les produits associés
            $orders = Order::where('user_id', $user->id)
                ->with('orderItems.product')  // Charger les produits associés aux items de la commande
                ->get();

            return response()->json($orders);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la récupération des commandes', 'details' => $e->getMessage()], 500);
        }
    }
}
