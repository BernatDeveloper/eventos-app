<?php

use App\Http\Middleware\EnsureUserOwnsEvent;
use App\Http\Middleware\EnsureUserOwnsEventParticipant;
use App\Http\Middleware\EnsureUserOwnsLocation;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api([
            App\Http\Middleware\LocalizationMiddleware::class,
        ]);

        $middleware->alias([
            'event.owner_or_admin' => EnsureUserOwnsEvent::class,
            'event.participant.owner_or_admin' => EnsureUserOwnsEventParticipant::class,
            'location.owner_or_admin' => EnsureUserOwnsLocation::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
