import { getRecentProjects } from '@/actions/project';
import { onAuthenticateUser } from '@/actions/user';
import TopNavbar from '@/components/global/Navbar';
import AppSidebar from '@/components/global/Sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
    const recentProjects = await getRecentProjects();
    const checkUser = await onAuthenticateUser();

    if (!checkUser.user) {
        redirect('/sign-in')
    }
    return (
        <SidebarProvider>
            <AppSidebar user={checkUser.user} recentProjects={recentProjects.data || []} />
            <SidebarInset>
                <TopNavbar user={checkUser.user} />
                <div className='p-4'>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Layout