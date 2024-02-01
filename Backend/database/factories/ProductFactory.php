<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Termek>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => fake()->word(2),
            "price" => fake()->numberBetween(1000,10000),
            "tax" => fake()->randomElement([0,5,27]),
            "url" => fake()->imageUrl(640,480,'product'),
        ];
    }
}
