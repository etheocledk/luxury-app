'use client'; // Indique que ce code s'exécute côté client
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Home() {
  useEffect(() => {
    redirect('/listings');
  }, []);

  return (
    <div>
    </div>
  );
}
