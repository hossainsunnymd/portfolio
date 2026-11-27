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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('client')->nullable();
            $table->string('role')->nullable();
            $table->text('summary')->nullable();
            $table->longText('body')->nullable();
            $table->string('cover_path')->nullable();
            $table->json('gallery')->nullable();
            $table->json('tech')->nullable();
            $table->json('highlights')->nullable();
            $table->string('live_url')->nullable();
            $table->string('repo_url')->nullable();
            $table->date('completed_at')->nullable();
            $table->string('status', 16)->default('published')->index();
            $table->boolean('is_featured')->default(false)->index();
            $table->unsignedInteger('position')->default(0)->index();
            $table->unsignedBigInteger('views')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
