<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StorageController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/storage/{path}', [StorageController::class, 'serve'])
    ->where('path', '.*')
    ->name('storage.serve');
