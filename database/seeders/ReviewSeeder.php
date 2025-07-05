<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reviews = [
            // Reviews untuk Luxe Central Studio (ID: 1)
            [
                'apartment_id' => 1,
                'name' => 'Sari Indah',
                'avatar' => 'https://ui-avatars.com/api/?name=Sari+Indah&background=f0f0f0&color=666666',
                'rating' => 5,
                'comment' => 'Studio yang sangat nyaman dan modern! Lokasinya strategis banget di pusat kota. Pemandangan skyline dari balcony luar biasa. Fasilitas lengkap dan pelayanan sangat memuaskan.',
                'date_display' => 'Juni 2024',
            ],
            [
                'apartment_id' => 1,
                'name' => 'Budi Santoso',
                'avatar' => 'https://ui-avatars.com/api/?name=Budi+Santoso&background=e0e0e0&color=666666',
                'rating' => 4,
                'comment' => 'Studio yang bagus untuk business travel. Lokasinya pas di tengah kota, dekat dengan kantor. Cuma WiFi kadang agak lambat, tapi overall worth it.',
                'date_display' => 'Mei 2024',
            ],

            // Reviews untuk Modern Apartment Suite (ID: 2)
            [
                'apartment_id' => 2,
                'name' => 'Maya Salsabila',
                'avatar' => 'https://ui-avatars.com/api/?name=Maya+Salsabila&background=d0d0d0&color=666666',
                'rating' => 5,
                'comment' => 'Perfect untuk keluarga! 2 kamar tidur yang spacious dan fasilitas lengkap. Dekat dengan mall dan transportasi publik. Staff sangat helpful dan responsif.',
                'date_display' => 'April 2024',
            ],
            [
                'apartment_id' => 2,
                'name' => 'Ahmad Rizki',
                'avatar' => 'https://ui-avatars.com/api/?name=Ahmad+Rizki&background=c0c0c0&color=666666',
                'rating' => 4,
                'comment' => 'Apartemen bagus dengan fasilitas modern. Parkir luas dan aman. Hanya saja air panas kadang tidak stabil di kamar kedua.',
                'date_display' => 'Maret 2024',
            ],

            // Reviews untuk Cozy Family Villa (ID: 3)
            [
                'apartment_id' => 3,
                'name' => 'Keluarga Wijaya',
                'avatar' => 'https://ui-avatars.com/api/?name=Keluarga+Wijaya&background=b0b0b0&color=666666',
                'rating' => 5,
                'comment' => 'Villa yang luar biasa untuk liburan keluarga! Kolam renang pribadi dan taman yang indah. Anak-anak sangat senang. Area BBQ juga seru untuk gathering.',
                'date_display' => 'Februari 2024',
            ],

            // Reviews untuk Urban Loft (ID: 4)
            [
                'apartment_id' => 4,
                'name' => 'David Chen',
                'avatar' => 'https://ui-avatars.com/api/?name=David+Chen&background=a0a0a0&color=666666',
                'rating' => 4,
                'comment' => 'Loft dengan design yang unik dan modern. High ceiling memberikan kesan lapang. Lokasi premium di area bisnis sangat membantu untuk kerja.',
                'date_display' => 'Januari 2024',
            ],

            // Reviews untuk Minimalist Studio (ID: 5)
            [
                'apartment_id' => 5,
                'name' => 'Lisa Putri',
                'avatar' => 'https://ui-avatars.com/api/?name=Lisa+Putri&background=909090&color=ffffff',
                'rating' => 4,
                'comment' => 'Studio minimalis yang perfect untuk digital nomad. Design clean dan functional. Work desk yang nyaman dan WiFi kencang. Cocok untuk kerja remote.',
                'date_display' => 'Desember 2023',
            ],

            // Reviews untuk Skyline Penthouse (ID: 6)
            [
                'apartment_id' => 6,
                'name' => 'Robert & Sarah',
                'avatar' => 'https://ui-avatars.com/api/?name=Robert+Sarah&background=808080&color=ffffff',
                'rating' => 5,
                'comment' => 'Penthouse yang absolutely stunning! Pemandangan 360 derajat kota dari rooftop sangat menakjubkan. Fasilitas premium dan service yang excellent. Worth every penny!',
                'date_display' => 'November 2023',
            ],
        ];

        foreach ($reviews as $review) {
            Review::create($review);
        }
    }
}
