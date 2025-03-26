'use client';

import { getProjectById } from '@/actions/project';
import { themes } from '@/lib/constants';
import { useSlideStore } from '@/store/useSlideStore';
import { Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { redirect, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Navbar from './select-theme/_components/Navbar/Navbar';

type Props = {}

const Page = (props: Props) => {
    // TODO: Create Presentation Page
    const params = useParams();
    const { setTheme } = useTheme()

    const [loading, setLoading] = useState(true)

    const { setSlides, setProject, currentTheme, setCurrentTheme } = useSlideStore()

    useEffect(() => {
        (async () => {
            try {
                const res = await getProjectById(params.presentationId as string)

                if (res.status !== 200 || !res.data) {
                    toast.error("Error", {
                        description: "Unable to fetch the project!"
                    })
                    redirect('/dashboard');
                }

                const findTheme = themes.find((theme) => theme.name === res.data.themeName)

                setCurrentTheme(findTheme || themes[0])
                setTheme(findTheme?.type === "dark" ? "dark" : "light")
                setProject(res.data)
                setSlides(JSON.parse(JSON.stringify(res.data.slides)));
            } catch (error) {
                console.log(error);
                toast.error("Error", {
                    description: "An unexpected error occured"
                })
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader2 className='w-8 h-8 animate-spin text-primary' />
            </div>
        )
    }


    return <DndProvider
        backend={HTML5Backend}
    >
        <div className='min-h-screen flex flex-col'>
            <Navbar presentationId={params.presentationId as string} />
        </div>
    </DndProvider>
}

export default Page