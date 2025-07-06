import { Link } from "@inertiajs/react";
import { MapPin, ArrowRight } from "lucide-react";

export default function ApartmentCard({ apartment }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <figure className="p-6 pb-0">
        <img
          src={
            apartment.images?.[0] ||
            apartment.image ||
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          }
          alt={apartment.name}
          className="rounded-xl w-full h-48 md:h-64 object-cover"
        />
      </figure>
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div className="flex-1">
            <h2 className="text-xl lg:text-2xl font-semibold text-black mb-3">
              {apartment.name}
            </h2>
            <div className="flex items-center gap-2 text-gray-600 text-base lg:text-lg mb-4">
              <MapPin size={18} className="text-gray-500" />
              {apartment.location}
            </div>
            <div className="text-black text-xl lg:text-2xl font-semibold">
              {apartment.price}
            </div>
          </div>
          <div className="flex justify-end">
            <Link
              href={`/apartments/${apartment.id}`}
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
            >
              Detail
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
