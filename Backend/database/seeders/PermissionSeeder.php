<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permisson = new Permission();
        $permisson->user_id = 4;
        $permisson->role = "insert";
        $permisson->save();


        $permisson = new Permission();
        $permisson->user_id = 4;
        $permisson->role = "delete";
        $permisson->save();

        $permisson = new Permission();
        $permisson->user_id = 4;
        $permisson->role = "update";
        $permisson->save();

        $permisson = new Permission();
        $permisson->user_id = 1;
        $permisson->role = "delete";
        $permisson->save();
    }
}
