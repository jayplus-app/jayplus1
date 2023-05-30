<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1.0')->group(function () {

    Route::controller(AuthController::class)->group(function(){

        Route::post('register', function () { return "ok"; });

        Route::post('login', function () { return "ok"; });

    });

    Route::post('/tokens/create', function (Request $request) {
        $token = $request->user()->createToken($request->token_name);
    
        return ['token' => $token->plainTextToken];
    });

    // Route::group(['middleware' => 'auth:sanctum'], function () {
    //     Route::controller(ClientController::class)->group(['namespace' => 'Client'], function () {
            
    //     });
    // });

});