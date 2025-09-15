'use client'
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { navBarItems } from '@/constants/navbar-items'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

const NavBarSubMenu = () => {
    const [openPopover, setOpenPopover] = useState<string | null>(null)
    const router = useRouter();

    const navigate = (href: string) => {
        router.push(href);
        setOpenPopover(null);
    }

    return (
        <div className='flex gap-x-5 items-center h-full'>
            {navBarItems.map((section) => (
                <Popover
                    key={section.section}
                    open={openPopover === section.section}
                    onOpenChange={(isOpen) =>
                        setOpenPopover(isOpen ? section.section : null)
                    }>
                    <PopoverTrigger asChild>
                        <button className='flex items-center whitespace-nowrap text-[12px] text-slate-500 px-2 py-2 rounded-2xl bg-gray-100'>
                            <span>{section.section}</span> <ChevronDown className='w-4 h-4 mt-1' />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[150px] p-1'>
                        {section.items.map((item) => (
                            <div onClick={() => navigate(item.href)} key={item.id} className="text-[12px] text-slate-500 hover:bg-gray-100 p-2 cursor-pointer rounded-2xl">
                                {item.title}
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>
            ))}
        </div>
    )
}

export default NavBarSubMenu