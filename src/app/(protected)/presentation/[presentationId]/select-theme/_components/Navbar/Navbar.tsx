"use client";
import { Button } from '@/components/ui/button';
import { useSlideStore } from '@/store/useSlideStore';
import { Home, Share } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { toast } from 'sonner';

type Props = {
    presentationId: string
}

const Navbar = ({ presentationId }: Props) => {
    const { currentTheme } = useSlideStore();

    const [isPresentationMode, setIsPresentationMode] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`${window.location.origin}/share/${presentationId}`);

        toast.success("Success", {
            description: "Link copied to clipboard!"
        });
    }

    return (
        <nav className='fixed top-0 right-0 left-0 z-50 w-full h-20 flex justify-between items-center py-4 px-7 border-b'
            style={{
                backgroundColor: currentTheme.navbarColor || currentTheme.backgroundColor,
                color: currentTheme.accentColor
            }}
        >
            <Link href={"/dashboard"} passHref>
                <Button variant={'outline'} className='flex items-center gap-2'
                    style={{
                        backgroundColor: currentTheme.backgroundColor,
                    }}
                >
                    <Home className='w-4 h-4' />
                    <span className='hidden sm:inline'>Return Home</span>
                </Button>
            </Link>

            <Link
                href={"/presentation/templete-market"}
                className='text-lg font-semibold hidden sm:block'>
                Presentation Editor
            </Link>

            <div className='flex items-center gap-4'>
                <Button
                    style={{
                        backgroundColor: currentTheme.backgroundColor,
                    }}
                    variant={'outline'}
                    onClick={handleCopy}
                >
                    <Share className='w-4 h-4' />
                </Button>
            </div>
        </nav>
    )
}

export default Navbar