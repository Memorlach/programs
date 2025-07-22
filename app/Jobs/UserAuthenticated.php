<?php
/**
 * UserAuthenticated.php
 *
 * @author Miguel Lara Jareda <miguel.lara@outlook.com>
 *
 * @package App\Jobs\Authentication
 */

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

/**
 * UserAuthenticated
 *
 * @author Miguel Lara Jareda <miguel.lara@outlook.com>
 *
 * @package App\Jobs\Authentication
 */
class UserAuthenticated implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @param object $umo
     *
     * @return void
     */
    public function __construct(
        public $umo
    ) {
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
    }
}
