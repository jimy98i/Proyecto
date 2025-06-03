<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use App\Mail\PasswordResetMail;

class UserController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 10);
        $users = $this->userService->getAllPaginated($perPage);
        return response()->json($users);
    }

    public function show(int $id): JsonResponse
    {
        $user = User::where('id', $id)->first();
        
        if ($user && $user->foto) {
            // Construir la URL completa de la imagen
            $user->foto = asset('storage/' . $user->foto);
        }

        return response()->json($user)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $user = $this->userService->create($request->validated());
        return response()->json($user, 201);
    }

    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $this->userService->update($user, $request->validated());
        return response()->json($user);
    }

    public function destroy(User $user): JsonResponse
    {
        $this->userService->delete($user);
        return response()->json(null, 204);
    }

    public function getByRole(string $role): JsonResponse
    {
        Log::info('Buscando usuarios con rol: ' . $role);
        $users = $this->userService->getUsersByRole($role);
        Log::info('Usuarios encontrados: ' . $users->count());
        return response()->json($users);
    }

    public function uploadProfilePhoto(Request $request)
    {
        try {
            $request->validate([
                'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048'
            ]);

            $user = $request->user();
            if (!$user) {
                return response()->json(['message' => 'Usuario no encontrado'], 404)
                    ->header('Content-Type', 'application/json');
            }

            // Crear el directorio si no existe
            $safeUserName = str_replace(' ', '_', $user->nombre);
            $directory = storage_path('app/public/Imagenes/' . $safeUserName);
            if (!file_exists($directory)) {
                mkdir($directory, 0777, true);
                chmod($directory, 0777);
            }

            // Obtener la extensión del archivo
            $extension = $request->file('photo')->getClientOriginalExtension();
            
            // Generar nombre único para la foto
            $fileName = 'foto_' . time() . '.' . $extension;
            
            // Guardar la foto
            $path = $request->file('photo')->storeAs(
                'public/Imagenes/' . $safeUserName,
                $fileName
            );

            if (!$path) {
                return response()->json([
                    'message' => 'Error al guardar la imagen'
                ], 500)
                ->header('Content-Type', 'application/json');
            }

            // Establecer permisos para el archivo
            $filePath = storage_path('app/' . $path);
            chmod($filePath, 0644);

            // Actualizar la ruta de la foto en la base de datos
            $user->foto = 'Imagenes/' . $safeUserName . '/' . $fileName;
            $user->save();

            // Construir la URL completa de la imagen
            $imageUrl = asset('storage/' . $user->foto);

            return response()->json([
                'message' => 'Foto de perfil actualizada correctamente',
                'path' => 'Imagenes/' . $safeUserName . '/' . $fileName,
                'url' => $imageUrl
            ], 200)
            ->header('Content-Type', 'application/json')
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422)
            ->header('Content-Type', 'application/json');
        } catch (\Exception $e) {
            Log::error('Error al subir foto de perfil: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error al subir la foto de perfil: ' . $e->getMessage()
            ], 500)
            ->header('Content-Type', 'application/json');
        }
    }

    /**
     * Recuperar contraseña: genera una nueva contraseña temporal, la guarda y la envía por email.
     */
    public function recoverPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'No existe un usuario con ese correo.'], 404);
        }

        // Generar contraseña temporal segura
        $temporaryPassword = bin2hex(random_bytes(4)); // 8 caracteres hexadecimales
        $user->password = Hash::make($temporaryPassword);
        $user->force_password_change = true;
        $user->save();

        // Enviar email
        try {
            Mail::to($user->email)->send(new PasswordResetMail($user, $temporaryPassword));
        } catch (\Exception $e) {
            return response()->json(['message' => 'No se pudo enviar el correo. ' . $e->getMessage()], 500);
        }

        return response()->json(['message' => 'Se ha enviado una nueva contraseña temporal a tu correo electrónico.']);
    }
}