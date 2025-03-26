<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject; // ✅ Import de JWTSubject
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable implements JWTSubject // ✅ Implémentation de JWTSubject
{
    use HasFactory, Notifiable;

    // 🔹 Ajout des champs 'phone' et 'address' dans $fillable
    // app/Models/User.php

    protected $fillable = [
        'name',
        'email',
        'password',
        'address',
        'phone',
        'profile_image',
    ];


    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Obtenir l'identifiant stocké dans le token JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Retourner les revendications personnalisées du JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
