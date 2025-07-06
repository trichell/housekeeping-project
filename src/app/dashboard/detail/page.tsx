'use client';
import { useSearchParams } from 'next/navigation';
import Employee from '../../../components/employee';

export default function DetailPage() {
  const params = useSearchParams();
  const group = params.get('role') || '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F6D9EE] to-[#F3C78D] px-6 py-7">
      <div className="max-w-1xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-[#C54B8C] mb-4">
          Data {group}
        </h1>
        {group ? (
          <Employee group={group} />
        ) : (
          <p className="text-[#555] text-sm">No role was chosen.</p>
        )}
      </div>
    </div>
  );
}