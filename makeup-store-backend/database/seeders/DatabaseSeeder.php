<?php
use Illuminate\Database\Seeder;
use App\Models\Categorie;
use App\Models\Product;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $category1 = Categorie::create(['name' => 'Rouge à lèvres']);
        $category2 = Categorie::create(['name' => 'Fond de teint']);

        Product::create([
            'name' => 'Rouge à lèvres Matte',
            'description' => 'Un rouge à lèvres longue tenue.',
            'price' => 15.99,
            'stock' => 50,
            'image' => 'rouge-matte.jpg',
            'category_id' => $category1->id
        ]);

        Product::create([
            'name' => 'Fond de teint hydratant',
            'description' => 'Une base parfaite pour votre maquillage.',
            'price' => 25.99,
            'stock' => 30,
            'image' => 'fond-teint.jpg',
            'category_id' => $category2->id
        ]);
    }
}
