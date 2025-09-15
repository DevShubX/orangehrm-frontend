'use client'
import Navbar from '@/components/custom/Navigation/Navbar'
import Sidebar from '@/components/custom/Navigation/Sidebar'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full w-full'>
            <Navbar />
            <Sidebar />
            <main className='w-full h-full pt-[150px] md:pl-[20rem] bg-[#f6f5fb] pr-[4rem] max-md:pl-[2rem] max-md:pr-[2rem]'>
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout