<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Termek>
 */
class TermekFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "nev" => fake()->word(2),
            "nettoAr" => fake()->numberBetween(1000,10000),
            "afa" => fake()->randomElement([0,5,27]),
            "kepUrl" => fake()->imageUrl(640,480,'product'),
        ];
    }
}
