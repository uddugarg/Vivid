import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const CreatePageSkeleton = () => {
    return (
        <div className='space-y-8'>
            <div className='text-center space-y-2'>
                <Skeleton className='h-10 w-3/4 mx-auto' />
                <Skeleton className='h-4 w-1/2 mx-auto' />
            </div>

            <div className='grid gap-6 md:grid-cols-3'>
                {[0, 1, 2].map((i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className='h-6 w-3/4' />
                            <Skeleton className='h-4 w-full' />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className='h-10 w-full' />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className='space-y-4'>
                <Skeleton className='h-8 w-1/4' />
                <div className='space-y-2'>
                    {[0, 1, 2].map((i) => (
                        <Card key={i} className='p-4'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <Skeleton className='h-5 w-32 mb-1' />
                                    <Skeleton className='h-4 w-24' />
                                </div>
                                <div className="flex item-center gap-2">
                                    <Skeleton className='h-4 w-16' />
                                    <Skeleton className='h-8 w-16' />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CreatePageSkeleton