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

export default function ApartmentDetail({ apartment }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [checkIn, setCheckIn] = useState("2025-07-05");
    const [checkOut, setCheckOut] = useState("2025-07-07");
    const [showBookingForm, setShowBookingForm] = useState(false);

    // Format price helper
    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    // Calculate number of nights
    const calculateNights = () => {
        if (!checkIn || !checkOut) return 0;
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const timeDiff = checkOutDate - checkInDate;
        const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return nights > 0 ? nights : 0;
    };

    // Calculate total price
    const calculateTotal = () => {
        const nights = calculateNights();
        const pricePerNight = apartmentData?.price || 450000;
        const serviceFee = 25000;
        const subtotal = nights * pricePerNight;
        return subtotal + serviceFee;
    };

    // Default apartment data jika tidak ada dari backend
    const defaultApartmentData = {
        id: 1,
        name: "Malioboro co-living",
        location: "800 m dari Malioboro",
        price: 450000,
        rating: 4.8,
        reviews_count: 127,
        images: [
            "https://placehold.co/800x600/f0f0f0/666666?text=Apartemen+1",
            "https://placehold.co/800x600/e0e0e0/666666?text=Apartemen+2",
            "https://placehold.co/800x600/d0d0d0/666666?text=Apartemen+3",
            "https://placehold.co/800x600/c0c0c0/666666?text=Apartemen+4",
            "https://placehold.co/800x600/b0b0b0/666666?text=Apartemen+5",
        ],
        description:
            "Apartemen modern yang terletak strategis di pusat kota Yogyakarta. Hanya 800 meter dari Malioboro Street yang terkenal. Dilengkapi dengan fasilitas lengkap dan pemandangan kota yang menakjubkan.",
        bedrooms: 2,
        bathrooms: 2,
        area: 75,
        features: ["AC", "WiFi", "Smart TV", "Kitchen Set", "Balcony"],
        amenities: [
            "Swimming Pool",
            "Gym",
            "24/7 Security",
            "Parking",
            "Elevator",
        ],
        rules: [
            "Check-in: 14:00 - 23:00",
            "Check-out: sebelum 12:00",
            "Tidak boleh merokok di dalam kamar",
            "Tidak diperbolehkan membawa hewan peliharaan",
            "Maksimal 4 tamu per kamar",
            "Harap menjaga kebersihan dan ketertiban",
            "Tidak boleh berisik setelah jam 22:00",
            "Tamu wajib melapor ke resepsionis",
            "Dilarang membawa makanan dan minuman dari luar",
        ],
        reviews: [
            {
                id: 1,
                name: "Sari Indah",
                avatar: "https://placehold.co/40x40/f0f0f0/666666?text=SI",
                rating: 5,
                date: "Juni 2024",
                comment:
                    "Apartemen yang sangat nyaman dan bersih! Lokasinya strategis banget, dekat dengan Malioboro. Pelayanannya juga ramah dan responsif. Pasti balik lagi!",
            },
            {
                id: 2,
                name: "Budi Santoso",
                avatar: "https://placehold.co/40x40/e0e0e0/666666?text=BS",
                rating: 4,
                date: "Mei 2024",
                comment:
                    "Overall bagus, fasilitasnya lengkap dan tempat parkir luas. Cuma WiFi agak lambat di kamar yang saya tempati. Tapi untuk harga segini worth it lah.",
            },
            {
                id: 3,
                name: "Maya Salsabila",
                avatar: "https://placehold.co/40x40/d0d0d0/666666?text=MS",
                rating: 5,
                date: "April 2024",
                comment:
                    "Perfect! Apartemennya modern, bersih, dan sesuai foto. Staff nya helpful banget dan kasih rekomendasi tempat makan enak di sekitar sini.",
            },
            {
                id: 4,
                name: "Ahmad Rizki",
                avatar: "https://placehold.co/40x40/c0c0c0/666666?text=AR",
                rating: 4,
                date: "Maret 2024",
                comment:
                    "Lokasi sangat strategis, bisa jalan kaki ke Malioboro. Kamarnya luas dan AC dingin. Hanya saja air panasnya kadang tidak stabil.",
            },
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
        // Handle reviews - prioritas dari database dulu
        reviews:
            apartment?.reviews && apartment.reviews.length > 0
                ? apartment.reviews
                : defaultApartmentData.reviews,
        reviewCount:
            apartment?.reviews_count ||
            apartment?.reviewCount ||
            defaultApartmentData.reviews_count ||
            defaultApartmentData.reviews?.length ||
            0,
    };

    // Ensure images exist and have at least one image
    const images = apartmentData.images || [
        "https://placehold.co/800x600/f0f0f0/666666?text=No+Image",
    ];

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
                <Header />

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
                                            ({apartmentData.reviewCount || 0}{" "}
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

                                {/* Quick Info */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Bed size={20} />
                                        <span className="text-sm">
                                            {apartmentData.bedrooms} Kamar Tidur
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Bath size={20} />
                                        <span className="text-sm">
                                            {apartmentData.bathrooms} Kamar
                                            Mandi
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Users size={20} />
                                        <span className="text-sm">
                                            Max 4 Orang
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Home size={20} />
                                        <span className="text-sm">
                                            {apartmentData.area} m²
                                        </span>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                    {(apartmentData.features || []).map(
                                        (feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 text-gray-700 bg-gray-50 rounded-lg p-3"
                                            >
                                                <div className="w-2 h-2 bg-black rounded-full"></div>
                                                <span className="text-sm">
                                                    {feature}
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
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                    {(apartmentData.amenities || []).map(
                                        (amenity, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 text-gray-700 bg-gray-50 rounded-lg p-3"
                                            >
                                                <div className="w-2 h-2 bg-black rounded-full"></div>
                                                <span className="text-sm">
                                                    {amenity}
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
                                    {(apartmentData.rules || []).map(
                                        (rule, index) => (
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
                                        )
                                    )}
                                </ul>
                            </div>

                            {/* Reviews */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-black">
                                        Ulasan Tamu
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <Star
                                            size={20}
                                            className="text-black fill-current"
                                        />
                                        <span className="font-semibold text-black">
                                            {apartmentData.rating}
                                        </span>
                                        <span className="text-gray-600">
                                            (
                                            {
                                                (apartmentData.reviews || [])
                                                    .length
                                            }{" "}
                                            ulasan)
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {(apartmentData.reviews || []).map(
                                        (review) => (
                                            <div
                                                key={review.id}
                                                className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <img
                                                        src={review.avatar}
                                                        alt={review.name}
                                                        className="w-10 h-10 rounded-full bg-gray-200"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div>
                                                                <h4 className="font-semibold text-black">
                                                                    {
                                                                        review.name
                                                                    }
                                                                </h4>
                                                                <p className="text-sm text-gray-600">
                                                                    {
                                                                        review.date
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                {[
                                                                    ...Array(5),
                                                                ].map(
                                                                    (_, i) => (
                                                                        <Star
                                                                            key={
                                                                                i
                                                                            }
                                                                            size={
                                                                                16
                                                                            }
                                                                            className={`${
                                                                                i <
                                                                                review.rating
                                                                                    ? "text-black fill-current"
                                                                                    : "text-gray-300"
                                                                            }`}
                                                                        />
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-700 leading-relaxed">
                                                            {review.comment}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <button className="text-black font-medium hover:underline">
                                        Lihat semua{" "}
                                        {(apartmentData.reviews || []).length}{" "}
                                        ulasan
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Booking Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-32">
                                <div className="text-center mb-6">
                                    <div className="text-2xl font-bold text-black">
                                        {formatPrice(apartmentData.price) ||
                                            "Rp 450.000"}
                                    </div>
                                    <div className="text-gray-600">
                                        per malam
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

                                    <Link
                                        href={`/booking/${apartmentData.id}?checkIn=${checkIn}&checkOut=${checkOut}`}
                                        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors text-center block"
                                    >
                                        Pesan Sekarang
                                    </Link>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                                        <span>Biaya per malam</span>
                                        <span>
                                            {formatPrice(apartmentData.price)}
                                        </span>
                                    </div>
                                    {calculateNights() > 0 && (
                                        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                                            <span>Jumlah malam</span>
                                            <span>
                                                {calculateNights()} malam
                                            </span>
                                        </div>
                                    )}
                                    {calculateNights() > 0 && (
                                        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                                            <span>Subtotal</span>
                                            <span>
                                                {formatPrice(
                                                    calculateNights() *
                                                        apartmentData.price
                                                )}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                                        <span>Biaya layanan</span>
                                        <span>Rp 25.000</span>
                                    </div>
                                    <div className="flex justify-between items-center font-semibold text-black pt-2 border-t border-gray-200">
                                        <span>Total</span>
                                        <span>
                                            {calculateNights() > 0
                                                ? formatPrice(calculateTotal())
                                                : formatPrice(
                                                      (apartmentData.price ||
                                                          450000) + 25000
                                                  )}
                                        </span>
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
