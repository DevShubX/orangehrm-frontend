import { sideBarItems } from '@/constants/sidebar-items';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname();

    const isSelected = (path: string) => {
        return pathname.split('/').includes(path);
    }

    return (
        <div className='w-full pt-5 md:w-[16rem] fixed z-50 md:block max-md:hidden inset-y-0 bg-white shadow-md rounded-tr-[40px] rounded-br-[40px]'>
            <div className='flex items-center justify-center w-full'>
                <img src="/assests/ohrm_branding.png" alt="ohrm_branding" className='w-full max-h-[65px] max-w-[200px] object-cover' />
            </div>

            <div className='flex flex-col w-full mt-[50px]'>
                {sideBarItems.map((item) => (
                    <Link
                        href={item.href} 
                        key={item.id}
                        className={cn('flex px-5 py-2 gap-x-4',
                            isSelected(item.id) && 'bg-orange-500 mr-5 rounded-tr-2xl rounded-br-2xl text-white'
                        )}
                    >
                        <span><item.icon /></span>
                        <span>{item.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar