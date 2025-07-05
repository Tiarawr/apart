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
                    
                    <div className="relative container mx-auto px-4 lg:px-16 py-16 lg:py-32">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div className="text-center lg:text-left">
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 bg-black text-white rounded-full px-6 py-2 mb-6 text-sm font-medium">
                                    <Star size={16} className="text-yellow-400" />
                                    Apartemen Terbaik di Jogja
                                </div>

                                {/* Main Heading */}
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
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
                                <p className="text-lg md:text-xl lg:text-2xl font-light text-gray-600 mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                                    Dari Malioboro sampai Kaliurang – booking dalam
                                    2 menit, tanpa ribet. Nikmati kenyamanan seperti
                                    di rumah sendiri dengan harga terjangkau.
                                </p>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 md:gap-8 mb-10 max-w-md mx-auto lg:mx-0">
                                    <div className="text-center lg:text-left">
                                        <div className="text-2xl md:text-3xl font-bold text-black">
                                            {apartments.length}+
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Apartemen
                                        </div>
                                    </div>
                                    <div className="text-center lg:text-left">
                                        <div className="text-2xl md:text-3xl font-bold text-black">
                                            24/7
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Support
                                        </div>
                                    </div>
                                    <div className="text-center lg:text-left">
                                        <div className="text-2xl md:text-3xl font-bold text-black">
                                            1000+
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Happy Guest
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                                    <Link
                                        href="/apartments"
                                        className="bg-black text-white px-8 py-4 rounded-lg font-medium min-w-[200px] hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                    >
                                        Lihat Apartemen
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="border-2 border-black text-black px-8 py-4 rounded-lg font-medium min-w-[200px] hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105"
                                    >
                                        Hubungi Kami
                                    </Link>
                                </div>
                            </div>

                            {/* Right Content - Hero Image */}
                            <div className="relative">
                                <div className="relative z-10">
                                    <img
                                        src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                        alt="Apartemen Modern Jogja"
                                        className="w-full h-auto rounded-2xl shadow-2xl"
                                    />
                                </div>
                                {/* Floating Cards */}
                                <div className="absolute -top-4 -left-4 bg-white rounded-lg p-4 shadow-lg border border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-sm font-medium text-gray-700">Live Booking</span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg p-4 shadow-lg border border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <Star size={16} className="text-yellow-400 fill-current" />
                                        <span className="text-sm font-medium text-gray-700">4.8/5 Rating</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="container mx-auto px-4 lg:px-16 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
                            Kenapa Pilih Lilo Apart?
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            Kami memberikan yang terbaik untuk kenyamanan Anda
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-center mb-3">
                                <MapPin size={32} className="text-black" />
                            </div>
                            <h3 className="font-semibold text-black mb-2">
                                Lokasi Strategis
                            </h3>
                            <p className="text-sm text-gray-600">
                                Dekat dengan tempat wisata
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-center mb-3">
                                <Shield size={32} className="text-black" />
                            </div>
                            <h3 className="font-semibold text-black mb-2">
                                24/7 Security
                            </h3>
                            <p className="text-sm text-gray-600">
                                Keamanan terjamin
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-center mb-3">
                                <Home size={32} className="text-black" />
                            </div>
                            <h3 className="font-semibold text-black mb-2">
                                Comfort Living
                            </h3>
                            <p className="text-sm text-gray-600">
                                Nyaman seperti rumah
                            </p>
                        </div>
                    </div>
                </section>

                {/* Popular Apartments Section */}
                <section className="container mx-auto px-4 lg:px-16 py-16 bg-gray-50">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
                            Apartemen Populer
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            Pilihan apartemen terbaik dengan lokasi strategis
                            dan fasilitas lengkap
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <div className="text-center mt-12">
                        <Link
                            href="/apartments"
                            className="border border-black text-black px-8 py-3 rounded-lg font-medium min-w-[200px] hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 justify-center"
                        >
                            Lihat Semua Apartemen
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>

                {/* Kuliner & Sewa Motor Section */}
                <section className="container mx-auto px-4 lg:px-16 py-16 bg-white">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
                            Jelajahi Jogja Lebih Mudah
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            Nikmati kuliner legendaris dan sewa motor untuk explore Jogja dengan nyaman
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Kuliner Section */}
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
                            <div className="flex items-center mb-6">
                                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-2xl">🍜</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-black mb-2">
                                        Kuliner Jogja Legendaris
                                    </h3>
                                    <p className="text-orange-700">
                                        Rekomendasi makanan wajib coba di Jogja
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-4 mb-6">
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <h4 className="font-semibold text-black mb-1">Gudeg Yu Djum</h4>
                                    <p className="text-sm text-gray-600">Gudeg legendaris sejak 1950 - Jl. Wijilan</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <h4 className="font-semibold text-black mb-1">Sate Klathak Pak Pong</h4>
                                    <p className="text-sm text-gray-600">Sate kambing bakar arang - Jl. Imogiri Timur</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <h4 className="font-semibold text-black mb-1">Bakpia Pathok 25</h4>
                                    <p className="text-sm text-gray-600">Bakpia original terenak - Jl. Malioboro</p>
                                </div>
                            </div>

                            <button
                                onClick={() => window.open('https://wa.me/6281234567890?text=Halo! Saya mau info rekomendasi kuliner Jogja dong', '_blank')}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <span>📱</span>
                                Tanya Rekomendasi Kuliner
                            </button>
                        </div>

                        {/* Sewa Motor Section */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                            <div className="flex items-center mb-6">
                                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-2xl">🏍️</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-black mb-2">
                                        Sewa Motor Jogja
                                    </h3>
                                    <p className="text-blue-700">
                                        Explore Jogja dengan motor terpercaya
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-4 mb-6">
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <h4 className="font-semibold text-black mb-1">Honda Beat / Vario</h4>
                                    <p className="text-sm text-gray-600">Rp 60.000/hari - Matic, irit, nyaman</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <h4 className="font-semibold text-black mb-1">Yamaha Mio / Soul</h4>
                                    <p className="text-sm text-gray-600">Rp 55.000/hari - Lincah, mudah dikendarai</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <h4 className="font-semibold text-black mb-1">Paket Include</h4>
                                    <p className="text-sm text-gray-600">Helm, jas hujan, antar-jemput gratis</p>
                                </div>
                            </div>

                            <button
                                onClick={() => window.open('https://wa.me/6281234567890?text=Halo! Saya mau sewa motor di Jogja. Ada yang available tidak?', '_blank')}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <span>📱</span>
                                Sewa Motor Sekarang
                            </button>
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
