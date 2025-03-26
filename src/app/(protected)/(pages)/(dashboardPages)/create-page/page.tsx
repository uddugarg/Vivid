import React, { Suspense } from 'react'
import CreatePageSkeleton from './_components/CreatePage/CreatePageSkeleton'
import Renderpage from './_components/Renderpage'
import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'

const Page = async () => {
    const checkUser = await onAuthenticateUser();

    if (!checkUser.user) {
        redirect("/sign-in");
    }

    if (!checkUser.user.subscription) {
        redirect("/dashboard");
    }

    return (
        <main className='w-full h-full pt-6'>
            <Suspense fallback={<CreatePageSkeleton />}>
                <Renderpage />
            </Suspense>
        </main>
    )
}

export default Page