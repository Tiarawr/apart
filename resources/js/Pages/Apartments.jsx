import { Head, Link, router } from "@inertiajs/react";
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

export default function Apartments({ apartments = {}, filters = {} }) {
  // Handle filters being an array instead of object
  const safeFilters = Array.isArray(filters) ? {} : filters;

  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [showDatePrompt, setShowDatePrompt] = useState(false);

  // Set default dates and filters
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Check if dates are in URL params
    const hasDateParams = safeFilters.checkIn && safeFilters.checkOut;

    if (hasDateParams) {
      // Use dates from URL
      setCheckIn(safeFilters.checkIn);
      setCheckOut(safeFilters.checkOut);
      setShowDatePrompt(false);
    } else {
      // No dates in URL, show prompt
      setShowDatePrompt(true);
    }

    // Set other filters from URL parameters
    if (safeFilters && typeof safeFilters === "object") {
      if (safeFilters.sort) setSortBy(safeFilters.sort);
      if (safeFilters.search) setSearchQuery(safeFilters.search);
      if (safeFilters.guests) setGuests(parseInt(safeFilters.guests));
    }
  }, [safeFilters]);

  // Filter and sort apartments
  useEffect(() => {
    // Only filter if we have valid dates
    if (showDatePrompt || !checkIn || !checkOut) {
      setFilteredApartments([]);
      return;
    }

    let filtered = apartments?.data || [];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (apartment) =>
          apartment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          apartment.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort apartments
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case "asc":
            return a.price - b.price;
          case "desc":
            return b.price - a.price;
          case "name":
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
    }

    setFilteredApartments(filtered);
  }, [apartments, searchQuery, sortBy, checkIn, checkOut, showDatePrompt]);

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
    if (!dateString) return "Pilih tanggal";
    // Parse date secara konsisten untuk menghindari timezone issues
    const [year, month, day] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Use filtered apartments
  const apartmentList = filteredApartments;

  // Handle search button click
  const handleSearch = () => {
    // Validation: check if dates are selected
    if (!checkIn || !checkOut) {
      alert("Silakan pilih tanggal check-in dan check-out terlebih dahulu");
      return;
    }

    // Parse dates properly to avoid timezone issues
    const [checkInYear, checkInMonth, checkInDay] = checkIn.split("-");
    const [checkOutYear, checkOutMonth, checkOutDay] = checkOut.split("-");

    const checkInDate = new Date(
      parseInt(checkInYear),
      parseInt(checkInMonth) - 1,
      parseInt(checkInDay)
    );
    const checkOutDate = new Date(
      parseInt(checkOutYear),
      parseInt(checkOutMonth) - 1,
      parseInt(checkOutDay)
    );

    // Validation: check if check-out is after check-in
    if (checkOutDate <= checkInDate) {
      alert("Tanggal check-out harus setelah tanggal check-in");
      return;
    }

    // Validation: check if dates are not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for comparison

    if (checkInDate < today) {
      alert("Tanggal check-in tidak boleh di masa lalu");
      return;
    }

    // Hide date prompt and show results
    setShowDatePrompt(false);

    // Apply current filters and redirect to update URL
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (sortBy) params.append("sort", sortBy);
    if (guests > 1) params.append("guests", guests);
    if (checkIn) params.append("checkIn", checkIn);
    if (checkOut) params.append("checkOut", checkOut);

    const queryString = params.toString();
    const newUrl = queryString ? `/apartments?${queryString}` : "/apartments";

    // Use Inertia to navigate with new filters
    router.visit(newUrl);
  };

  // Handle Enter key press for auto-search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Head title="Apartemen - Lilo Apart" />
      <div
        className="min-h-screen bg-white font-['Poppins']"
        data-theme="light"
      >
        <Header />

        <div className="px-4 sm:px-6 lg:px-16 py-8 pt-24 lg:pt-32 max-w-[1440px] mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
              Apartemen Terbaik di Jogja
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Temukan apartemen yang sempurna untuk liburan Anda
            </p>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-12 mb-8 lg:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {/* Guests */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  <label className="text-base sm:text-lg font-medium text-black">
                    Jumlah Tamu
                  </label>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Minus size={14} className="sm:w-4 sm:h-4" />
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-xl sm:text-2xl font-bold text-black">
                      {guests}
                    </span>
                    <span className="text-gray-600 ml-2 text-sm sm:text-base">
                      Orang
                    </span>
                  </div>
                  <button
                    onClick={() => setGuests(guests + 1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Plus size={14} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              {/* Check In */}
              <div className="space-y-3 sm:space-y-4 relative date-picker-container">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  <label className="text-base sm:text-lg font-medium text-black">
                    Check In
                  </label>
                </div>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2 sm:p-3">
                  <span className="text-gray-700 text-sm sm:text-base truncate">
                    {formatDate(checkIn)}
                  </span>
                  <button
                    onClick={() => setShowCheckInPicker(!showCheckInPicker)}
                    className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
                  >
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                  </button>
                </div>
                {showCheckInPicker && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 w-full">
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        setShowCheckInPicker(false);
                        // Auto-update checkout if it's before new checkin
                        if (checkOut) {
                          // Parse dates properly without timezone issues
                          const [
                            newCheckInYear,
                            newCheckInMonth,
                            newCheckInDay,
                          ] = e.target.value.split("-");
                          const [checkOutYear, checkOutMonth, checkOutDay] =
                            checkOut.split("-");

                          const newCheckInDate = new Date(
                            parseInt(newCheckInYear),
                            parseInt(newCheckInMonth) - 1,
                            parseInt(newCheckInDay)
                          );
                          const currentCheckOutDate = new Date(
                            parseInt(checkOutYear),
                            parseInt(checkOutMonth) - 1,
                            parseInt(checkOutDay)
                          );

                          if (currentCheckOutDate <= newCheckInDate) {
                            const newCheckOutDate = new Date(newCheckInDate);
                            newCheckOutDate.setDate(
                              newCheckOutDate.getDate() + 1
                            );

                            const year = newCheckOutDate.getFullYear();
                            const month = String(
                              newCheckOutDate.getMonth() + 1
                            ).padStart(2, "0");
                            const day = String(
                              newCheckOutDate.getDate()
                            ).padStart(2, "0");

                            setCheckOut(`${year}-${month}-${day}`);
                          }
                        }
                      }}
                      min={(() => {
                        const today = new Date();
                        const year = today.getFullYear();
                        const month = String(today.getMonth() + 1).padStart(
                          2,
                          "0"
                        );
                        const day = String(today.getDate()).padStart(2, "0");
                        return `${year}-${month}-${day}`;
                      })()}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Check Out */}
              <div className="space-y-3 sm:space-y-4 relative date-picker-container">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  <label className="text-base sm:text-lg font-medium text-black">
                    Check Out
                  </label>
                </div>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2 sm:p-3">
                  <span className="text-gray-700 text-sm sm:text-base truncate">
                    {formatDate(checkOut)}
                  </span>
                  <button
                    onClick={() => setShowCheckOutPicker(!showCheckOutPicker)}
                    className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
                  >
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                  </button>
                </div>
                {showCheckOutPicker && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 w-full">
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
                              // Parse check-in date properly
                              const [year, month, day] = checkIn.split("-");
                              const checkInDate = new Date(
                                parseInt(year),
                                parseInt(month) - 1,
                                parseInt(day)
                              );
                              const minDate = new Date(checkInDate);
                              minDate.setDate(minDate.getDate() + 1);

                              const minYear = minDate.getFullYear();
                              const minMonth = String(
                                minDate.getMonth() + 1
                              ).padStart(2, "0");
                              const minDay = String(minDate.getDate()).padStart(
                                2,
                                "0"
                              );

                              return `${minYear}-${minMonth}-${minDay}`;
                            })()
                          : (() => {
                              const today = new Date();
                              const year = today.getFullYear();
                              const month = String(
                                today.getMonth() + 1
                              ).padStart(2, "0");
                              const day = String(today.getDate()).padStart(
                                2,
                                "0"
                              );
                              return `${year}-${month}-${day}`;
                            })()
                      }
                      className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full bg-black hover:bg-gray-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Cari Apartemen</span>
                  <span className="sm:hidden">Cari</span>
                </button>
              </div>
            </div>
          </div>

          {/* Conditional Content */}
          {showDatePrompt ? (
            <div className="text-center py-12 sm:py-16 bg-gray-50 rounded-lg mx-4 sm:mx-0">
              <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 px-4">
                Silakan Pilih Tanggal Menginap
              </h3>
              <p className="text-gray-600 mb-6 px-4">
                Pilih tanggal check-in dan check-out di form di atas untuk
                melihat apartemen yang tersedia
              </p>
              <div className="flex justify-center px-4">
                <button
                  onClick={() => {
                    // Set default dates dengan timezone-safe
                    const today = new Date();
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);

                    // Format tanggal dengan aman tanpa timezone issues
                    const todayYear = today.getFullYear();
                    const todayMonth = String(today.getMonth() + 1).padStart(
                      2,
                      "0"
                    );
                    const todayDay = String(today.getDate()).padStart(2, "0");

                    const tomorrowYear = tomorrow.getFullYear();
                    const tomorrowMonth = String(
                      tomorrow.getMonth() + 1
                    ).padStart(2, "0");
                    const tomorrowDay = String(tomorrow.getDate()).padStart(
                      2,
                      "0"
                    );

                    setCheckIn(`${todayYear}-${todayMonth}-${todayDay}`);
                    setCheckOut(
                      `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`
                    );
                    setShowDatePrompt(false);
                    setShowCheckInPicker(true);
                  }}
                  className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Pilih Tanggal Sekarang
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Search & Filter Bar */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                  {/* Search Bar */}
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Search className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Cari apartemen..."
                      value={searchQuery}
                      onKeyPress={handleKeyPress}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Sort Filter */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      Urutkan:
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="">Pilih</option>
                      <option value="asc">Harga Terendah</option>
                      <option value="desc">Harga Tertinggi</option>
                      <option value="name">Nama A-Z</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Results Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-2 sm:gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-black">
                  Apartemen Tersedia ({apartmentList.length})
                </h2>
                <div className="text-sm text-gray-600">
                  {formatDate(checkIn)} - {formatDate(checkOut)}
                </div>
              </div>

              {/* Apartments Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8">
                {apartmentList.length > 0 ? (
                  apartmentList.map((apartment) => (
                    <div
                      key={apartment.id}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative">
                        <img
                          src={
                            apartment.images?.[0] ||
                            apartment.image ||
                            "https://placehold.co/707x434"
                          }
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
                            <span className="text-sm text-gray-600">
                              ({apartment.reviews_count || apartment.reviews})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-6">
                        <div className="mb-4">
                          <h3 className="text-lg sm:text-xl font-bold text-black mb-2">
                            {apartment.name}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-600 mb-3">
                            <MapPin
                              size={16}
                              className="text-gray-400 flex-shrink-0"
                            />
                            <span className="text-sm">
                              {apartment.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center gap-1">
                            <span className="text-lg sm:text-xl font-bold text-black">
                              {formatPrice(apartment.price)}
                            </span>
                            <span className="text-sm text-gray-600">
                              /malam
                            </span>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2">
                            <Link
                              href={`/apartments/${apartment.id}`}
                              className="border border-black text-black hover:bg-black hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-center"
                            >
                              Detail
                            </Link>
                            <Link
                              href={`/booking/${apartment.id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-center"
                            >
                              Booking
                              <ArrowRight size={16} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 sm:py-16">
                    <div className="text-gray-400 mb-4">
                      <Search className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4" />
                      <h3 className="text-lg sm:text-xl font-bold text-black mb-2">
                        Tidak ada apartemen yang tersedia
                      </h3>
                      <p className="text-gray-600 px-4">
                        Coba ubah tanggal atau kriteria pencarian Anda
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
