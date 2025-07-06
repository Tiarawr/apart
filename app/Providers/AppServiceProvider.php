<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(\App\Services\MidtransService::class, function ($app) {
            return new \App\Services\MidtransService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        
        // Force HTTPS untuk production di Railway
        if (app()->environment('production')) {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }
    }
}
