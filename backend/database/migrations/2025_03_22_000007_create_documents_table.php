<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentsTable extends Migration
{
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('historial_id')->constrained('histories')->onDelete('cascade');
            $table->enum('tipo_documento', ['analisis', 'radiografia', 'ecografia', 'historial', 'otro']);
            $table->string('nombre_archivo');
            $table->string('ruta_archivo');
            $table->timestamp('fecha_subida');
            $table->text('descripcion')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('documents');
    }
} 