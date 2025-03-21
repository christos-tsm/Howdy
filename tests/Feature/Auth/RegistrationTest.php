<?php

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
    // Post registration request
    $response = $this->post('/register', [
        'first_name'            => 'Test',
        'last_name'             => 'User',
        'dob'                   => '1993/11/24',
        'phone'                 => '+30 695 544 4174',
        'email'                 => 'test@example.com',
        'password'              => 'password',
        'password_confirmation' => 'password',
    ]);

    // Retrieve the newly-created user and mark them as verified
    $user = \App\Models\User::where('email', 'test@example.com')->first();
    $user->markEmailAsVerified();

    // Login the user
    $this->actingAs($user);

    // Assert that the user is authenticated
    $this->assertAuthenticated();

    // Follow redirect and assert we see expected dashboard content
    $response->assertRedirect(route('dashboard', false));

    // Verify the user has the 'user' role
    $this->assertTrue($user->hasRole('user'));
});
