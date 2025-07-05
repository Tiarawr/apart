<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('order_id')->unique();
            $table->foreignId('apartment_id')->constrained()->onDelete('cascade');
            $table->string('customer_name');
            $table->string('customer_email');
            $table->date('check_in');
            $table->date('check_out');
            $table->integer('nights');
            $table->decimal('amount', 10, 2);
            $table->string('payment_method');
            $table->string('payment_provider')->nullable();
            $table->string('snap_token')->nullable();
            $table->enum('status', ['pending', 'settlement', 'capture', 'deny', 'cancel', 'expire', 'failure'])->default('pending');
            $table->json('midtrans_response')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
