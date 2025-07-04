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

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const apartments = [
        {
            id: 1,
            name: "Malioboro co-living",
            location: "800 m dari Malioboro",
            price: "Rp 450 rb/malam",
            image: "https://placehold.co/707x434",
        },
        {
            id: 2,
            name: "Soedirman Apart",
            location: "Jl. Sudirman",
            price: "Rp 550 rb/malam",
            image: "https://placehold.co/707x434",
        },
        {
            id: 3,
            name: "Seturan Cozy Loft",
            location: "Dekat UGM",
            price: "Rp 440 rb/malam",
            image: "https://placehold.co/707x434",
        },
    ];

    return (
        <>
            <Head title="Lilo Apart - Apartemen Jogja" />
            <div
                className="min-h-screen bg-white font-['Poppins']"
                data-theme="light"
            >
                <Header auth={auth} />

                {/* Hero Section */}
                <section className="relative overflow-hidden bg-white pt-20 lg:pt-24">
                    <div className="relative container mx-auto px-4 lg:px-16 py-16 lg:py-32">
                        <div className="text-center mb-12 lg:mb-16">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-black text-white rounded-full px-6 py-2 mb-6 text-sm font-medium">
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
                                <span className="text-black">di Sini!</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg md:text-xl lg:text-2xl font-light text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                                Dari Malioboro sampai Kaliurang – booking dalam
                                2 menit, tanpa ribet. Nikmati kenyamanan seperti
                                di rumah sendiri dengan harga terjangkau.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 md:gap-8 mb-10 max-w-md mx-auto">
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-black">
                                        3+
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Apartemen
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-black">
                                        24/7
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Support
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-black">
                                        1000+
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Happy Guest
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                                <Link
                                    href="/apartments"
                                    className="bg-black text-white px-8 py-3 rounded-lg font-medium min-w-[200px] hover:bg-gray-800 transition-all duration-300"
                                >
                                    Lihat Apartemen
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="border border-black text-black px-8 py-3 rounded-lg font-medium min-w-[200px] hover:bg-black hover:text-white transition-all duration-300"
                                >
                                    Daftar Sekarang
                                </Link>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative">
                            <div className="flex justify-center mb-16">
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                        alt="Apartemen di Jogja"
                                        className="rounded-lg shadow-lg w-full max-w-4xl h-[600px] object-cover"
                                    />
                                </div>
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center justify-center mb-3">
                                        <CheckCircle
                                            size={32}
                                            className="text-black"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-black mb-2">
                                        Fully Furnished
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Lengkap dengan perabotan
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center justify-center mb-3">
                                        <MapPin
                                            size={32}
                                            className="text-black"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-black mb-2">
                                        Prime Location
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Dekat tempat wisata
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center justify-center mb-3">
                                        <Shield
                                            size={32}
                                            className="text-black"
                                        />
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
                                        <Home
                                            size={32}
                                            className="text-black"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-black mb-2">
                                        Comfort Living
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Nyaman seperti rumah
                                    </p>
                                </div>
                            </div>
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
                        {apartments.map((apartment, index) => (
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

                {/* Testimonials Section */}
                <section className="container mx-auto px-4 lg:px-16 py-16">
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
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">
                                "Apartemen sangat nyaman dan bersih. Lokasi
                                strategis dekat Malioboro. Pasti akan balik
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
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">
                                "Pelayanan ramah, fasilitas lengkap. Harga
                                sangat worth it untuk kualitas yang diberikan."
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
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">
                                "Booking mudah banget, check-in cepat. Apartemen
                                exactly seperti di foto. Recommended!"
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-50 mt-16">
                    <div className="container mx-auto px-4 lg:px-16 py-8">
                        <div className="text-center text-gray-600">
                            <p>&copy; 2025 Lilo Apart. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
