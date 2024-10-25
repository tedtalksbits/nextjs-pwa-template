'use client';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Button } from './button';
import { usePathname, useRouter } from 'next/navigation';
import SideNav from '@/app/components/SideNav';

export default function GoBack() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      {pathname === '/' ? (
        // <h1 className='sm:text-2xl font-bold animate-slide-in-blurred-left'>
        //   Home Fin 🦈
        // </h1>
        <div className='sm:hidden'>
          <SideNav />
        </div>
      ) : (
        <Button
          size={'icon'}
          variant='outline'
          className='animate-slide-in-blurred-left bg-card'
          onClick={() => router.back()}
        >
          <ArrowLeft size={24} />
        </Button>
      )}
    </>
  );
}

GoBack.displayName = 'GoBack';
