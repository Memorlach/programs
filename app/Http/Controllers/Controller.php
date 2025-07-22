<?php

namespace App\Http\Controllers;

use App\Auth\Session;
use App\Exceptions\HttpServiceException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;


    public function ssologin(Request $request, Session $session, $token)
    {
        try {
            $session->generate($token);
            \Log::info("Starting session detected");
        } catch (HttpServiceException $e) {
            throw $e;
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            throw new \Exception('Sesión inválida', 401, $e);
        }

        return redirect('/');
    }
}
