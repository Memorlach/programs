<?php

namespace App\Listeners;

use App\Events\UserAuthenticated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Routing\Events\RouteMatched;
use Illuminate\Queue\InteractsWithQueue;

class AuthNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(UserAuthenticated $event)
    {
        \Log::info(sprintf(
            'User authenticated: %s %s with mail <%s>',
            $event->umo->user->first_name,
            $event->umo->user->last_name,
            $event->umo->user->email
        ));

        \App\Jobs\UserAuthenticated
            ::dispatch($event->umo)
            ->onQueue('emails');
    }
}
