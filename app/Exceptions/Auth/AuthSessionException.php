<?php
/**
 * AuthSessionException.php
 *
 * @package App\Exceptions\Auth
 *
 * @author  Miguel Lara Jareda <miguel.lara@outlook.com>
 */

namespace App\Exceptions\Auth;

use RuntimeException;

/**
 * AuthSessionException
 *
 * @package App\Exceptions\Auth
 *
 * @author  Miguel Lara Jareda <miguel.lara@outlook.com>
 */
class AuthSessionException extends RuntimeException
{
    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function render($request)
    {
        return response()->view('errors.500', [
            'exception' => get_class($this),
            'code' => $this->getCode(),
            'message' => $this->getMessage(),
        ], 500);
    }
}
