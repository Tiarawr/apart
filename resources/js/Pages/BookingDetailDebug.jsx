import React from "react";
import { Head } from "@inertiajs/react";

export default function BookingDetail({ booking, transaction }) {
  return (
    <>
      <Head title="Detail Pemesanan" />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Detail Pemesanan</h1>

          {/* Debug Info */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Debug Info</h2>
            <div className="space-y-2">
              <p>
                <strong>Order ID:</strong> {transaction?.order_id || "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {transaction?.status || "N/A"}
              </p>
              <p>
                <strong>Amount:</strong> {transaction?.amount || "N/A"}
              </p>
              <p>
                <strong>Guest Name:</strong> {booking?.guest_name || "N/A"}
              </p>
              <p>
                <strong>Guest Email:</strong> {booking?.guest_email || "N/A"}
              </p>
              <p>
                <strong>Apartment:</strong> {booking?.apartment_name || "N/A"}
              </p>
              <p>
                <strong>Check-in:</strong> {booking?.check_in_date || "N/A"}
              </p>
              <p>
                <strong>Check-out:</strong> {booking?.check_out_date || "N/A"}
              </p>
            </div>
          </div>

          {/* Raw Data */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Raw Data</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Transaction:</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                  {JSON.stringify(transaction, null, 2)}
                </pre>
              </div>
              <div>
                <h3 className="font-medium mb-2">Booking:</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                  {JSON.stringify(booking, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
