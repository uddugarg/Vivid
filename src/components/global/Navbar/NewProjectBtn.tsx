"use client";

import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'


const NewProjectBtn = ({ user }: { user: User }) => {
    // TODO:Complete this component
    const router = useRouter();

    return (
        <Button
            className='rounded-lg font-semibold'
            disabled={!user.subscription}
            onClick={() => router.push("/create-page")}
        >
            <Plus />
            New Project
        </Button>
    )
}

export default NewProjectBtn