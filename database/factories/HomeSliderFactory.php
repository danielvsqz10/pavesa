<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HomeSlider>
 */
class HomeSliderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'image' => 'slider/' . Str::random(10) . '.jpg',
            'image_mobile' => 'slider/' . Str::random(10) . '.jpg',
            'url' => '/',
            'is_active' => $this->faker->boolean,
        ];
    }
}
