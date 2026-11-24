<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'frontend/Home')->name('home');
Route::inertia('/projects','frontend/projects/Index');
Route::inertia('/projects/show','frontend/projects/Show');

Route::inertia('/services','frontend/services/Index');
Route::inertia('/services/show','frontend/services/Show');
Route::inertia('/about','frontend/About');
Route::inertia('/contact','frontend/Contact');
