'use client';


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  group: string;
};

type EmployeeType = {
  id: string;
  custom_id: string;
  name: string;
  gender:'Male' | 'Female';
  price: string;
  group: string;
};

export default function Employee({ group }: { group: string }) {
  const router = useRouter();
  const [list, setList] = useState<EmployeeType[]>([]);
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/employees?group=${encodeURIComponent(group)}`);
        const data = await res.json();
        console.log('Fetched from API:', data);
        console.log('Group:', group);

        setList(data.data || []);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [group]);
  
  const filtered = list.filter((e) =>
    e.name.toLowerCase().startsWith(searchText.toLowerCase())
  );



  return (
    <div className="space-y-6">
      <button
        onClick={() => router.push('/dashboard')}
        className="text-sm bg-[#C54B8C] text-white px-4 py-2 rounded hover:bg-pink-600 transition"
      >
        ← Back to Dashboard
      </button>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 relative">
        <div className="relative w-full sm:w-auto flex-1">
          <input
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          placeholder={`${group} data search`}
          className="w-full border px-4 py-2 rounded text-black shadow-sm"
          />
          {searchText && showDropdown && filtered.length > 0 && (
            <ul className="absolute z-10 w-full bg-white/90 border border-[#C54B8C] mt-1 rounded shadow-md max-h-48 overflow-y-auto backdrop-blur-sm">
              {filtered.map((e) => (
                <li
                  key={e.custom_id}
                    className="px-4 py-2  text-black hover:bg-[#C54B8C] hover:text-white cursor-pointer transition"
                    onClick={() => 
                      setSearchText(e.name)}
                      >
                      {e.name}
                      </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={() => router.push(`/addemployee?group=${encodeURIComponent(group)}&mode=add`)}
          className="bg-[#C54B8C] text-white px-4 py-2 rounded hover:bg-pink-600 transition"
          > 

          + Add Data
          </button>
      </div>

      <ul className="space-y-3">
        {(searchText ? filtered : list).length > 0 ? (
          (searchText ? filtered : list).map((e) => (
            <li
              key={e.custom_id}
              className="bg-white px-4 py-3 rounded-md border border-[#C54B8C] shadow-sm"
            >
              <p className="font-bold text-[#C54B8C]">{e.name}</p>
              <p className="text-sm text-[#8a2a64]">
                ID: {e.custom_id} | Gender: {e.gender}
                </p>
              <p className="text-sm italic text-[#8a2a64]">Price: {e.price}</p>
              </li>
          ))
        ) : (
          <p className='text-sm italic text-[#8a2a64]'>
            {searchText ? 'No results found.' : 'No data yet.'}

          </p>
        )}
      </ul>
      </div>
  );
}