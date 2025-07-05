<?php

namespace Database\Seeders;

use App\Models\Apartment;
use Illuminate\Database\Seeder;

class ApartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $apartments = [
            [
                'name' => 'Malioboro co-living',
                'description' => 'Apartemen modern yang terletak strategis hanya 800 meter dari Malioboro Street. Dilengkapi dengan fasilitas lengkap dan akses mudah ke berbagai tempat wisata di Yogyakarta.',
                'price' => 450000,
                'location' => '800 m dari Malioboro',
                'images' => [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop'
                ],
                'bedrooms' => 1,
                'bathrooms' => 1,
                'area' => 35,
                'features' => ['AC', 'WiFi', 'Smart TV', 'Kitchen Set', 'Balcony'],
                'amenities' => ['Swimming Pool', 'Gym', '24/7 Security', 'Parking', 'Elevator'],
                'rules' => ['No Smoking', 'No Pets', 'No Parties', 'Check-in: 14:00', 'Check-out: 12:00'],
                'type' => 'studio'
            ],
            [
                'name' => 'Soedirman Apart',
                'description' => 'Apartemen mewah di Jalan Sudirman dengan fasilitas lengkap dan lokasi strategis. Cocok untuk business traveler dan wisatawan yang menginginkan kenyamanan premium.',
                'price' => 550000,
                'location' => 'Jl. Sudirman',
                'images' => [
                    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=800&h=600&fit=crop'
                ],
                'bedrooms' => 2,
                'bathrooms' => 2,
                'area' => 75,
                'features' => ['AC', 'WiFi', 'Smart TV', 'Kitchen Set', 'Balcony', 'Washing Machine'],
                'amenities' => ['Swimming Pool', 'Gym', '24/7 Security', 'Parking', 'Elevator', 'Restaurant'],
                'rules' => ['No Smoking', 'No Pets', 'No Parties', 'Check-in: 14:00', 'Check-out: 12:00'],
                'type' => 'apartment'
            ],
            [
                'name' => 'Seturan Cozy Loft',
                'description' => 'Loft bergaya modern di area Seturan, dekat dengan UGM dan berbagai fasilitas pendidikan. Perfect untuk mahasiswa, dosen, atau peneliti yang berkunjung ke Yogyakarta.',
                'price' => 440000,
                'location' => 'Dekat UGM',
                'images' => [
                    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop'
                ],
                'bedrooms' => 1,
                'bathrooms' => 1,
                'area' => 50,
                'features' => ['AC', 'WiFi', 'Smart TV', 'Kitchen Set', 'Work Desk', 'High Ceiling'],
                'amenities' => ['Co-working Space', 'Cafe', '24/7 Security', 'Parking', 'Laundry'],
                'rules' => ['No Smoking Indoors', 'Pet Friendly', 'No Loud Music After 10 PM', 'Check-in: 15:00', 'Check-out: 11:00'],
                'type' => 'loft'
            ],
            [
                'name' => 'Prawirotaman Heritage',
                'description' => 'Apartemen berdesain heritage di kawasan Prawirotaman yang terkenal. Menggabungkan nuansa tradisional Yogyakarta dengan fasilitas modern untuk pengalaman menginap yang autentik.',
                'price' => 380000,
                'location' => 'Jl. Prawirotaman',
                'images' => [
                    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
                ],
                'bedrooms' => 1,
                'bathrooms' => 1,
                'area' => 40,
                'features' => ['AC', 'WiFi', 'TV', 'Traditional Decor', 'Garden View'],
                'amenities' => ['Traditional Garden', 'Cultural Tours', '24/7 Security', 'Parking', 'Bicycle Rental'],
                'rules' => ['No Smoking', 'Respect Cultural Values', 'Quiet Hours 22:00-06:00', 'Check-in: 14:00', 'Check-out: 12:00'],
                'type' => 'heritage'
            ],
            [
                'name' => 'Kaliurang Mountain View',
                'description' => 'Villa eksklusif di Kaliurang dengan pemandangan Gunung Merapi yang menakjubkan. Cocok untuk retreat, family gathering, atau liburan yang ingin menikmati udara sejuk pegunungan.',
                'price' => 650000,
                'location' => 'Kaliurang',
                'images' => [
                    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800&h=600&fit=crop'
                ],
                'bedrooms' => 3,
                'bathrooms' => 2,
                'area' => 120,
                'features' => ['Mountain View', 'Fireplace', 'WiFi', 'Kitchen Set', 'Garden', 'BBQ Area'],
                'amenities' => ['Mountain Hiking', 'Volcano Tour', 'Parking', 'Security', 'Restaurant'],
                'rules' => ['No Smoking Indoors', 'Pet Friendly', 'No Parties Without Permission', 'Check-in: 15:00', 'Check-out: 11:00'],
                'type' => 'villa'
            ],
            [
                'name' => 'Tugu Station Apartment',
                'description' => 'Apartemen strategis dekat Stasiun Tugu dengan akses mudah ke transportasi kereta api. Perfect untuk traveler yang ingin explore Jawa dengan kereta atau business trip.',
                'price' => 420000,
                'location' => 'Dekat Stasiun Tugu',
                'images' => [
                    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'
                ],
                'bedrooms' => 2,
                'bathrooms' => 1,
                'area' => 60,
                'features' => ['AC', 'WiFi', 'Smart TV', 'Kitchen Set', 'Near Transportation'],
                'amenities' => ['Railway Access', 'Gym', '24/7 Security', 'Parking', 'Elevator', 'Mini Market'],
                'rules' => ['No Smoking', 'No Pets', 'No Parties', 'Check-in: 14:00', 'Check-out: 12:00'],
                'type' => 'apartment'
            ],
            [
                'name' => 'Gejayan Cozy Studio',
                'description' => 'Studio apartment modern di kawasan Gejayan yang ramai dan strategis. Dekat dengan berbagai tempat makan, shopping center, dan akses mudah ke berbagai destinasi di Yogyakarta.',
                'price' => 350000,
                'location' => 'Jl. Gejayan',
                'images' => [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
                ],
                'bedrooms' => 1,
                'bathrooms' => 1,
                'area' => 30,
                'features' => ['AC', 'WiFi', 'Smart TV', 'Kitchenette', 'Study Desk'],
                'amenities' => ['Food Court', 'Shopping Mall', '24/7 Security', 'Parking', 'ATM Center'],
                'rules' => ['No Smoking', 'No Pets', 'Quiet Hours 23:00-06:00', 'Check-in: 14:00', 'Check-out: 12:00'],
                'type' => 'studio'
            ],
            [
                'name' => 'Bantul Riverside Resort',
                'description' => 'Resort tepi sungai di Bantul dengan suasana pedesaan yang asri dan tenang. Cocok untuk family vacation, honeymoon, atau retreat yang ingin menikmati keindahan alam Yogyakarta.',
                'price' => 480000,
                'location' => 'Bantul, Tepi Sungai',
                'images' => [
                    'https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
                ],
                'bedrooms' => 2,
                'bathrooms' => 2,
                'area' => 85,
                'features' => ['River View', 'Traditional Architecture', 'WiFi', 'Kitchen Set', 'Private Terrace', 'Outdoor Shower'],
                'amenities' => ['River Activities', 'Cycling', 'Traditional Spa', 'Organic Farm', 'Cultural Workshop'],
                'rules' => ['Eco-Friendly Policy', 'Respect Nature', 'No Loud Music', 'Check-in: 15:00', 'Check-out: 11:00'],
                'type' => 'resort'
            ]
        ];

        foreach ($apartments as $apartment) {
            Apartment::create($apartment);
        }
    }
}
