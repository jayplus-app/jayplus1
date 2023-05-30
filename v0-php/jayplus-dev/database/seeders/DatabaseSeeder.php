<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        $this->addPermissionsAndRoles();

        $this->addServices();
    }

    private function addPermissionsAndRoles()
    {
        $admin = \App\Models\User::factory()->create([
            'name'      => 'admin',
            'phone'     => '+989163221748',
            'email'     => 'admin@jayplus.app',
            'password'  => Hash::make('123456'),
            'team_id'   => 1
        ]);

        $adminRole = Role::create(['name' => 'admin', 'team_id' => 1]);

        $permissions = [
            'book without payment',
            'manage bookings',
        ];

        foreach ($permissions as $title) {
            $permission = Permission::create(['name' => $title]);
            $adminRole->givePermissionTo($permission);
        }

        setPermissionsTeamId(config('jayplus.permissions_team_id'));
        $admin->assignRole($adminRole);
    }

    private function addServices()
    {
        $vehicles = config('jayplus.vehicle_types');

        foreach ($vehicles as $vehicle => $props) {
            foreach ($props['service_types'] as $serviceType => $data) {
                $data['vehicle_model'] = $vehicle;
                $data['service_type'] = $serviceType;

                Service::factory()->create($data);
            }
        }
    }
}
