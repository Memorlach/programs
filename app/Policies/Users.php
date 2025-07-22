<?php
/**
 * Users.php
 *
 * @author Miguel Lara Jareda <miguel.lara@outlook.com>
 *
 * @package App\Policies
 */

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

/**
 * Users
 *
 * @author Miguel Lara Jareda <miguel.lara@outlook.com>
 *
 * @package App\Policies
 */
class Users
{
    /**
     * view
     *
     * @access public
     */
    public function view(User $user)
    {
        if ($user->role->access <= 4) {
            return Response::allow();
        }

        return Response::deny(
            'Sólo el departamento de Sistemas puede acceder a esta aréa'
        );
    }
}
