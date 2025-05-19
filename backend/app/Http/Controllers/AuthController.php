<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\Auth\LoginRequest;

class AuthController extends Controller
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(LoginRequest $request)
    {
        try {
            // Verifica si el usuario existe
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }

            // Verifica si las credenciales son válidas
            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'message' => 'Invalid credentials.'
                ], 401);
            }

            // Genera un token de acceso con expiración de 15 minutos
            $token = $user->createToken('API TOKEN', ['*'], now()->addMinutes(15))->plainTextToken;

            // Guardar datos en la sesión
            $request->session()->put('user_id', $user->id);
            $request->session()->put('user_role', $user->rol);
            $request->session()->put('user_name', $user->nombre);

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'access_token' => $token,
                'user' => $user->id,
                'rol' => $user->rol,
                'nombre' => $user->nombre,
                'email' => $user->email
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error en login: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error interno del servidor'
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json(['message' => 'User not authenticated'], 401);
            }

            // Revoca el token de acceso actual
            $user->currentAccessToken()->delete();

            // Limpiar la sesión
            $request->session()->forget(['user_id', 'user_role', 'user_name']);
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json(['message' => 'Logged out successfully.']);
        } catch (\Exception $e) {
            Log::error('Error en logout: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error interno del servidor'
            ], 500);
        }
    }

    public function checkSession(Request $request)
    {
        try {
            if (!$request->user()) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            // Verificar si el token ha expirado
            $token = $request->user()->currentAccessToken();
            if ($token->expires_at && $token->expires_at->isPast()) {
                $token->delete();
                return response()->json(['message' => 'Token expired'], 401);
            }

            return response()->json(['message' => 'Session valid']);
        } catch (\Exception $e) {
            Log::error('Error en checkSession: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error interno del servidor'
            ], 500);
        }
    }

    public function register(StoreUserRequest $request)
    {
        try {
            // Crea un nuevo usuario
            $user = User::create([
                'nombre' => $request->nombre,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'telefono' => $request->telefono,
                'direccion' => $request->direccion,
                'rol' => $request->rol,
            ]);

            // Genera un token de acceso
            $token = $user->createToken('API TOKEN')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error en register: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error interno del servidor'
            ], 500);
        }
    }
}
