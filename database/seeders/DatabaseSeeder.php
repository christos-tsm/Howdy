<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
        // 1) Clear any cached permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // 2) Define permissions
        $permissions = [
            // Travel-related
            'create_travel',
            'edit_travel',
            'delete_travel',
            'handle_travel_join_request',

            // Activity-related
            'create_activity',
            'edit_activity',
            'delete_activity',
            'handle_activity_join_request',

            // Moderation/admin
            'manage_reports',
            'manage_users',
            'access_admin_dashboard',
        ];

        // 3) Create each permission in the database
        foreach ($permissions as $perm) {
            Permission::create(['name' => $perm]);
        }

        // 4) Create roles
        $roleUser = Role::create(['name' => 'user']);
        $roleModerator = Role::create(['name' => 'moderator']);
        $roleAdmin = Role::create(['name' => 'admin']);

        // 5) Assign permissions to roles

        // -- USER role
        $roleUser->givePermissionTo([
            'create_travel',
            'edit_travel',
            'delete_travel',
            'handle_travel_join_request',
            'create_activity',
            'edit_activity',
            'delete_activity',
            'handle_activity_join_request',
        ]);

        // -- MODERATOR role
        $roleModerator->givePermissionTo([
            'create_travel',
            'edit_travel',
            'delete_travel',
            'handle_travel_join_request',
            'create_activity',
            'edit_activity',
            'delete_activity',
            'handle_activity_join_request',
            'manage_reports',
            'access_admin_dashboard',
        ]);

        // -- ADMIN role (gets everything)
        $roleAdmin->givePermissionTo(Permission::all());

        // 6) Create some test users and assign roles

        // Admin
        $adminUser = User::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'Admin',
            'phone' => '+30 695 999 9999',
            'dob' => '1990/01/01',
            'email' => 'admin@example.com',
        ]);
        $adminUser->assignRole('admin');

        // Moderator
        $moderatorUser = User::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'Moderator',
            'phone' => '+30 695 888 8888',
            'dob' => '1992/02/02',
            'email' => 'moderator@example.com',
        ]);
        $moderatorUser->assignRole('moderator');

        // Normal user
        $normalUser = User::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'User',
            'phone' => '+30 695 544 4174',
            'dob' => '1993/11/24',
            'email' => 'test@example.com',
        ]);
        $normalUser->assignRole('user');
    }
}
