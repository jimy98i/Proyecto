<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

use Illuminate\Support\Facades\Auth;
use App\Models\User;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, int $maxIntent = 10, int $second = 60): Response
    {
        // dd($request->all());
        // Verifica si las credenciales son válidas
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid credentials.'
            ], 401);
        }

        // Obtén el usuario autenticado
        $user = Auth::user();
        $clave = $request->user()? $request->user()->id() : $request->ip();

        if (RateLimiter::tooManyAttempts($clave, $maxIntent, $second)) {
            return response()->json([
                'message' => 'Too many attempts, please try again later.'
            ], 429);
        }

        RateLimiter::hit($clave, $maxIntent, $second);

        return $next($request);
    }
} 
