"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SettingsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/Settings/Profile');
  }, [router]);

  return null;
}