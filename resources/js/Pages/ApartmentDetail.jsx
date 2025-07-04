import { Head, Link } from "@inertiajs/react";
import Header from "@/Components/Header";
import { useState } from "react";
import {
    Calendar,
    Users,
    MapPin,
    Star,
    ArrowLeft,
    Wifi,
    Car,
    Coffee,
    Tv,
    Wind,
    Bath,
    Bed,
    Home,
    Shield,
    Heart,
    Share2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function ApartmentDetail({ auth, apartment }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [showBookingForm, setShowBookingForm] = useState(false);

    // Default apartment data jika tidak ada dari backend
    const defaultApartmentData = {
        id: 1,
        name: "Malioboro co-living",
        location: "800 m dari Malioboro",
        price: "Rp 450.000",
        pricePerNight: "per malam",
        rating: 4.8,
        reviews: 127,
        images: [
            "https://placehold.co/800x600/f0f0f0/666666?text=Apartemen+1",
            "https://placehold.co/800x600/e0e0e0/666666?text=Apartemen+2",
            "https://placehold.co/800x600/d0d0d0/666666?text=Apartemen+3",
            "https://placehold.co/800x600/c0c0c0/666666?text=Apartemen+4",
            "https://placehold.co/800x600/b0b0b0/666666?text=Apartemen+5",
        ],
        description:
            "Apartemen modern yang terletak strategis di pusat kota Yogyakarta. Hanya 800 meter dari Malioboro Street yang terkenal. Dilengkapi dengan fasilitas lengkap dan pemandangan kota yang menakjubkan.",
        features: [
            { icon: Bed, label: "2 Kamar Tidur" },
            { icon: Bath, label: "1 Kamar Mandi" },
            { icon: Users, label: "Max 4 Orang" },
            { icon: Home, label: "45 m²" },
        ],
        amenities: [
            { icon: Wifi, label: "WiFi Gratis" },
            { icon: Car, label: "Parkir Gratis" },
            { icon: Coffee, label: "Dapur Lengkap" },
            { icon: Tv, label: "TV Cable" },
            { icon: Wind, label: "AC" },
            { icon: Shield, label: "Keamanan 24/7" },
            { icon: Bath, label: "Kamar Mandi Pribadi" },
            { icon: Bed, label: "Kasur Queen Size" },
            { icon: Home, label: "Ruang Tamu" },
        ],
        rules: [
            "Check-in: 14:00 - 22:00",
            "Check-out: 12:00",
            "Tidak merokok di dalam ruangan",
            "Tidak diperbolehkan membawa hewan peliharaan",
            "Maksimal 4 tamu",
            "Tidak boleh membuat keributan setelah jam 10 malam",
            "Jaga kebersihan apartemen",
            "Dilarang membawa tamu tanpa izin",
            "Wajib melapor jika ada kerusakan fasilitas",
        ],
    };

    // Merge data dari backend dengan default data
    const apartmentData = {
        ...defaultApartmentData,
        ...(apartment || {}),
        // Pastikan arrays selalu ada
        features: apartment?.features || defaultApartmentData.features,
        amenities: apartment?.amenities || defaultApartmentData.amenities,
        rules: apartment?.rules || defaultApartmentData.rules,
        images: apartment?.images || defaultApartmentData.images,
    };

    // Ensure images exist and have at least one image
    const images = apartmentData.images || [
        "https://placehold.co/800x600/f0f0f0/666666?text=No+Image",
    ];

    // Debug log
    console.log("apartmentData:", apartmentData);
    console.log("features:", apartmentData.features);
    console.log("amenities:", apartmentData.amenities);
    console.log("rules:", apartmentData.rules);

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    return (
        <>
            <Head title={`${apartmentData.name || "Apartemen"} - Lilo Apart`} />
            <div
                className="min-h-screen bg-white font-['Poppins']"
                data-theme="light"
            >
                <Header auth={auth} />

                <div className="px-4 lg:px-16 py-8 pt-24 lg:pt-32 max-w-[1440px] mx-auto">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link
                            href="/apartments"
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Kembali ke Daftar Apartemen
                        </Link>
                    </div>

                    {/* Apartment Header */}
                    <div className="mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-black mb-2">
                                    {apartmentData.name || "Apartemen"}
                                </h1>
                                <div className="flex items-center gap-4 text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Star
                                            size={16}
                                            className="text-black fill-current"
                                        />
                                        <span className="font-medium">
                                            {apartmentData.rating || "4.5"}
                                        </span>
                                        <span>
                                            ({apartmentData.reviews || 0}{" "}
                                            ulasan)
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} />
                                        <span>
                                            {apartmentData.location ||
                                                "Yogyakarta"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    <Share2 size={16} />
                                    Bagikan
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    <Heart size={16} />
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="mb-8">
                        <div className="relative">
                            <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                                <img
                                    src={images[currentImageIndex]}
                                    alt={apartmentData.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Image Navigation */}
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                            >
                                <ChevronRight size={20} />
                            </button>

                            {/* Image Indicators */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            setCurrentImageIndex(index)
                                        }
                                        className={`w-2 h-2 rounded-full transition-colors ${
                                            index === currentImageIndex
                                                ? "bg-white"
                                                : "bg-white/50"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-5 gap-2 mt-4">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                                        index === currentImageIndex
                                            ? "border-black"
                                            : "border-gray-200"
                                    }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${apartmentData.name} ${
                                            index + 1
                                        }`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Details */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Basic Info */}
                            <div>
                                <h2 className="text-2xl font-bold text-black mb-4">
                                    Tentang Apartemen
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {apartmentData.description ||
                                        "Apartemen modern yang nyaman dan strategis."}
                                </p>

                                {/* Features */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {apartmentData.features.map(
                                        (feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 text-gray-700"
                                            >
                                                <feature.icon size={20} />
                                                <span className="text-sm">
                                                    {feature.label}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Amenities */}
                            <div>
                                <h2 className="text-2xl font-bold text-black mb-4">
                                    Fasilitas
                                </h2>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                    {apartmentData.amenities.map(
                                        (amenity, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                                            >
                                                <amenity.icon
                                                    size={20}
                                                    className="text-gray-600"
                                                />
                                                <span className="text-gray-700">
                                                    {amenity.label}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Rules */}
                            <div>
                                <h2 className="text-2xl font-bold text-black mb-4">
                                    Aturan Apartemen
                                </h2>
                                <ul className="space-y-2">
                                    {apartmentData.rules.map((rule, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2"
                                        >
                                            <span className="text-gray-400 mt-1">
                                                •
                                            </span>
                                            <span className="text-gray-700">
                                                {rule}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right Column - Booking Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-32">
                                <div className="text-center mb-6">
                                    <div className="text-2xl font-bold text-black">
                                        {apartmentData.price || "Rp 450.000"}
                                    </div>
                                    <div className="text-gray-600">
                                        {apartmentData.pricePerNight ||
                                            "per malam"}
                                    </div>
                                </div>

                                {/* Booking Form */}
                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Check-in
                                            </label>
                                            <input
                                                type="date"
                                                value={checkIn}
                                                onChange={(e) =>
                                                    setCheckIn(e.target.value)
                                                }
                                                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Check-out
                                            </label>
                                            <input
                                                type="date"
                                                value={checkOut}
                                                onChange={(e) =>
                                                    setCheckOut(e.target.value)
                                                }
                                                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                                        Pesan Sekarang
                                    </button>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                                        <span>Biaya per malam</span>
                                        <span>
                                            {apartmentData.price ||
                                                "Rp 450.000"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                                        <span>Biaya layanan</span>
                                        <span>Rp 25.000</span>
                                    </div>
                                    <div className="flex justify-between items-center font-semibold text-black pt-2 border-t border-gray-200">
                                        <span>Total</span>
                                        <span>Rp 475.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
