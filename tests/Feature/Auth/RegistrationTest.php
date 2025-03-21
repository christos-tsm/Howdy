<?php

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
    $response = $this->followingRedirects()->post('/register', [
        'first_name' => 'Test',
        'last_name' => 'User',
        'dob' => '1993/11/24',
        'phone' => '+30 695 544 4174',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    // Now assert that the final response is the dashboard
    $response->assertSee('Dashboard'); // adjust to check for some dashboard content

    // And check that the user is authenticated
    $this->assertAuthenticated();

    // Retrieve the newly-created user and check their role
    $user = \App\Models\User::where('email', 'test@example.com')->first();
    $this->assertTrue($user->hasRole('user'));
});
