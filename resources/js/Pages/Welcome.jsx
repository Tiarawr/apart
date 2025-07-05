import { Head, Link } from "@inertiajs/react";
import Header from "@/Components/Header";
import ApartmentCard from "@/Components/ApartmentCard";
import {
    Shield,
    MapPin,
    CheckCircle,
    ArrowRight,
    Star,
    Home,
} from "lucide-react";

export default function Welcome({ apartments = [] }) {
    // Take first 3 apartments from backend data
    const featuredApartments = apartments.slice(0, 3).map(apartment => ({
        ...apartment,
        price: new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(apartment.price) + "/malam"
    }));

    return (
        <>
            <Head title="Lilo Apart - Apartemen Jogja" />
            <div
                className="min-h-screen bg-white font-['Poppins']"
                data-theme="light"
            >
                <Header />

                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white pt-20 lg:pt-24">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-10 left-10 w-72 h-72 bg-black rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                        <div className="absolute top-40 right-20 w-96 h-96 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                    </div>
                    
                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16 lg:py-32">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                            {/* Left Content */}
                            <div className="text-center lg:text-left">
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 bg-black text-white rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6 text-sm font-medium">
                                    <Star size={16} className="text-yellow-400" />
                                    Apartemen Terbaik di Jogja
                                </div>

                                {/* Main Heading */}
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6 leading-tight">
                                    Liburan ke Jogja?
                                    <br />
                                    <span className="text-gray-600">
                                        Cari Apartemen Nyaman
                                    </span>
                                    <br />
                                    <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                                        di Sini!
                                    </span>
                                </h1>

                                {/* Subtitle */}
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0">
                                    Dari Malioboro sampai Kaliurang – booking dalam
                                    2 menit, tanpa ribet. Nikmati kenyamanan seperti
                                    di rumah sendiri dengan harga terjangkau.
                                </p>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8 sm:mb-10 max-w-md mx-auto lg:mx-0">
                                    <div className="text-center lg:text-left">
                                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
                                            {apartments.length}+
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600">
                                            Apartemen
                                        </div>
                                    </div>
                                    <div className="text-center lg:text-left">
                                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
                                            24/7
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600">
                                            Support
                                        </div>
                                    </div>
                                    <div className="text-center lg:text-left">
                                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
                                            1000+
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600">
                                            Happy Guest
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center px-4 sm:px-0">
                                    <Link
                                        href="/apartments"
                                        className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium w-full sm:min-w-[200px] hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                                    >
                                        Lihat Apartemen
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="border-2 border-black text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium w-full sm:min-w-[200px] hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 text-center"
                                    >
                                        Hubungi Kami
                                    </Link>
                                </div>
                            </div>

                            {/* Right Content - Hero Image */}
                            <div className="relative mt-8 lg:mt-0">
                                <div className="relative z-10">
                                    <img
                                        src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                        alt="Apartemen Modern Jogja"
                                        className="w-full h-auto rounded-2xl shadow-2xl"
                                    />
                                </div>
                                {/* Floating Cards */}
                                <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-white rounded-lg p-3 sm:p-4 shadow-lg border border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-xs sm:text-sm font-medium text-gray-700">Live Booking</span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-white rounded-lg p-3 sm:p-4 shadow-lg border border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <Star size={16} className="text-yellow-400 fill-current" />
                                        <span className="text-xs sm:text-sm font-medium text-gray-700">4.8/5 Rating</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
                            Kenapa Pilih Lilo Apart?
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
                            Kami memberikan yang terbaik untuk kenyamanan Anda
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-center mb-3">
                                <MapPin size={28} className="text-black sm:w-8 sm:h-8" />
                            </div>
                            <h3 className="font-semibold text-black mb-2 text-sm sm:text-base">
                                Lokasi Strategis
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                                Dekat dengan tempat wisata
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-center mb-3">
                                <Shield size={28} className="text-black sm:w-8 sm:h-8" />
                            </div>
                            <h3 className="font-semibold text-black mb-2 text-sm sm:text-base">
                                24/7 Security
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                                Keamanan terjamin
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-center mb-3">
                                <Home size={28} className="text-black sm:w-8 sm:h-8" />
                            </div>
                            <h3 className="font-semibold text-black mb-2 text-sm sm:text-base">
                                Comfort Living
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                                Nyaman seperti rumah
                            </p>
                        </div>
                    </div>
                </section>

                {/* Popular Apartments Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16 bg-gray-50">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
                            Apartemen Populer
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
                            Pilihan apartemen terbaik dengan lokasi strategis
                            dan fasilitas lengkap
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {featuredApartments.map((apartment, index) => (
                            <div
                                key={apartment.id}
                                className="transform transition-all duration-300 hover:scale-105"
                            >
                                <ApartmentCard apartment={apartment} />
                            </div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-8 sm:mt-12">
                        <Link
                            href="/apartments"
                            className="border border-black text-black px-6 sm:px-8 py-3 rounded-lg font-medium w-full sm:w-auto max-w-sm hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 justify-center"
                        >
                            Lihat Semua Apartemen
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>

                {/* Kuliner & Sewa Motor Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16 bg-white">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
                            Jelajahi Jogja Lebih Mudah
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
                            Nikmati kuliner legendaris dan sewa motor untuk explore Jogja dengan nyaman
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {/* Kuliner Section */}
                        <div className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6 lg:p-8 hover:border-black transition-all duration-300">
                            <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-lg flex items-center justify-center mb-4 sm:mb-0 sm:mr-4 mx-auto sm:mx-0">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <div className="text-center sm:text-left">
                                    <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">
                                        Kuliner Jogja Legendaris
                                    </h3>
                                    <p className="text-gray-600 text-sm sm:text-base">
                                        Rekomendasi makanan wajib coba di Jogja
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                                <div className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-gray-400 transition-all duration-300">
                                    <h4 className="font-semibold text-black mb-1 text-sm sm:text-base">Gudeg Yu Djum</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">Gudeg legendaris sejak 1950 - Jl. Wijilan</p>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-gray-400 transition-all duration-300">
                                    <h4 className="font-semibold text-black mb-1 text-sm sm:text-base">Sate Klathak Pak Pong</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">Sate kambing bakar arang - Jl. Imogiri Timur</p>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-gray-400 transition-all duration-300">
                                    <h4 className="font-semibold text-black mb-1 text-sm sm:text-base">Bakpia Pathok 25</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">Bakpia original terenak - Jl. Malioboro</p>
                                </div>
                            </div>

                            <button
                                onClick={() => window.open('https://wa.me/6281234567890?text=Halo! Saya mau info rekomendasi kuliner Jogja dong', '_blank')}
                                className="w-full bg-black hover:bg-gray-800 text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                            >
                                Tanya Rekomendasi Kuliner
                            </button>
                        </div>

                        {/* Sewa Motor Section */}
                        <div className="bg-white rounded-lg border-2 border-gray-200 p-8 hover:border-black transition-all duration-300">
                            <div className="flex items-center mb-6">
                                <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mr-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-black mb-2">
                                        Sewa Motor Jogja
                                    </h3>
                                    <p className="text-gray-600">
                                        Explore Jogja dengan motor terpercaya
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-4 mb-6">
                                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-all duration-300">
                                    <h4 className="font-semibold text-black mb-1">Honda Beat / Vario</h4>
                                    <p className="text-sm text-gray-600">Rp 60.000/hari - Matic, irit, nyaman</p>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-all duration-300">
                                    <h4 className="font-semibold text-black mb-1">Yamaha Mio / Soul</h4>
                                    <p className="text-sm text-gray-600">Rp 55.000/hari - Lincah, mudah dikendarai</p>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-all duration-300">
                                    <h4 className="font-semibold text-black mb-1">Paket Include</h4>
                                    <p className="text-sm text-gray-600">Helm, jas hujan, antar-jemput gratis</p>
                                </div>
                            </div>

                            <button
                                onClick={() => window.open('https://wa.me/6281234567890?text=Halo! Saya mau sewa motor di Jogja. Ada yang available tidak?', '_blank')}
                                className="w-full bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                Sewa Motor Sekarang
                            </button>
                        </div>
                    </div>
                </section>

                {/* Local Area Guide Section */}
                <section className="container mx-auto px-4 lg:px-16 py-16 bg-gray-50">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
                            Panduan Area Jogja
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            Temukan area terbaik di Jogja sesuai kebutuhan liburan Anda
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Malioboro Area */}
                        <div className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-black transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-black mb-1">
                                        Malioboro
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Jantung kota & shopping
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Jarak dari apartemen</span>
                                    <span className="text-sm font-medium text-black">5-15 menit</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Cocok untuk</span>
                                    <span className="text-sm font-medium text-black">Shopping, kuliner</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Transportasi</span>
                                    <span className="text-sm font-medium text-black">Jalan kaki, becak</span>
                                </div>
                            </div>
                        </div>

                        {/* Kaliurang Area */}
                        <div className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-black transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-black mb-1">
                                        Kaliurang
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Wisata alam & sejuk
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Jarak dari apartemen</span>
                                    <span className="text-sm font-medium text-black">30-45 menit</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Cocok untuk</span>
                                    <span className="text-sm font-medium text-black">Healing, family</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Transportasi</span>
                                    <span className="text-sm font-medium text-black">Motor, mobil</span>
                                </div>
                            </div>
                        </div>

                        {/* Bantul Area */}
                        <div className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-black transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-black mb-1">
                                        Bantul
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Pantai & budaya
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Jarak dari apartemen</span>
                                    <span className="text-sm font-medium text-black">45-60 menit</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Cocok untuk</span>
                                    <span className="text-sm font-medium text-black">Pantai, fotografi</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Transportasi</span>
                                    <span className="text-sm font-medium text-black">Motor, tour</span>
                                </div>
                            </div>
                        </div>

                        {/* Prambanan Area */}
                        <div className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-black transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-black mb-1">
                                        Prambanan
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Candi & sejarah
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Jarak dari apartemen</span>
                                    <span className="text-sm font-medium text-black">30-45 menit</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Cocok untuk</span>
                                    <span className="text-sm font-medium text-black">Wisata sejarah</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Transportasi</span>
                                    <span className="text-sm font-medium text-black">Motor, bus</span>
                                </div>
                            </div>
                        </div>

                        {/* Kotagede Area */}
                        <div className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-black transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-black mb-1">
                                        Kotagede
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Kerajinan perak
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Jarak dari apartemen</span>
                                    <span className="text-sm font-medium text-black">20-30 menit</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Cocok untuk</span>
                                    <span className="text-sm font-medium text-black">Belanja souvenir</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Transportasi</span>
                                    <span className="text-sm font-medium text-black">Motor, becak</span>
                                </div>
                            </div>
                        </div>

                        {/* Tugu Area */}
                        <div className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-black transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-black mb-1">
                                        Tugu
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Kampus & cafe
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Jarak dari apartemen</span>
                                    <span className="text-sm font-medium text-black">15-25 menit</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Cocok untuk</span>
                                    <span className="text-sm font-medium text-black">Nongkrong, cafe</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Transportasi</span>
                                    <span className="text-sm font-medium text-black">Motor, angkot</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tips Section */}
                    <div className="mt-12 bg-white rounded-lg border-2 border-gray-200 p-8">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-black mb-2">
                                Tips Jelajah Jogja
                            </h3>
                            <p className="text-gray-600">
                                Panduan praktis untuk liburan yang nyaman
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-sm">1</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-black mb-1">
                                        Waktu Terbaik
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        Pagi hari (07:00-10:00) untuk wisata outdoor, sore untuk cafe & kuliner
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-sm">2</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-black mb-1">
                                        Transportasi
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        Sewa motor untuk fleksibilitas maksimal, atau gunakan Trans Jogja untuk rute utama
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-sm">3</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-black mb-1">
                                        Budget Harian
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        Rp 150-250k/hari untuk makan, transport, dan tiket masuk wisata
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="container mx-auto px-4 lg:px-16 py-16 bg-gray-50">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
                            Testimoni Guest
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            Pengalaman nyata dari guest yang puas menginap di
                            apartemen kami
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center mb-6">
                                <img
                                    src="https://ui-avatars.com/api/?name=Sarah+K&background=000&color=fff"
                                    alt="Sarah K"
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h3 className="font-semibold text-black">
                                        Sarah K.
                                    </h3>
                                    <div className="flex items-center gap-1 text-sm text-black">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={14}
                                                className="text-yellow-500 fill-current"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">
                                "Apartemen yang sangat nyaman dan bersih. Lokasi
                                strategis dekat Malioboro. Pasti akan booking
                                lagi!"
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center mb-6">
                                <img
                                    src="https://ui-avatars.com/api/?name=Budi+S&background=000&color=fff"
                                    alt="Budi S"
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h3 className="font-semibold text-black">
                                        Budi S.
                                    </h3>
                                    <div className="flex items-center gap-1 text-sm text-black">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={14}
                                                className="text-yellow-500 fill-current"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">
                                "Fasilitas lengkap, pelayanan ramah. Cocok untuk
                                family trip. Recommended!"
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center mb-6">
                                <img
                                    src="https://ui-avatars.com/api/?name=Lisa+M&background=000&color=fff"
                                    alt="Lisa M"
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h3 className="font-semibold text-black">
                                        Lisa M.
                                    </h3>
                                    <div className="flex items-center gap-1 text-sm text-black">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={14}
                                                className="text-yellow-500 fill-current"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">
                                "Booking gampang, customer service responsif.
                                Apartemen sesuai ekspektasi. Top!"
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-50 mt-16">
                    <div className="container mx-auto px-4 lg:px-16 py-8">
                        <div className="text-center text-gray-600">
                            <p>&copy; 2024 Lilo Apart. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
