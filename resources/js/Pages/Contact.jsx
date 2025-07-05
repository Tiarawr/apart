import { Head, Link } from "@inertiajs/react";
import Header from "@/Components/Header";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    MessageCircle,
    Send,
    User,
    MessageSquare,
} from "lucide-react";
import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form submitted:", formData);
        // Reset form
        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        });
        alert("Pesan berhasil dikirim! Kami akan menghubungi Anda segera.");
    };

    return (
        <>
            <Head title="Kontak - Lilo Apart" />
            <div
                className="min-h-screen bg-white font-['Poppins']"
                data-theme="light"
            >
                <Header />

                {/* Hero Section */}
                <section className="bg-gray-50 pt-24 lg:pt-32 pb-16">
                    <div className="container mx-auto px-4 lg:px-16">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                                Hubungi Kami
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Punya pertanyaan atau butuh bantuan? Jangan ragu
                                untuk menghubungi kami. Tim customer service
                                kami siap membantu Anda 24/7.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Info & Form */}
                <section className="py-16">
                    <div className="container mx-auto px-4 lg:px-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Information */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-black mb-6">
                                        Informasi Kontak
                                    </h2>
                                    <p className="text-gray-600 mb-8">
                                        Silakan hubungi kami melalui salah satu
                                        cara berikut atau gunakan form di
                                        samping.
                                    </p>
                                </div>

                                {/* Contact Cards */}
                                <div className="space-y-6">
                                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Phone size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-black mb-2">
                                                    Telepon
                                                </h3>
                                                <p className="text-gray-600 mb-2">
                                                    Hubungi kami langsung untuk
                                                    konsultasi
                                                </p>
                                                <p className="text-black font-medium">
                                                    +62 812-3456-7890
                                                </p>
                                                <p className="text-black font-medium">
                                                    +62 274-123-456
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Mail size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-black mb-2">
                                                    Email
                                                </h3>
                                                <p className="text-gray-600 mb-2">
                                                    Kirim email untuk pertanyaan
                                                    detail
                                                </p>
                                                <p className="text-black font-medium">
                                                    info@liloapart.com
                                                </p>
                                                <p className="text-black font-medium">
                                                    booking@liloapart.com
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-black mb-2">
                                                    Alamat
                                                </h3>
                                                <p className="text-gray-600 mb-2">
                                                    Kunjungi kantor kami
                                                </p>
                                                <p className="text-black font-medium">
                                                    Jl. Malioboro No. 123
                                                    <br />
                                                    Gedung Lilo Apart, Lt. 2
                                                    <br />
                                                    Yogyakarta 55213
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Clock size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-black mb-2">
                                                    Jam Operasional
                                                </h3>
                                                <p className="text-gray-600 mb-2">
                                                    Kami siap melayani Anda
                                                </p>
                                                <div className="text-black font-medium">
                                                    <p>
                                                        Senin - Jumat: 08:00 -
                                                        22:00
                                                    </p>
                                                    <p>
                                                        Sabtu - Minggu: 09:00 -
                                                        21:00
                                                    </p>
                                                    <p className="text-green-600 text-sm mt-1">
                                                        Customer Service 24/7
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="font-semibold text-black mb-4">
                                        Ikuti Kami
                                    </h3>
                                    <div className="flex gap-4">
                                        <a
                                            href="#"
                                            className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                                        >
                                            <MessageCircle size={18} />
                                        </a>
                                        <a
                                            href="#"
                                            className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                                        >
                                            <Mail size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-black mb-6">
                                    Kirim Pesan
                                </h2>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nama Lengkap
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                                    placeholder="Masukkan nama Anda"
                                                />
                                                <User
                                                    size={18}
                                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                                    placeholder="nama@email.com"
                                                />
                                                <Mail
                                                    size={18}
                                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nomor Telepon
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                                placeholder="08123456789"
                                            />
                                            <Phone
                                                size={18}
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subjek
                                        </label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        >
                                            <option value="">
                                                Pilih subjek
                                            </option>
                                            <option value="booking">
                                                Booking Apartemen
                                            </option>
                                            <option value="inquiry">
                                                Pertanyaan Umum
                                            </option>
                                            <option value="complaint">
                                                Keluhan/Saran
                                            </option>
                                            <option value="partnership">
                                                Kerjasama
                                            </option>
                                            <option value="other">
                                                Lainnya
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pesan
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={4}
                                                className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                                                placeholder="Tulis pesan Anda di sini..."
                                            />
                                            <MessageSquare
                                                size={18}
                                                className="absolute left-3 top-4 text-gray-400"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Send size={18} />
                                        Kirim Pesan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 lg:px-16">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-black mb-4">
                                Lokasi Kami
                            </h2>
                            <p className="text-gray-600">
                                Kunjungi kantor kami di pusat kota Yogyakarta
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="aspect-video bg-gray-200 flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin
                                        size={48}
                                        className="text-gray-400 mx-auto mb-4"
                                    />
                                    <p className="text-gray-600">
                                        Google Maps akan dimuat di sini
                                    </p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Jl. Malioboro No. 123, Yogyakarta
                                    </p>
                                </div>
                            </div>
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
