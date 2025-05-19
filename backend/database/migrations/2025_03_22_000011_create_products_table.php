<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id('id');
            $table->string('nombre');
            $table->text('descripcion');
            $table->decimal('precio', 8, 2);
            $table->integer('stock');
            $table->enum('categoria', ['medicamento', 'alimento', 'accesorio', 'higiene', 'otro']);
            $table->date('fecha_vencimiento');
            $table->foreignId('proveedor_id')->constrained('providers')->onDelete('cascade'); // Clave foránea para proveedores
            $table->string('codigo_barras')->unique()->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
} 