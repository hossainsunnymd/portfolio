<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminResourceController;
use App\Http\Controllers\AuthenticatedSessionController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'home'])->name('home');
Route::get('/projects', [PortfolioController::class, 'projects'])->name('projects.index');
Route::get('/projects/show', [PortfolioController::class, 'project'])->name('projects.show');
Route::get('/services', [PortfolioController::class, 'services'])->name('services.index');
Route::get('/services/show', [PortfolioController::class, 'service'])->name('services.show');
Route::get('/about', [PortfolioController::class, 'about'])->name('about');
Route::get('/contact', [PortfolioController::class, 'contact'])->name('contact');
Route::post('/contact', [PortfolioController::class, 'storeContact'])
    ->middleware('throttle:5,1')
    ->name('contact.store');

Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('throttle:6,1')
    ->name('login.store');
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', AdminDashboardController::class)->name('dashboard');
    Route::post('/sections/{record}/image', [AdminResourceController::class, 'uploadSectionImage'])
        ->whereNumber('record')
        ->name('sections.image');
    Route::get('/{resource}', [AdminResourceController::class, 'index'])
        ->name('resources.index');
    Route::get('/{resource}/create', [AdminResourceController::class, 'create'])
        ->name('resources.create');
    Route::post('/{resource}', [AdminResourceController::class, 'store'])
        ->name('resources.store');
    Route::get('/{resource}/{record}/edit', [AdminResourceController::class, 'edit'])
        ->whereNumber('record')
        ->name('resources.edit');
    Route::put('/{resource}/{record}', [AdminResourceController::class, 'update'])
        ->whereNumber('record')
        ->name('resources.update');
    Route::delete('/{resource}/{record}', [AdminResourceController::class, 'destroy'])
        ->whereNumber('record')
        ->name('resources.destroy');
});
