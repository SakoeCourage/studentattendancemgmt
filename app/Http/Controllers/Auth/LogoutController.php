<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function logout()
    {
        if (request()->user()->currentAccessToken()) {
            request()->user()->currentAccessToken()->delete();
        }

        return response('ok');
    }
}