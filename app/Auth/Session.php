<?php

namespace App\Auth;

use App\Exceptions\Auth\AuthEncryptionException;
use App\Exceptions\Auth\AuthSessionException;
use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Encryption\Encrypter;
use Illuminate\Http\Request;

/**
 * Session
 *
 * Memowzky
 *
 * App\Auth
 */
class Session
{

    /**
     * @var Request $request
     *
     * @access protected
     */
    protected Request $request;

    /**
     * @var string $token
     *
     * @access protected
     */
    protected string $token;

    /**
     * @var string $sso
     *
     * @access protected
     */
    protected string $sso;

    /**
     * @var string $account
     *
     * Source from User
     *
     * Account Type:
     * 1 - User
     * 2 - Customer
     *
     * @access protected
     */
    protected string $account;

    /**
     * __construct
     *
     * @param Request $request
     *
     * @return Session
     *
     * @access public
     */
    public function __construct(Request $request){
        $this->request = $request;

        return $this;
    }


    /**
     * generate
     *
     * @param String $token
     * @return Session
     * @throws \Exception
     */
    public function generate(
        String $token
    ):Session
    {
        $this->token = $token;

        return $this
            ->verifyToken()
            ->verifyUMO()
            ->saveSession();
    }


    /**
     * verifyToken
     *
     *
     * @return $this
     *
     */
    protected function verifyToken(): Session
    {
        try{
            $encrypter = new Encrypter(
                config('app.private_key'),
                config('app.cipher')
            );

        }catch (\Exception $exception){
            throw new AuthEncryptionException(
                "Autenticación de sesión inválida", 0
            );
        }

        return $this;
    }

    /**
     * verifyUMO
     *
     *
     * @return $this
     *
     * @throws \Exception
     */
    protected function verifyUMO(): Session
    {
        $umo = \Http::ssos()
            ->registerSecToken(env('SSO_BROKER_SECRET'))
            ->post('umo/token', [],
                [
                    'broker' => env('SSO_BROKER_NAME'),
                    'token' => $this->token,
                ]);

        if (
            ! isset($umo->session->token) ||
            strlen($umo->session->token) === 0
        ) {
            throw new AuthSessionException(
                "Token de autenticación inválido"
            );
        }

        if (
            ! isset($umo->user) ||
            ! isset($umo->user->sso)
        ) {
            throw new \Exception("Autenticación de usuario inválido");
        }

        $this->sso = $umo->user->sso;

        switch (true) {
            case ($umo->user->source->type->id === 1):
                $this->account = User::ACCOUNT_USER;
                break;
            case ($umo->user->source->type->id === 2):
                throw new \Exception("Usuario de tipo " . User::ACCOUNT_CUSTOMER . '. Acceso no permitido.');
                break;
            default:
                throw new \Exception(
                    "Autenticación de usuario por tipo inválido"
                );
        }

        $this->verifyUser($umo);

        event(new \App\Events\UserAuthenticated($umo));

        return $this;
    }

    /**
     * verifyUser
     *
     * @access protected
     */
    protected function verifyUser($umo)
    {
        /*return \Http::users()
            ->registerSecToken($umo->session->token)
            ->post(
                'account-auth',
                [
                    'ip' => $this->request->ip(),
                    'browser' => $this->request->server('HTTP_USER_AGENT'),
                ]
            );*/
    }

    /**
     * saveSession
     *
     * @return Session
     *
     * @access protected
     */
    protected function saveSession(): Session
    {
        $this->forgetSession();

        $this->request->session()->put('sso', $this->sso);
        $this->request->session()->put('token', $this->token);
        $this->request->session()->put('account', $this->account);

        return $this;
    }

    /**
     * forgetSession
     *
     * @return Session
     *
     * @access protected
     */
    protected function forgetSession(): Session
    {
        if (
            $this->request->session()->has('sso') ||
            $this->request->session()->has('token')
        ) {
            $this->request->session()->forget(['sso', 'token', 'token_blq', 'account']);
        }

        return $this;
    }
}