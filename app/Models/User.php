<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    const ACCOUNT_USER = 'user';

    const ACCOUNT_CUSTOMER = 'customer';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * role
     *
     * @access public
     */
    public function role()
    {
        return $this->belongsTo(Role::class, 'role_uid', 'uid');
    }

    /**
     * department
     *
     * @access public
     */
    public function department()
    {
        return $this->belongsTo(Department::class, 'department_uid', 'uid');
    }

    /**
     * department
     *
     * @access public
     */
    public function destination()
    {
        return $this->belongsTo(Destination::class, 'department_uid', 'uid');
    }


    public function actions()
    {
        return $this->belongsTo(Actions::class, 'department_uid', 'uid');
    }
}
