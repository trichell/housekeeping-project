'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  Employee as EmployeeType,
} from '../data/employee';

export default function Employee({ group }: { group: string }) {
  const router = useRouter();

  const [list, setList] = useState<EmployeeType[]>([]);
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const refresh = () => setList(getEmployees(group));

  useEffect(() => {
    refresh();
  }, [group]);

  const handleSave = () => {
    if (!name.trim() || !price.trim()) return;

    const data = {
      name,
      gender,
      price,
      group,
    };

    if (editingId !== null) {
      updateEmployee(editingId, data);
    } else {
      addEmployee(data);
    }

    setName('');
    setGender('Male');
    setPrice('');
    setEditingId(null);
    refresh();
  };

  const handleEdit = (e: EmployeeType) => {
    setName(e.name);
    setGender(e.gender);
    setPrice(e.price);
    setEditingId(e.id);
  };

  const handleDelete = (id: string) => {
    deleteEmployee(id);
    refresh();
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.push('/dashboard')}
        className="text-sm bg-[#C54B8C] text-white px-4 py-2 rounded hover:bg-pink-600 transition-all"
      >
        ← back
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:items-end">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border px-3 py-2 rounded text-black"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as 'Male' | 'Female')}
          className="border px-3 py-2 rounded text-black"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border px-3 py-2 rounded text-black"
        />
        <button
          onClick={handleSave}
          className={`text-white px-4 py-2 rounded font-semibold ${
            editingId
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-[#C54B8C] hover:bg-[#a33a77]'
          }`}
        >
          {editingId ? 'Save' : 'Add'}
        </button>
      </div>

      <ul className="space-y-3">
        {list.map((e) => (
          <li
            key={e.id}
            className="flex justify-between items-center bg-white px-4 py-3 rounded-md border border-[#C54B8C] shadow-sm"
          >
            <div>
              <p className="font-bold text-[#C54B8C]">{e.name}</p>
              <p className="text-sm text-[#8a2a64]">ID: {e.id} • Gender: {e.gender}</p>
              <p className="text-sm italic text-[#8a2a64]">Price: {e.price}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(e)}
                className="text-xs bg-pink-400 text-white px-3 py-1 rounded hover:bg-pink-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(e.id)}
                className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}