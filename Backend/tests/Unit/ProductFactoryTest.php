<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use App\Models\Product;

class ProductFactoryTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_product_factory_price_test(): void
    {
        $prod = Product::factory()->create();
        $this->assertGreaterThan(1000, $prod->price);
        $this->assertLessThan(10000, $prod->price);
    }

    public function test_product_factory_tax_test(): void
    {
        $prod = Product::factory()->create();
        $this->assertContains($prod->tax, [0,27,5]);
        
    }
}
