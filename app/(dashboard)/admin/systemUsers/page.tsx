'use client';
import React, { useEffect, useState } from 'react'
import SystemUserSearchForm, { SysteUserSearchForm } from './_components/SystemUserSearchForm';
import SystemUserList from './_components/SystemUserList';
import { User } from '@/models/user.model';
import api from '@/lib/api';

const SystemUsersPage = () => {
    const [usersList, setUserList] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async (filters?: SysteUserSearchForm) => {
        try {
            setIsLoading(true);
            const response = await api.get('/users/getUsers', {
                params: filters,
            });
            setUserList(response.data.users || []);
            setIsLoading(false);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('Error', error.message);
            } else {
                console.log('Unknown error', error);
            }
        }
    }

    const handleSearch = async (data: SysteUserSearchForm) => {
        await getUsers(data);
    }

    return (
        <div className='flex flex-col gap-y-5'>
            <SystemUserSearchForm handleSearch={handleSearch} />
            <SystemUserList usersList={usersList} isLoading={isLoading} />
        </div>
    )
}

export default SystemUsersPage