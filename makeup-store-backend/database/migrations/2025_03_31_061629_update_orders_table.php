<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateOrdersTable extends Migration
{
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('items'); // Supprime la colonne JSON
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('quantity');
            $table->decimal('price', 10, 2); // Stocke le prix du produit au moment de l'achat
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('order_items');

        Schema::table('orders', function (Blueprint $table) {
            $table->json('items')->nullable();
        });
    }
}

