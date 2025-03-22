import React, { Suspense } from 'react'
import CreatePageSkeleton from './_components/CreatePage/CreatePageSkeleton'
import Renderpage from './_components/Renderpage'

const Page = () => {
    return (
        <main className='w-full h-full pt-6'>
            <Suspense fallback={<CreatePageSkeleton />}>
                <Renderpage />
            </Suspense>
        </main>
    )
}

export default Page