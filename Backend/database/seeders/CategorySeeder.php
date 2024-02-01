<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $category = new Category();
        $category->name = "nincs";
        $category->save();

        $category = new Category();
        $category->name = "gyümölcsök";
        $category->save();

        $category = new Category();
        $category->name = "zöldségek";
        $category->save();

        $category = new Category();
        $category->name = "autók";
        $category->save();
    }
}
