<?php

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/ssologin/{token}', [Controller::class, 'ssologin'])->name('ssologin');

Route::middleware('user')->get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
