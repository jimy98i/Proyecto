<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMedicationsTable extends Migration
{
    public function up()
    {
        Schema::create('medications', function (Blueprint $table) {
            $table->id('id');
            $table->string('nombre');
            $table->text('descripcion');
            $table->string('dosis');
            $table->string('frecuencia');
            $table->integer('duracion');
            $table->enum('tipo', ['oral', 'inyectable', 'topico']);
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('medications');
    }
} 