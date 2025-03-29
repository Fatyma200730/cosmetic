<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('/login', action: [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:api')->get('/me', [AuthController::class, 'me']);  // Récupérer les infos de l'utilisateur

Route::middleware('auth:api')->put('/profile', [AuthController::class, 'updateProfile']);  // Mettre à jour les infos de l'utilisateur

Route::middleware('auth:api')->post('/upload-profile-image', [AuthController::class, 'uploadProfileImage']);  // Mettre à jour l'image de profil

Route::get('/reviews', [ReviewController::class, 'index']); // ✅ Voir les avis
Route::post('/reviews', [ReviewController::class, 'store']); // ✅ Ajouter un avis


Route::get('/products', [ProductController::class, 'index']);

Route::get('/products/new-arrivals', [ProductController::class, 'getNewArrivals']);

Route::get('/categories', [CategorieController::class, 'index']); // Route pour obtenir toutes les catégories

Route::get('/offers', [OfferController::class, 'index']);


Route::get('/search', [ProductController::class, 'searchByCategory']);

Route::get('/category/{category_id}', [ProductController::class, 'getProductsByCategory']);

Route::get('/products/{id}', [ProductController::class, 'show']);

Route::middleware('jwt.auth')->group(function () {
    Route::get('/cart', [CartController::class, 'getCart']);
    Route::put('/cart/update/{cart_id}', [CartController::class, 'updateQuantity']);
    Route::delete('/cart/{cartId}', [CartController::class, 'removeFromCart']);
});
Route::middleware('jwt.auth')->post('/confirm-order', [OrderController::class, 'confirmOrder']);
Route::middleware('jwt.auth')->get('/orders', [OrderController::class, 'getUserOrders']);


