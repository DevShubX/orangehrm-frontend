'use client'
import { User } from '@/models/user.model'
import { Pencil, Plus, Trash, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React  from 'react'

const SystemUserList = ({
    usersList,
    isLoading,
}: { usersList: User[], isLoading: boolean }) => {
    const router = useRouter();


    return (
        <div className='bg-white rounded-[25px]'>
            <div className='p-5'>
                <button onClick={() => router.push('/admin/addSystemUser')} type="button" className='flex gap-x-1 cursor-pointer hover:bg-green-400 bg-green-500 text-white px-6 py-1 rounded-[20px]'>
                    <Plus /> Add
                </button>
                <hr className='my-6' />
                <div className='text-slate-500'>
                    ({usersList.length}) Records Found
                </div>
            </div>

            <div className='bg-[#e8eaef]' role='table'>
                <header className='p-5 flex justify-between text-[12px] text-slate-500 font-[600]' role='row'>
                    <span className='mr-2'>
                        <input type="checkbox" />
                    </span>
                    <span className='flex-[1_1_0%]'>
                        Username
                    </span>
                    <span className='flex-[1_1_0%]'>
                        User Role
                    </span>
                    <span className='flex-[1_1_0%]'>
                        Employee Name
                    </span>
                    <span className='flex-[1_1_0%]'>
                        Status
                    </span>
                    <span className='flex-[1_1_0%]'>
                        Actions
                    </span>
                </header>
                <div className='p-2 space-y-5' role='rowgroup'>
                    {usersList.map((user) => (
                        <div key={user._id}
                            role='row'
                            className='bg-white p-2 rounded-[2rem] flex flex-nowrap items-center text-[12px]'>
                            <span className='mr-2'>
                                <input type="checkbox" />
                            </span>
                            <span className='flex-[1_1_0%]'>
                                {user.username}
                            </span>
                            <span className='flex-[1_1_0%] capitalize'>
                                {user.userRole}
                            </span>
                            <span className='flex-[1_1_0%]'>
                                {user.employeeName}
                            </span>
                            <span className='flex-[1_1_0%] capitalize'>
                                {user.status}
                            </span>
                            <div className='flex-[1_1_0%]'>
                                <div className='flex gap-x-5'>
                                    <span className='bg-slate-200 p-3 rounded-full hover:bg-red-200 cursor-pointer'>
                                        <Trash2 className='w-4 h-4' />
                                    </span>
                                    <span className='bg-slate-200 p-3 rounded-full hover:bg-yellow-200 cursor-pointer'>
                                        <Pencil className='w-4 h-4' />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SystemUserList