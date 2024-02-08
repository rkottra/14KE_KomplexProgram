<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductApiTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/api/termek');

        $response->assertStatus(200);
    }

    public function test_termek_get_ok(): void
    {
        $response = $this->json('GET', '/api/termek/1');

        $response
            ->assertStatus(200)
            ->assertJson([
                'name' => 'alma',
            ]);
    }
    public function test_termek_struktura_ok(): void
    {
        $response = $this->json('GET', '/api/termek');

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                [
                'id',
                'name',
                'price',
                'tax',
                'url'
                ]
            ]);
    }
    
}
