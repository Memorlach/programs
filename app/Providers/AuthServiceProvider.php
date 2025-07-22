<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Auth\Guard;
use Illuminate\Auth\RequestGuard;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;

/**
 * AuthServiceProvider
 *
 * Memowzky
 *
 * App\Providers
 */
class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function register()
    {
        config([
            'auth.guards.unimega' => array_merge([
                'driver' => 'unimega',
                'provider' => null,
            ], config('auth.guards.unimega', [])),
        ]);
    }

    /**
     * boot
     *
     *
     * @return void
     *
     */
    public function boot()
    {
        Auth::resolved(function ($auth) {
            $auth->extend(
                'unimega',
                function ($app, $name, array $config)
                use ($auth)
                {
                    return tap(
                        $this->createGuard($auth, $config),
                        function ($guard) {
                            $this->app->refresh('request', $guard, 'setRequest');
                        }
                    );
                }
            );
        });
    }

    /**
     * createGuard
     *
     * @param $auth
     * @param $config
     *
     * @return RequestGuard
     *
     */
    protected function createGuard($auth, $config)
    {
        $guard = config('unimega.guard', Guard::class);
        return new RequestGuard(
            new $guard($auth, config('unimega.expiration'), $config['provider']),
            $this->app['request'],
            $auth->createUserProvider($config['provider'] ?? null)
        );
    }
}
