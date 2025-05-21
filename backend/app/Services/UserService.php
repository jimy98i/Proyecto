<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class UserService
{
    public function __construct(protected User $user)
    {
    }

    public function getAll(): Collection
    {
        return User::all();
    }

    public function getAllPaginated(int $perPage = 10): LengthAwarePaginator
    {
        return User::paginate($perPage);
    }

    public function findById(int $id): ?User
    {
        return User::find($id);
    }

    public function create(array $data): User
    {
        \Illuminate\Support\Facades\Log::info('Creando usuario con datos: ' . json_encode($data));
        
        // Verificar si la tabla existe
        if (!\Illuminate\Support\Facades\Schema::hasTable('users')) {
            \Illuminate\Support\Facades\Log::error('La tabla users no existe en la base de datos');
            throw new \Exception('La tabla users no existe en la base de datos');
        }

        // Verificar la estructura de la tabla
        $columns = \Illuminate\Support\Facades\DB::select('SHOW COLUMNS FROM users');
        \Illuminate\Support\Facades\Log::info('Estructura de la tabla users: ' . json_encode($columns));

        try {
            $data['password'] = Hash::make($data['password']);
            $user = User::create($data);
            \Illuminate\Support\Facades\Log::info('Usuario creado con ID: ' . $user->id);
            return $user;
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Error al crear usuario: ' . $e->getMessage());
            \Illuminate\Support\Facades\Log::error('Stack trace: ' . $e->getTraceAsString());
            throw $e;
        }
    }

    public function update(User $user, array $data): bool
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        return $user->update($data);
    }

    public function delete(User $user): bool
    {
        return $user->delete();
    }

    public function getUsersByRole(string $role): Collection
    {
        \Illuminate\Support\Facades\Log::info('Ejecutando consulta para rol: ' . $role);
        $query = User::where('rol', $role);
        \Illuminate\Support\Facades\Log::info('SQL: ' . $query->toSql());
        \Illuminate\Support\Facades\Log::info('Bindings: ' . json_encode($query->getBindings()));
        $users = $query->get();
        \Illuminate\Support\Facades\Log::info('Usuarios encontrados: ' . $users->count());
        return $users;
    }
} 