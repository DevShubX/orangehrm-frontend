'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import z from 'zod'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const systemUserSearchFormSchema = z.object({
    username: z.string(),
    userRole: z.string(),
    employeeName: z.string(),
    status: z.string(),
});

export type SysteUserSearchForm = z.infer<typeof systemUserSearchFormSchema>;

const SystemUserSearchForm = ({
    handleSearch
}: { handleSearch: (data: SysteUserSearchForm) => void }) => {

    const {
        register,
        handleSubmit,
        reset,
        control,
    } = useForm<SysteUserSearchForm>({
        resolver: zodResolver(systemUserSearchFormSchema),
        defaultValues: {
            username: "",
            userRole: "", // empty means placeholder will show
            employeeName: "",
            status: "",
        },
    });

    return (
        <div className='bg-white p-5 rounded-[25px]'>
            <header className='text-[15px] text-slate-500 font-[600]'>
                System Users
            </header>
            <hr className='my-3' />
            <form
                onSubmit={handleSubmit(handleSearch)}>
                <div className='grid grid-cols-2 gap-y-4 w-full lg:flex justify-evenly text-[12px] gap-x-5 text-slate-500'>
                    <div className='w-full'>
                        <span>Username</span>
                        <input
                            type="text"
                            placeholder='Username'
                            className='mt-1 border border-[#e8eaef] px-2 py-3 w-full rounded-lg text-[12px] outline-0 focus:outline-1'
                            {...register('username')}
                        />
                    </div>
                    <div className='w-full flex flex-col'>
                        <span>User Role</span>
                        <Controller
                            control={control}
                            name='userRole'
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className='mt-1 border border-[#e8eaef] px-2 py-5 shadow-none w-full rounded-lg text-[12px] outline-0 focus:outline-1'>
                                        <SelectValue placeholder='-- Select --' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="ess">ESS</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    <div className='w-full'>
                        <span>Employee Name</span>
                        <input
                            type="text"
                            placeholder='Type for hints...'
                            className='mt-1 border border-[#e8eaef] px-2 py-3 w-full rounded-lg text-[12px] outline-0 focus:outline-1'
                            {...register('employeeName')}
                        />
                    </div>
                    <div className='w-full'>
                        <span>Status</span>
                        <Controller
                            control={control}
                            name='status'
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className='mt-1 border border-[#e8eaef] px-2 py-5 shadow-none w-full rounded-lg text-[12px] outline-0 focus:outline-1'>
                                        <SelectValue placeholder='-- Select --' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="enabled">Enabled</SelectItem>
                                        <SelectItem value="disabled">Disabled</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                </div>
                <hr className='my-4' />
                <div className='w-full flex flex-row justify-end gap-x-5 text-[15px]'>
                    <button type="button" onClick={() => reset()} className='cursor-pointer hover:border-green-400 hover:text-green-400 border border-green-500 text-green-500 px-8 py-1 rounded-[20px]'>
                        Reset
                    </button>
                    <button type="submit" className='cursor-pointer hover:bg-green-400 bg-green-500 text-white px-8 py-1 rounded-[20px]'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SystemUserSearchForm