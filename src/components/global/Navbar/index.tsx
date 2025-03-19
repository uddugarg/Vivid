import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { User } from '@prisma/client'
import React from 'react'
import SearchBar from './SearchBar'
import ThemeSwitcher from '../Toggle'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import NewProjectBtn from './NewProjectBtn'

type Props = {
    user: User
    // children: React.ReactNode
}

const TopNavbar = ({
    user,
}: Props) => {
    return (
        <header className='sticky top-0 z-[10] flex shrink-0 flex-wrap items-center gap-2 bg-background p-4 justify-between'>
            <SidebarTrigger className='ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />

            <div className="w-full max-w-[95%] flex items-center justify-between gap-4 flex-wrap">
                <SearchBar />
                <ThemeSwitcher />
                <div className='flex flex-wrap gap-4 items-center justify-end'>
                    <Button className='bg-primary-80 rounded-lg hover:bg-background-80 text-primary font-semibold cursor-not-allowed'>
                        <Upload />
                        Import
                    </Button>
                    <NewProjectBtn user={user} />
                </div>
            </div>

        </header>
    )
}

export default TopNavbar