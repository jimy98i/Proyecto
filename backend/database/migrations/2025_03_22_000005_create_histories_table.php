<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistoriesTable extends Migration
{
    public function up()
    {
        Schema::create('histories', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('mascota_id')->constrained('pets')->onDelete('cascade');
            $table->timestamp('fecha_creacion');
            $table->text('descripcion_cliente');
            $table->enum('estado', ['activo', 'inactivo']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('histories');
    }
} 