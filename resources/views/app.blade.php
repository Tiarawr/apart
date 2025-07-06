<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>{{ config('app.name', 'Apart App') }}</title>

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="{{ asset('logo lilo.svg') }}">
    <link rel="shortcut icon" href="{{ asset('logo lilo.svg') }}">
    <link rel="apple-touch-icon" href="{{ asset('logo lilo.svg') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet" />

    <!-- Midtrans Snap -->
    <script type="text/javascript" src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key="{{ config('midtrans.client_key') }}"></script>

    <!-- Custom CSS for better mobile date inputs -->
    <style>
        /* Date input styling for mobile and tablets */
        .date-input {
            -webkit-appearance: none;
            -moz-appearance: textfield;
            appearance: none;
            background-image: none;
        }
        
        /* Remove browser default date picker icon on webkit browsers */
        .date-input::-webkit-calendar-picker-indicator {
            opacity: 0;
            position: absolute;
            right: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
        
        /* Firefox date input styling */
        .date-input::-moz-clear,
        .date-input::-moz-focus-inner {
            border: 0;
            padding: 0;
            margin: 0;
        }
        
        /* Mobile and tablet specific adjustments */
        @media (max-width: 768px) {
            .date-input {
                font-size: 16px; /* Prevent zoom on iOS */
                padding: 12px 12px 12px 40px;
            }
            
            .date-input::-webkit-calendar-picker-indicator {
                background: transparent;
                bottom: 0;
                color: transparent;
                cursor: pointer;
                height: auto;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
                width: auto;
            }
        }
        
        /* iPad specific adjustments */
        @media (min-width: 768px) and (max-width: 1024px) {
            .date-input {
                font-size: 16px;
                padding: 14px 16px 14px 42px;
            }
        }
        
        /* Focus states for better accessibility */
        .date-input:focus {
            outline: none;
            ring: 2px;
            ring-color: #000000;
            border-color: transparent;
        }
    </style>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
