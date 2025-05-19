<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Inertia\Inertia;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\TreatmentProductController;
use App\Http\Controllers\HistoryLineController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MedicationController;
use App\Http\Controllers\AppointmentController;
use App\Http\Middleware\Authenticate;
use App\Http\Controllers\TreatmentController;
use App\Http\Controllers\AuthController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rutas para el modelo Provider
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/provider', [ProviderController::class, 'index']); // Obtener todos los proveedores
    Route::post('/provider/{data}', [ProviderController::class, 'store']); // Crear un nuevo proveedor
    Route::get('/provider/{provider}', [ProviderController::class, 'show']); // Obtener un proveedor específico
    Route::put('/provider/{provider}', [ProviderController::class, 'update']); // Actualizar un proveedor
    Route::delete('/provider/{id}', [ProviderController::class, 'destroy']); // Eliminar un proveedor
}); 

// Rutas para el modelo User
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [UserController::class, 'index'])->name('user.index');  // Obtener todos los usuarios
    Route::post('/user', [UserController::class, 'store'])->name('user.store'); // Crear un nuevo usuario
    Route::get('/user/{id}', [UserController::class, 'show'])->name('user.show');  // Obtener un usuario específico
    Route::put('/user/{user}', [UserController::class, 'update']); // Actualizar un usuario
    Route::delete('/user/{user}', [UserController::class, 'destroy']); // Eliminar un usuario
});


// Rutas para el modelo Pet
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/pet', [PetController::class, 'index']); // Obtener todas las mascotas
    Route::get('/pet/client/{client}', [PetController::class, 'getPetsByClient']); // Obtener todas las mascotas
    Route::post('/pet', [PetController::class, 'store']); // Crear una nueva mascota
    Route::get('/pet/{pet}', [PetController::class, 'show']); // Obtener una mascota específica
    Route::put('/pet/{pet}', [PetController::class, 'update']); // Actualizar una mascota
    Route::delete('/pet/{pet}', [PetController::class, 'destroy']); // Eliminar una mascota
});

// Rutas para el modelo History
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/history/{history}', [HistoryController::class, 'show']); // Obtener un historial específico
    Route::get('/history', [HistoryController::class, 'index']); // Obtener todos los historiales
    Route::post('/history', [HistoryController::class, 'store']); // Crear un nuevo historial
    Route::get('/history/{history}', [HistoryController::class, 'show']); // Obtener un historial específico
    Route::put('/history/{history}', [HistoryController::class, 'update']); // Actualizar un historial
    Route::delete('/history/{history}', [HistoryController::class, 'destroy']); // Eliminar un historial
});


// Rutas para el modelo HistoryLine
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/historyline', [HistoryLineController::class, 'index']); // Obtener todas las líneas de historial
    Route::post('/historyline', [HistoryLineController::class, 'store']); // Crear una nueva línea de historial
    Route::get('/historyline/{historyLine}', [HistoryLineController::class, 'show']); // Obtener una línea de historial específica
    Route::put('/historyline/{historyLine}', [HistoryLineController::class, 'update']); // Actualizar una línea de historial
    Route::delete('/historyline/{historyLine}', [HistoryLineController::class, 'destroy']); // Eliminar una línea de historial
});

// Rutas para el modelo Document
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/document', [DocumentController::class, 'index']); // Obtener todos los documentos
    Route::post('/document', [DocumentController::class, 'store']); // Crear un nuevo documento
    Route::get('/document/{document}', [DocumentController::class, 'show']); // Obtener un documento específico
    Route::put('/document/{document}', [DocumentController::class, 'update']); // Actualizar un documento
    Route::delete('/document/{document}', [DocumentController::class, 'destroy']); // Eliminar un documento
});

// Rutas para el modelo Product
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/product', [ProductController::class, 'index']); // Obtener todos los productos
    Route::post('/product', [ProductController::class, 'store']); // Crear un nuevo producto
    Route::get('/product/{product}', [ProductController::class, 'show']); // Obtener un producto específico
    Route::put('/product/{product}', [ProductController::class, 'update']); // Actualizar un producto
    Route::delete('/product/{product}', [ProductController::class, 'destroy']); // Eliminar un producto
});


// Rutas para el modelo Medication
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/medication', [MedicationController::class, 'index']); // Obtener todos los medicamentos
    Route::post('/medication', [MedicationController::class, 'store']); // Crear un nuevo medicamento
    Route::get('/medication/{medication}', [MedicationController::class, 'show']); // Obtener un medicamento específico
    Route::put('/medication/{medication}', [MedicationController::class, 'update']); // Actualizar un medicamento
    Route::delete('/medication/{medication}', [MedicationController::class, 'destroy']); // Eliminar un medicamento
});


// Rutas para el modelo Appointment
Route::get('/appointment', [AppointmentController::class, 'index']); // Obtener todas las citas

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/appointment', [AppointmentController::class, 'store']); // Crear una nueva cita
    Route::get('/appointment/{appointment}', [AppointmentController::class, 'show']); // Obtener una cita específica
    Route::post('/appointment/check-availability', [AppointmentController::class, 'checkAvailability']); // Comprobacion de fecha y hora
    Route::put('/appointment/{appointment}', [AppointmentController::class, 'update']); // Actualizar una cita
    Route::delete('/appointment/{appointment}', [AppointmentController::class, 'destroy']); // Eliminar una cita
});

// Rutas para el modelo Treatment
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/treatment', [TreatmentController::class, 'index']); // Obtener todos los tratamientos
    Route::post('/treatment', [TreatmentController::class, 'store']); // Crear un nuevo tratamiento
    Route::get('/treatment/{treatment}', [TreatmentController::class, 'show']); // Obtener un tratamiento específico
    Route::put('/treatment/{treatment}', [TreatmentController::class, 'update']); // Actualizar un tratamiento
    Route::delete('/treatment/{treatment}', [TreatmentController::class, 'destroy']); // Eliminar un tratamiento
});


// Rutas para el modelo TreatmentProduct
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/treatmentproduct', [TreatmentProductController::class, 'index']); // Obtener todos los productos de tratamiento
    Route::post('/treatmentproduct', [TreatmentProductController::class, 'store']); // Crear un nuevo producto de tratamiento
    Route::get('/treatmentproduct/{treatmentProduct}', [TreatmentProductController::class, 'show']); // Obtener un producto de tratamiento específico
    Route::put('/treatmentproduct/{treatmentProduct}', [TreatmentProductController::class, 'update']); // Actualizar un producto de tratamiento
    Route::delete('/treatmentproduct/{treatmentProduct}', [TreatmentProductController::class, 'destroy']); // Eliminar un producto de tratamiento
});

// Rutas de autenticación
Route::middleware(['api'])->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('/session-check', [AuthController::class, 'checkSession'])->name('session.check');
    });
});

Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF cookie set']);
});

Route::get('/session-check', function (Request $request) {
    try {
        $session = $request->session();
        return response()->json(['session' => 'ok']);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});