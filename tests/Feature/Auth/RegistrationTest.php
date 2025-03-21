<?php

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
    $response = $this->post('/register', [
        'first_name' => 'Test',
        'last_name' => 'User',
        'dob' => '1993/11/24',
        'phone' => '+30 695 544 4174',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));

    // Retrieve the newly-created user
    $user = \App\Models\User::where('email', 'test@example.com')->first();

    // Verify the user has the 'user' role
    $this->assertTrue($user->hasRole('user'));
});
