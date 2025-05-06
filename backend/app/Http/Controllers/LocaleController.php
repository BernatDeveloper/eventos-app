<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class LocaleController extends Controller
{
    public function setLocale($lang)
    {
        if (in_array($lang, ['en', 'es'])) {
            App::setLocale($lang);
            Session::put('locale', $lang);
            return response()->json([
                'message' => "Idioma cambiado a {$lang}",
            ], 200);
        }

        return response()->json([
            'message' => "Idioma no soportado.",
        ], 400);
    }
}
