'use client';

import { useEffect, useState } from 'react';
import Preloader from '@/components/preloader/preloader';

export default function LayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return <>{children}</>;
}