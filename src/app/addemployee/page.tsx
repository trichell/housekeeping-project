'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Snackbar from '@/components/Snackbar';

type Employee = {
  id: string;
  custom_id: string;
  name: string;
  gender: 'Male' | 'Female';
  price: string;
  group: string;
};

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const group = searchParams.get('group') || 'Housekeeping Employee';

  const prefixMap: Record<string, string> = {
    'Housekeeping Employee': 'HSK',
    'Babysitter Employee': 'BYS',
    'Pet Caretaker Employee': 'PET',
    'Security Employee': 'SEC',
    'Movers Employee': 'MOV',
  };
  const prefix = prefixMap[group] || 'EMP';

  const [list, setList] = useState<Employee[]>([]);
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [price, setPrice] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [SnackbarMessage, setSnackbarMessage] = useState('');

  const fetchEmployees = async () => {
  const res = await fetch(http://localhost:3001/api/employees?group=${encodeURIComponent(group)});
    const data = await res.json();
    setList(data.data|| []);
    };

    useEffect(() => {
      fetchEmployees();
    }, [group]);

    const showSnackbar = (message: string) => {
        setSnackbarMessage(message);
        setTimeout(() => {
            setSnackbarMessage('');
        }, 3000);
    };
   


  const handleAddOrSave = async () => {
    if (!name.trim() || !price.trim()) return;

    if (editingIndex !== null) {
        const employee = list[editingIndex];
        await fetch(/api/employees/${employee.id}, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, gender, price }),
            });      
            showSnackbar(Edited employee: ${name} successfully);
    } else if (list.some((e) => e.name === name)) {
        showSnackbar(Employee with name "${name}" already exists.);
        return;
    } else {
      const nextId = `${prefix}-${String(
       list.length + 1).padStart(3, '0')}`;
         await fetch('http://localhost:3001/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ custom_id: nextId, name, gender, price, group }),
      });
      showSnackbar(Added employee: ${name} successfully);
    }

    setName('');
    setGender('Male');
    setPrice('');
    setEditingIndex(null);

    fetchEmployees();
  };

  const handleEdit = (index: number) => {
    const emp = list[index];
    setEditingIndex(index);
    setName(emp.name);
    setGender(emp.gender);
    setPrice(emp.price);
  };

  const handleDelete = async (index: number) => {
    const employee = list[index];
    await fetch(http://localhost:3001/api/employees/${employee.id}, {
        method: 'DELETE',
 });
 showSnackbar(Deleted employee: ${employee.name} successfully);

 if (editingIndex === index) {
      setEditingIndex(null);
      setName('');
      setGender('Male');
      setPrice('');
 }
 fetchEmployees();
  };



  return (
    <div className="min-h-screen bg-[#FFF0F6] px-4 py-10 space-y-6 w-full">
      <h1 className="text-2xl font-bold text-center text-[#C54B8C]">{group}</h1>

      <button
        onClick={() =>
          router.push(
            `/dashboard/detail?role=${encodeURIComponent(group)}
          `)
        }
        className="text-sm bg-[#C54B8C] text-white px-4 py-2 rounded hover:bg-pink-600 transition"
      >
        ← Back to Employee
      </button>

      {editingIndex !== null && (
        <p className="text-sm text-yellow-600 font-medium">
            Editing data ID:{''}
             <span className="font-semibold">{list[editingIndex]?.id}</span>
        </p>
      )}

      <div className="flex flex-col gap-3 bg-white p-4 rounded-lg shadow border border-[#C54B8C] w-full">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border border-[#C54B8C] px-3 py-2 rounded text-sm text-black w-full"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setGender('Male')}
            className={`px-3 py-2 text-sm rounded border ${
              gender === 'Male'
                ? 'bg-[#C54B8C] text-white'
                : 'border-[#C54B8C] text-black'
            }`}
          >
            Male
          </button>
          <button
            onClick={() => setGender('Female')}
            className={`px-3 py-2 text-sm rounded border ${
              gender === 'Female'
                ? 'bg-[#C54B8C] text-white'
                : 'border-[#C54B8C] text-black'
            }`}
          >
            Female
          </button>
        </div>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Rp100.000 / Day"
          className="border border-[#C54B8C] px-3 py-2 rounded text-sm text-black w-full"
        />
        <button
          onClick={handleAddOrSave}
          className={`${
            editingIndex !== null
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-[#C54B8C] hover:bg-[#a33a77]'
          } text-white px-4 py-2 rounded text-sm font-semibold`}
        >
          {editingIndex !== null ? 'Save' : 'Add'}
        </button>
      </div>

      <ul className="space-y-3 w-full">
        {list.length > 0 ? (
            list.map((e, i) => (
            <li
              key={e.custom_id}
              className="bg-white px-4 py-3 rounded-md border border-[#C54B8C] shadow-sm space-y-1"
            >
              <p className="font-bold text-[#C54B8C]">{e.name}</p>
              <p className="text-sm text-[#8a2a64]">
                ID: {e.custom_id} • Gender: {e.gender}
              </p>
              <p className="text-sm italic text-[#8a2a64]">Price: {e.price}</p>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleEdit(i)}
                  className="text-xs bg-pink-400 text-white px-3 py-1 rounded hover:bg-pink-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(i)}
                  className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-sm italic text-[#8a2a64]">No data yet.</p>
        )}
      </ul>

      {SnackbarMessage && (
        <Snackbar 
        message={SnackbarMessage} 
        visible={true}
        onClose={() => setSnackbarMessage('')}
        />
      )}
    </div>
  );
}
