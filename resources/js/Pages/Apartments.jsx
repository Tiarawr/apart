import { Head, Link } from "@inertiajs/react";
import Header from "@/Components/Header";
import { useState, useEffect } from "react";
import {
    Calendar,
    Search,
    Users,
    MapPin,
    DollarSign,
    Filter,
    Star,
    ArrowRight,
    Plus,
    Minus,
    SlidersHorizontal,
} from "lucide-react";

export default function Apartments({ auth, apartments }) {
    const [guests, setGuests] = useState(4);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [showCheckInPicker, setShowCheckInPicker] = useState(false);
    const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
    const [sortBy, setSortBy] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Set default dates
    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        setCheckIn(today.toISOString().split("T")[0]);
        setCheckOut(tomorrow.toISOString().split("T")[0]);
    }, []);

    // Close date pickers when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".date-picker-container")) {
                setShowCheckInPicker(false);
                setShowCheckOutPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return date.toLocaleDateString("id-ID", options);
    };

    const apartmentList = apartments || [
        {
            id: 1,
            name: "Malioboro co-living",
            location: "800 m dari Malioboro",
            price: "Rp 450 rb/malam",
            priceColor: "#c90d0d",
            image: "https://placehold.co/707x434",
            rating: 4.8,
            reviews: 127,
        },
        {
            id: 2,
            name: "Soedirman Apart",
            location: "Jl. Sudirman",
            price: "Rp 550 rb/malam",
            priceColor: "#c90d0d",
            image: "https://placehold.co/707x434",
            rating: 4.9,
            reviews: 89,
        },
        {
            id: 3,
            name: "Seturan Cozy Loft",
            location: "Dekat UGM",
            price: "Rp 440 rb/malam",
            priceColor: "#c90d0d",
            image: "https://placehold.co/707x434",
            rating: 4.7,
            reviews: 156,
        },
        {
            id: 4,
            name: "Prawirotaman Heritage",
            location: "Jl. Prawirotaman",
            price: "Rp 380 rb/malam",
            priceColor: "#c90d0d",
            image: "https://placehold.co/707x434",
            rating: 4.6,
            reviews: 203,
        },
        {
            id: 5,
            name: "Kaliurang Mountain View",
            location: "Kaliurang",
            price: "Rp 650 rb/malam",
            priceColor: "#c90d0d",
            image: "https://placehold.co/707x434",
            rating: 4.9,
            reviews: 94,
        },
        {
            id: 6,
            name: "Tugu Station Apartment",
            location: "Dekat Stasiun Tugu",
            price: "Rp 420 rb/malam",
            priceColor: "#c90d0d",
            image: "https://placehold.co/707x434",
            rating: 4.5,
            reviews: 178,
        },
    ];

    return (
        <>
            <Head title="Apartemen - Lilo Apart" />
            <div
                className="min-h-screen bg-white font-['Poppins']"
                data-theme="light"
            >
                <Header auth={auth} />

                <div className="px-4 lg:px-16 py-8 pt-24 lg:pt-32 max-w-[1440px] mx-auto">
                    {/* Page Title */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
                            Apartemen Terbaik di Jogja
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Temukan apartemen yang sempurna untuk liburan Anda
                        </p>
                    </div>

                    {/* Booking Form */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 lg:p-12 mb-12">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Guests */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-gray-600" />
                                    <label className="text-lg font-medium text-black">
                                        Jumlah Tamu
                                    </label>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() =>
                                            setGuests(Math.max(1, guests - 1))
                                        }
                                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <div className="flex-1 text-center">
                                        <span className="text-2xl font-bold text-black">
                                            {guests}
                                        </span>
                                        <span className="text-gray-600 ml-2">
                                            Orang
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setGuests(guests + 1)}
                                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Check In */}
                            <div className="space-y-4 relative date-picker-container">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-gray-600" />
                                    <label className="text-lg font-medium text-black">
                                        Check In
                                    </label>
                                </div>
                                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                                    <span className="text-gray-700">
                                        {formatDate(checkIn)}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setShowCheckInPicker(
                                                !showCheckInPicker
                                            )
                                        }
                                        className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <Calendar className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                                {showCheckInPicker && (
                                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
                                        <input
                                            type="date"
                                            value={checkIn}
                                            onChange={(e) => {
                                                setCheckIn(e.target.value);
                                                setShowCheckInPicker(false);
                                                // Auto-update checkout if it's before new checkin
                                                if (
                                                    checkOut &&
                                                    new Date(e.target.value) >=
                                                        new Date(checkOut)
                                                ) {
                                                    const newCheckOut =
                                                        new Date(
                                                            e.target.value
                                                        );
                                                    newCheckOut.setDate(
                                                        newCheckOut.getDate() +
                                                            1
                                                    );
                                                    setCheckOut(
                                                        newCheckOut
                                                            .toISOString()
                                                            .split("T")[0]
                                                    );
                                                }
                                            }}
                                            min={
                                                new Date()
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Check Out */}
                            <div className="space-y-4 relative date-picker-container">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-gray-600" />
                                    <label className="text-lg font-medium text-black">
                                        Check Out
                                    </label>
                                </div>
                                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                                    <span className="text-gray-700">
                                        {formatDate(checkOut)}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setShowCheckOutPicker(
                                                !showCheckOutPicker
                                            )
                                        }
                                        className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <Calendar className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                                {showCheckOutPicker && (
                                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
                                        <input
                                            type="date"
                                            value={checkOut}
                                            onChange={(e) => {
                                                setCheckOut(e.target.value);
                                                setShowCheckOutPicker(false);
                                            }}
                                            min={
                                                checkIn
                                                    ? (() => {
                                                          const minDate =
                                                              new Date(checkIn);
                                                          minDate.setDate(
                                                              minDate.getDate() +
                                                                  1
                                                          );
                                                          return minDate
                                                              .toISOString()
                                                              .split("T")[0];
                                                      })()
                                                    : new Date()
                                                          .toISOString()
                                                          .split("T")[0]
                                            }
                                            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="flex justify-center mt-8">
                            <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2">
                                <Search className="w-5 h-5" />
                                Cari Apartemen
                            </button>
                        </div>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Search Bar */}
                            <div className="flex-1 relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <Search className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari apartemen..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Sort Filter */}
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700">
                                    Urutkan:
                                </span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                >
                                    <option value="">Pilih</option>
                                    <option value="asc">Harga Terendah</option>
                                    <option value="desc">
                                        Harga Tertinggi
                                    </option>
                                    <option value="name">Nama A-Z</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results Info */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-black">
                            Apartemen Tersedia ({apartmentList.length})
                        </h2>
                    </div>

                    {/* Apartments Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {apartmentList.map((apartment) => (
                            <div
                                key={apartment.id}
                                className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative">
                                    <img
                                        src={apartment.image}
                                        alt={apartment.name}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                                            <Star
                                                size={14}
                                                className="text-yellow-500 fill-current"
                                            />
                                            <span className="text-sm font-semibold text-black">
                                                {apartment.rating}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-black mb-2">
                                            {apartment.name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-gray-600 mb-3">
                                            <MapPin
                                                size={16}
                                                className="text-gray-400"
                                            />
                                            <span className="text-sm">
                                                {apartment.location}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <span className="text-xl font-bold text-black">
                                                {apartment.price}
                                            </span>
                                        </div>

                                        <Link
                                            href={`/apartments/${apartment.id}`}
                                            className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                                        >
                                            Detail
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="text-center mt-12">
                        <button className="border border-black text-black hover:bg-black hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300">
                            Muat Lebih Banyak
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
