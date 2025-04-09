<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now()->toDateTimeString();
        
        $categories = [
            [
                'name' => 'Rouges à Lèvres',
                'icon' => 'lipstick.png',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Mascaras',
                'icon' => 'mascara.png',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Fonds de Teint',
                'icon' => 'foundation.png',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Palettes',
                'icon' => 'palette.png',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Highlighters',
                'icon' => 'blush.png',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Soins Visage',
                'icon' => 'soin.png',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        // Insert data into the categories table
        DB::table('categories')->insert($categories);
    }
}