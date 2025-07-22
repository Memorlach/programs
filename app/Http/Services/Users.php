<?php
/**
 * Users.php
 *
 * @author Miguel Lara Jareda <miguel.lara@outlook.com>
 *
 * @package App\Http\Services
 */

namespace App\Http\Services;

use App\Exceptions\HttpServiceException;
use App\Http\Services\Response\Response;
use Megatravel\HttpClient\Abstracts\ServiceAbstract;
use Megatravel\HttpClient\Interfaces\HttpInterface;
use Megatravel\HttpClient\Interfaces\ResponseInterface;
use Megatravel\HttpClient\Interfaces\SecInterface;

/**
 * Users
 *
 * @author Miguel Lara Jareda <miguel.lara@outlook.com>
 *
 * @package App\Http\Services
 */
class Users extends ServiceAbstract implements HttpInterface, SecInterface
{
    /**
     * defaultResponse
     *
     * @access public
     */
    public function defaultResponse(): ResponseInterface
    {
        $this->response_object = new Response;

        return $this->response_object;
    }

    /**
     * getExtraApiHeaders
     *
     * @return Mixed
     */
    protected function getExtraApiHeaders()
    {
        return [
        ];
    }

    /**
     * Parse the response
     *
     * @param String $response
     *
     * @return Mixed
     *
     * @access public
     */
    public function response($response)
    {
        if (
            $response->http_code === 400 ||
            $response->http_code === 401 ||
            $response->http_code === 403 ||
            $response->http_code === 404 ||
            $response->http_code === 405 ||
            $response->http_code === 406 ||
            $response->http_code === 408
        ) {
            \Log::error($response);
            $response_error = json_decode($response);

            if ($response->http_code === 401) {
                throw new HttpServiceException(
                    "Invalid Authentication"
                );
            }

            // Works only if json is not decoded
            if (! isset($response_error)) {
                $response_error = strip_tags($response);
                throw new HttpServiceException(
                    $response_error
                );
            }

            // SSOS Mapping
            if (isset($response_error->error)) {
                throw (
                    new HttpServiceException(
                        $response_error->error->message,
                        $response_error->error->code
                    )
                );
            }

            if (isset($response_error->message)) {
                throw (
                    new HttpServiceException(
                        $response_error->message,
                        $response->http_code
                    )
                );
            }

            throw new HttpServiceException(
                "Invalid HTTP Service Request"
            );
        }

        return json_decode($response);
    }
}
