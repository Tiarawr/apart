<?php

return [
    [
        'id' => 'qris',
        'name' => 'QRIS',
        'description' => 'Scan QR Code dengan aplikasi e-wallet apapun',
        'icon' => 'qris',
    ],
    [
        'id' => 'ewallet',
        'name' => 'E-Wallet',
        'description' => 'Redirect langsung ke aplikasi pilihan Anda',
        'icon' => 'wallet',
        'providers' => [
            [
                'id' => 'gopay',
                'name' => 'GoPay',
                'icon' => 'zap',
                'color' => 'text-green-600',
                'bgColor' => 'bg-green-50',
            ],
            [
                'id' => 'dana',
                'name' => 'DANA',
                'icon' => 'credit-card',
                'color' => 'text-blue-600',
                'bgColor' => 'bg-blue-50',
            ],
            [
                'id' => 'shopeepay',
                'name' => 'ShopeePay',
                'icon' => 'shopping-bag',
                'color' => 'text-orange-600',
                'bgColor' => 'bg-orange-50',
            ],
            [
                'id' => 'linkaja',
                'name' => 'LinkAja',
                'icon' => 'link',
                'color' => 'text-red-600',
                'bgColor' => 'bg-red-50',
            ],
        ],
    ],
    [
        'id' => 'va',
        'name' => 'Virtual Account',
        'description' => 'Transfer melalui ATM atau internet banking',
        'icon' => 'university',
        'providers' => [
            [
                'id' => 'bca_va',
                'name' => 'BCA VA',
                'icon' => 'credit-card',
                'color' => 'text-blue-700',
                'bgColor' => 'bg-blue-50',
            ],
            [
                'id' => 'bri_va',
                'name' => 'BRI VA',
                'icon' => 'banknote',
                'color' => 'text-blue-800',
                'bgColor' => 'bg-blue-50',
            ],
            [
                'id' => 'bni_va',
                'name' => 'BNI VA',
                'icon' => 'shield',
                'color' => 'text-orange-700',
                'bgColor' => 'bg-orange-50',
            ],
            [
                'id' => 'permata_va',
                'name' => 'Permata VA',
                'icon' => 'star',
                'color' => 'text-green-700',
                'bgColor' => 'bg-green-50',
            ],
            [
                'id' => 'mandiri_va',
                'name' => 'Mandiri VA',
                'icon' => 'landmark',
                'color' => 'text-yellow-600',
                'bgColor' => 'bg-yellow-50',
            ],
        ],
    ],
    [
        'id' => 'cstore',
        'name' => 'Over Counter',
        'description' => 'Bayar di minimarket',
        'icon' => 'shopping-bag',
        'providers' => [
            [
                'id' => 'alfamart',
                'name' => 'Alfamart',
                'icon' => 'shopping-bag',
                'color' => 'text-red-600',
                'bgColor' => 'bg-red-50',
            ],
            [
                'id' => 'indomaret',
                'name' => 'Indomaret',
                'icon' => 'shopping-bag',
                'color' => 'text-blue-600',
                'bgColor' => 'bg-blue-50',
            ],
        ],
    ],
    [
        'id' => 'akulaku',
        'name' => 'Akulaku',
        'description' => 'Bayar dengan cicilan Akulaku',
        'icon' => 'credit-card',
    ],
];
