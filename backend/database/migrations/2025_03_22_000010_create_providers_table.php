<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProvidersTable extends Migration
{
    public function up()
    {
        Schema::create('providers', function (Blueprint $table) {
            $table->id('id'); // Clave primaria
            $table->string('nombre'); // Nombre del proveedor
            $table->string('telefono')->nullable(); // Teléfono del proveedor
            $table->string('direccion')->nullable(); // Dirección del proveedor
            $table->string('email')->nullable(); // Email del proveedor
            $table->timestamps(); // Timestamps para created_at y updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('providers');
    }
} 