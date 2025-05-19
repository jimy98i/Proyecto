<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistoryLinesTable extends Migration
{
    public function up()
    {
        Schema::create('history_lines', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('historial_id')->constrained('histories')->onDelete('cascade');
            $table->text('descripcion');
            $table->date('fecha');
            $table->enum('estado', ['activo', 'inactivo']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('history_lines');
    }
} 