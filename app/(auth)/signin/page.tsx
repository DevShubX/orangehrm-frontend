'use client';
import { useAuth } from '@/components/custom/Contexts/AuthContext';
import api from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BsKey } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa6';
import z from 'zod';


const signinFormSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

type SigninFormData = z.infer<typeof signinFormSchema>;

const SigninPage = () => {
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SigninFormData>({
        resolver: zodResolver(signinFormSchema),
        defaultValues: {
            username: '',
            password: '',
        }
    })


    const handleSignin = async (data: SigninFormData) => {

        try {
            const response = await api.post('/auth/signin', data);
            login(response.data.token);
            console.log("Login Successfull", response.data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('Error', error.message);
            } else {
                console.log('Unknown error', error);
            }
        }
    }

    return (
        <div className='bg-[#FFA500] h-full'>
            <div className='max-md:w-full relative flex items-center bg-[url(/assests/blob.svg)] w-[80%] h-full bg-no-repeat min-h-[100vh] justify-center'>
                <div className='lg:w-[55%] flex justify-center'>
                    <div className='py-4 w-[inherit]'>
                        <div className='rounded-2xl py-4 bg-[#fff] shadow-[0px_16px_35px_0_rgba(0,0,0,0.08)] mb-5 flex items-center justify-center'>
                            <img src="assests/ohrm_branding.png" alt="ohrm_branding" className='w-full max-h-[65px] max-w-[275px] object-cover' />
                        </div>
                        <div className='text-[#64728c] gap-y-5 flex flex-col'>
                            <h1 className='w-full text-center font-bold text-[22px]'>
                                Login
                            </h1>
                            <div className='px-5 py-5 bg-[#e8eaef] rounded-2xl'>
                                <div>Username: Admin</div>
                                <div>Password: admin123</div>
                            </div>
                            <form onSubmit={handleSubmit(handleSignin)} className='flex flex-col gap-y-5'>
                                {/* Username */}
                                <div>
                                    <div className='flex gap-x-1 mb-1 text-[12px]'>
                                        <FaRegUser className='mt-[1px]' /> <span>Username</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder='Username'
                                        className='border border-[#e8eaef] px-2 py-3 w-full rounded-lg text-[12px] outline-0 focus:outline-1'
                                        {...register('username')}
                                    />
                                    {errors.username && (
                                        <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                                    )}
                                </div>
                                {/* Password */}
                                <div>
                                    <div className='flex gap-x-1 mb-1 text-[12px]'>
                                        <BsKey className='mt-[1px]' /> <span>Password</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder='Password'
                                        className='border border-[#e8eaef] px-2 py-3 w-full rounded-lg text-[12px] outline-0 focus:outline-1'
                                        {...register('password')}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                                    )}
                                </div>
                                {/* Login Button */}
                                <button
                                    type='submit'
                                    disabled={isSubmitting}
                                    className='hover:bg-[#ffa600d2] bg-[#FFA500] py-2 rounded-3xl text-[14px] text-white cursor-pointer'>
                                    {isSubmitting ? "Logging in..." : "Login"}
                                </button>
                            </form>
                            <div className='text-[#FFA500] text-[14px] text-center'>
                                Forgot your password?
                            </div>
                            <div className='text-[14px] text-center'>
                                <div>OrangeHRM OS 5.7</div>
                                <div>© 2005 - 2025 OrangeHRM, Inc. All rights reserved</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='max-md:hidden absolute right-[-100px] bg-[#f6f5fb] rounded-[100%]'>
                    <img src="assests/ohrm_logo.png" alt="ohrm_logo" className='w-[200px] top-0 left-0' />
                </div>
            </div>
        </div>
    )
}

export default SigninPage