'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const menu = [
  {
    key: 'housekeeper',
    label: 'Housekeeper',
    submenu: [
      { nama: 'Housekeeping Employee' },
      { nama: 'Pet Caretaker Employee' },
      { nama: 'Babysitter Employee' },
      { nama: 'Security Employee' },
      { nama: 'Movers Employee' },
    ],
  },
  {
    key: 'booking',
    label: 'Booking List',
    submenu: [
      {
        id: '00100',
        user: 'Giska',
        role: 'Babysitter',
        address: 'Jl. Merdeka No.12, Medan',
        time: '08:00 WIB',
        status: 'Sedang diproses',
        photo: '/image/gis.jpg',
      },
      {
        id: '00101',
        user: 'Trichell',
        role: 'Babysitter',
        address: 'Jl. Merdeka No.12, Medan',
        time: '08:00 WIB',
        status: 'Sedang diproses',
        photo: '/image/chel.jpg',
      },
      {
        id: '00102',
        user: 'Mawar',
        role: 'Security',
        address: 'Jl. Bunga Mawar No.5, Medan',
        time: '14:30 WIB',
        status: 'Sedang diproses',
        photo: '/image/war.jpg',
      },
      {
        id: '00103',
        user: 'Nisa',
        role: 'Pet Caretaker',
        address: 'Jl. Sudirman No.33, Medan',
        time: '10:15 WIB',
        status: 'Sedang diproses',
        photo: '/image/nis.jpg',
      },
      {
        id: '00104',
        user: 'Simon',
        role: 'Movers',
        address: 'Jl. Jambu No.21, Medan',
        time: '13:00 WIB',
        status: 'Sedang diproses',
        photo: '/image/mon.jpg',
      },
      {
        id: '00105',
        user: 'Jerry',
        role: 'Housekeeping',
        address: 'Jl. Tanjung Barat No.8, Pakam',
        time: '09:45 WIB',
        status: 'Sedang diproses',
        photo: '/image/jer.jpg',
      },
    ],
  },
  {
    key: 'history',
    label: 'History List',
    submenu: [
      {
        id: '00111',
        user: 'Kirana',
        role: 'Babysitter',
        address: 'Jl. Cemara No.5, Medan',
        start: '2025-06-10',
        end: '2025-06-12',
        price: 'Rp750.000',
        photo: '/image/gis.jpg',
      },
      {
        id: '00112',
        user: 'Harris Caine',
        role: 'Security',
        address: 'Jl. Sakura No.2, Lubuk Pakam',
        start: '2025-06-08',
        end: '2025-06-09',
        price: 'Rp500.000',
        photo: '/image/mon.jpg',
      },
      {
        id: '00113',
        user: 'Key Oriensa',
        role: 'Pet Caretaker',
        address: 'Jl. Ahmad Yani No.45, Perbaungan',
        start: '2025-06-05',
        end: '2025-06-07',
        price: 'Rp650.000',
        photo: '/image/jer.jpg',
      },
      {
        id: '00114',
        user: 'Rion Kenzo',
        role: 'Movers',
        address: 'Jl. Kenanga No.11, Siantar',
        start: '2025-06-03',
        end: '2025-06-03',
        price: 'Rp400.000',
        photo: '/image/chel.jpg',
      },
      {
        id: '00115',
        user: 'Marchie',
        role: 'Housekeeping',
        address: 'Jl. Melati No.9, Binjai',
        start: '2025-06-01',
        end: '2025-06-02',
        price: 'Rp550.000',
        photo: '/image/nis.jpg',
      },
    ],
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const toggleContent = (key: string) => {
    setActiveKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F6D9EE] to-[#F3C78D] px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-5xl font-bold text-[#C54B8C]">Housekeeping</h1>
        <button
          onClick={() => {
          localStorage.clear(); // Bisa juga pakai clear() untuk hapus semua data lokal jika perlu
          router.replace('/login'); // ⬅️ Langsung redirect ke halaman login
        }}
      className="bg-[#C54B8C] text-white px-4 py-2 rounded hover:bg-pink-600 transition-all duration-300"
    >
      Sign Out
      </button>
      </div>

    <div className="text-center mb-10">
        <h2 className="text-lg font-semibold text-[#C54B8C]">
          "Siap Membantu Semua Kebutuhan Anda!"
        </h2>
      </div>


      <div className="flex flex-wrap justify-center gap-7 mb-6">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => toggleContent(item.key)}
            className={`px-8 py-2 rounded-full font-semibold transition-all duration-300 ease-in-out ${
            activeKey === item.key
            ? 'bg-[#C54B8C] text-white hover:bg-pink-600'
            : 'bg-white text-[#C54B8C] border border-[#C54B8C] hover:bg-[#C54B8C] hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        {menu.map((item) =>
          activeKey === item.key ? (
            <div key={item.key} className="space-y-4 transition-all duration-300 mb-6">
              {item.submenu?.map((entry: any) => (
                <div
                  key={entry.id || entry.nama}
                  className="flex justify-between items-start border border-[#C54B8C] text-[#C54B8C] px-4 py-3 rounded-md bg-white"
                >
                  {!entry.user ? (
                    <>
                      <span className="font-medium">{entry.nama}</span>
                     <button
                        onClick={() =>
                          router.push(`/dashboard/detail?role=${encodeURIComponent(entry.nama)}`)
                        }
                        className="text-sm bg-[#C54B8C] text-white px-4 py-1 rounded hover:bg-[#a33a77] transition"
                    > 
                      View
                    </button>
                    </>

                  ) : (
                    <div className="flex items-start gap-4">
                      <img
                        src={entry.photo}
                        alt={entry.user}
                        className="w-12 h-12 rounded-full object-cover border border-[#C54B8C]"
                      />
                      <div className="text-sm">
                        <p className="font-semibold">{entry.user}</p>
                        {item.key === 'booking' ? (
                          <>
                            <p>{entry.status} di {entry.address}</p>
                            <p>Time: {entry.time} • ID: {entry.id}</p>
                            <p>Role: <span className="italic">{entry.role}</span></p>
                          </>
                        ) : (
                          <>
                            <p>{entry.role} di {entry.address}</p>
                            <p>Start: {entry.start} • Finish: {entry.end}</p>
                            <p>Total: <span className="font-semibold">{entry.price}</span> • ID: {entry.id}</p>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : null
        )}
        <footer className="mt-16 border-t border-[#C54B8C] pt-6 text-center text-sm text-[#C54B8C]">
        <p className="font-semibold mb-1">Hubungi Kami</p>
        <p>Wa: 0852-XXXX-XXXX • Ig: @housekeeping_ • Email: housekeeping@email.com</p>
        <p className="mt-2 text-xs text-[#C54B8C]/70">
            &copy; {new Date().getFullYear()} Housekeeping Services. All rights reserved.
        </p>
      </footer>
    </div>
   </div>
  );
}