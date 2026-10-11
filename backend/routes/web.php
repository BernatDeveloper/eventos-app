<?php

use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\Middleware\ShareErrorsFromSession;

Route::get('/', function () {
    return view('welcome');
});

// Serve files of the public disk through Laravel when the public/storage
// symlink is missing (e.g. `storage:link` was not run on deploy).
// When the symlink exists the web server serves the file directly and this
// route is never reached. Session/cookie middleware is skipped on purpose so
// an image request does not create a session row in the database.
Route::get('/storage/{path}', function (string $path) {
    $disk = Storage::disk('public');

    abort_if(str_contains($path, '..') || !$disk->exists($path), 404);

    return $disk->response($path, null, [
        'Cache-Control' => 'public, max-age=86400',
    ]);
})->where('path', '.*')->withoutMiddleware([
    EncryptCookies::class,
    AddQueuedCookiesToResponse::class,
    StartSession::class,
    ShareErrorsFromSession::class,
    VerifyCsrfToken::class,
]);
