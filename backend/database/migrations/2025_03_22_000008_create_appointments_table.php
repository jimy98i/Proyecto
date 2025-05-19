<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentsTable extends Migration
{
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('linea_historial_id')->nullable()->constrained('history_lines')->onDelete('cascade');
            $table->date('fecha_cita');
            $table->time('hora_cita');
            $table->enum('tipo_cita', ['consulta', 'revisión', 'urgencia', 'vacunación', 'operación'])->nullable();
            $table->enum('estado', ['programada', 'confirmada', 'cancelada', 'completada'])->nullable();
            $table->text('notas')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('appointments');
    }
}