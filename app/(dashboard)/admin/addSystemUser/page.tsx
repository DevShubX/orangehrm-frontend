'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import api from '@/lib/api';
import toast from 'react-hot-toast';

const addSystemUserFormSchema = z.object({
    username: z.string().min(1, 'Required'),
    userRole: z.string().min(1, 'Required'),
    employeeName: z.string().min(1, 'Required'),
    status: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
    confirmPassword: z.string().min(1, 'Required'),
});

type AddSystemUserForm = z.infer<typeof addSystemUserFormSchema>;

const AddSystemUserPage = () => {

    const {
        register,
        handleSubmit,
        reset,
        control,
        setError,
        formState: { errors }
    } = useForm<AddSystemUserForm>({
        resolver: zodResolver(addSystemUserFormSchema),
        defaultValues: {
            userRole: "",
            employeeName: "",
            status: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handleSearch = async (data: AddSystemUserForm) => {
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', { message: "Password do not match" });
        }
        try {
            const userPromise = api.post('/users/createUser', data);
            toast.promise(userPromise, {
                loading: "Creating user",
                error: "Error creating user",
                success: "User created successfully",
            });
            reset();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('Error', error.message);
            } else {
                console.log('Unknown error', error);
            }
        }
    }


    return (
        <div className='bg-white p-5 rounded-[25px]'>
            <header className='text-[15px] text-slate-500 font-[700]'>
                Add User
            </header>
            <hr className='my-3' />
            <form
                onSubmit={handleSubmit(handleSearch)}>
                <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-y-4 w-full justify-evenly text-[12px] gap-x-5 text-slate-500'>
                    <div className='w-full flex flex-col'>
                        <span>User Role*</span>
                        <Controller
                            control={control}
                            name='userRole'
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className={cn('mt-1 border border-[#e8eaef] px-2 py-5 shadow-none w-full rounded-lg text-[12px] outline-0 focus:outline-1',
                                        errors.userRole && 'border border-red-500'
                                    )}>
                                        <SelectValue placeholder='-- Select --' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="ess">ESS</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <div className='text-red-500'>{errors.userRole?.message}</div>
                    </div>
                    <div className='w-full'>
                        <span>Employee Name*</span>
                        <input
                            type="text"
                            placeholder='Type for hints...'
                            className={cn('mt-1 border border-[#e8eaef] px-2 py-3 w-full rounded-lg text-[12px] outline-0 focus:outline-1', errors.employeeName && 'border border-red-500')}
                            {...register('employeeName')}
                        />
                        <div className='text-red-500'>{errors.employeeName?.message}</div>
                    </div>
                    <div className='w-full'>
                        <span>Status*</span>
                        <Controller
                            control={control}
                            name='status'
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className={cn('mt-1 border border-[#e8eaef] px-2 py-5 shadow-none w-full rounded-lg text-[12px] outline-0 focus:outline-1',
                                        errors.status && 'border border-red-500'
                                    )}>
                                        <SelectValue placeholder='-- Select --' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="enabled">Enabled</SelectItem>
                                        <SelectItem value="disabled">Disabled</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <div className='text-red-500'>{errors.status?.message}</div>
                    </div>
                    <div className='w-full'>
                        <span>Username*</span>
                        <input
                            type="text"
                            className={cn('mt-1 border border-[#e8eaef] px-2 py-3 w-full rounded-lg text-[12px] outline-0 focus:outline-1', errors.username && 'border border-red-500')}
                            {...register('username')}
                        />
                        <div className='text-red-500'>{errors.username?.message}</div>
                    </div>
                    <div className='w-full'>
                        <span>Password*</span>
                        <input
                            type="text"
                            className={cn('mt-1 border border-[#e8eaef] px-2 py-3 w-full rounded-lg text-[12px] outline-0 focus:outline-1', errors.password && 'border border-red-500')}
                            {...register('password')}
                        />
                        <div className='text-red-500'>{errors.password?.message}</div>
                    </div>
                    <div className='w-full'>
                        <span>Confirm Password*</span>
                        <input
                            type="text"
                            className={cn('mt-1 border border-[#e8eaef] px-2 py-3 w-full rounded-lg text-[12px] outline-0 focus:outline-1', errors.confirmPassword && 'border border-red-500')}
                            {...register('confirmPassword')}
                        />
                        <div className='text-red-500'>{errors.confirmPassword?.message}</div>
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

export default AddSystemUserPage