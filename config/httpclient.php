<?php

return [

    /**
     * List of available services
     */
    'services' => [
        // SSO Server
        'ssos' => [
            'class' => App\Http\Services\SSOS::class,
            'uri' => env('SSO_SERVER_URL'),
        ],

        'users' => [
            'class' => App\Http\Services\Users::class,
            'uri' => env('MICROSERVICE_API_USERS'),
        ]
    ],
];
