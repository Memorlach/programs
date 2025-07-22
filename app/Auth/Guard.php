<?php

namespace App\Auth;

use App\Exceptions\Auth\AuthSessionException;
use App\Exceptions\Auth\UnauthenticatedException;
use App\Models\User;
use App\Policies\Users as UsersPolicy;
use Illuminate\Contracts\Auth\Factory as AuthFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class Guard
{

    /**
     * The authentication factory implementation.
     *
     * @var \Illuminate\Contracts\Auth\Factory
     */
    protected $auth;

    /**
     * The number of minutes tokens should be allowed to remain valid.
     *
     * @var int
     */
    protected $expiration;

    /**
     * The provider name.
     *
     * @var string
     */
    protected $provider;

    /**
     * Create a new guard instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @param  int  $expiration
     * @param  string  $provider
     * @return void
     */
    public function __construct(
        AuthFactory $auth,
                    $expiration = null,
                    $provider = null
    ) {
        $this->auth = $auth;
        $this->expiration = $expiration;
        $this->provider = $provider;
    }

    /**
     * Retrieve the authenticated user for the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function __invoke(Request $request)
    {
        if (! $request->hasSession()) {
            throw new AuthSessionException("Session not initialized");
        }

        switch (true) {
            case (
                $request->session()->has('account') &&
                $request->session()->get('account') === User::ACCOUNT_USER
            ):
                return $this->retrieveAccountUser($request);
                break;
        }

        throw new UnauthenticatedException('Unauthorized');
    }

    /**
     * retrieveAccountUser
     *
     * @access protected
     */
    protected function retrieveAccountUser(Request $request)
    {
        if (
            \Http::hasService('ssos') &&
            $request->session()->has('token') &&
            $request->session()->has('sso')
        ) {
            $sso = $request->session()->get('sso');
            $token = $request->session()->get('token');

            $umo = \Http::ssos()
                ->registerSecToken(env('SSO_BROKER_SECRET'))
                ->post(
                    'umo/token', [],
                    [
                        'broker' => env('SSO_BROKER_NAME'),
                        'token' => $token,
                    ]
                );

            if (
                ! $umo->user->sso ||
                $umo->user->sso !== $sso
            ) {
                throw new \Exception("SSO invalid");
            }

            $response_user = \Http::users()
                ->registerSecToken($request->session()->get('token'))
                ->get('/account');

            if (! $response_user) {
                throw new \Exception("User Account invalid");
            }

            $user = $this->mapResourceUser($response_user, $umo->user->sso);
            $user->token = $request->session()->get('token');

            return $user;
        }

        if (! \Http::hasService('account')) {
            throw new \Exception(
                "Account Authentication service is not configured"
            );
        }

        throw new UnauthenticatedException('Unauthorized');
    }

    /**
     * mapResourceUser
     *
     * @param object $response
     *
     * @return User
     *
     * @access protected
     */
    protected function mapResourceUser($response, $sso): User
    {
        $user = new User;
        $user->uid = $response->uid;
        $user->sso = $sso;
        $user->first_name = $response->first_name;
        $user->last_name = $response->last_name;
        $user->email = $response->email;
        $user->avatar = $response->avatar;
        $user->account = User::ACCOUNT_USER;

        // Relations
        $user->active = $response->active;
        $user->role_uid = $response->role->uid;

        $user->department = $response->department;
        $user->destination = $response->destination;
        $user->role = $response->role;

        $user->actions = $response->actions;

        /*$user->load([
            'department',
            'destination',
            'role',
            'actions'
        ]);*/

        return $user;
    }

}