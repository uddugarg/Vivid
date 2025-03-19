import { Button } from '@/components/ui/button';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react'

const NavFooter = ({ prismaUser }: { prismaUser: User }) => {
    const router = useRouter();

    const { isLoaded, isSignedIn, user } = useUser();
    const [loading, setLoading] = React.useState(false);

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className='flex flex-col gap-y-6 items-start group-data-[collapsible=icon]:hidden'>
                    {!prismaUser.subscription && (
                        <div className="flex flex-col items-start p-2 pb-3 gap-4 bg-background-80 rounded-xl">
                            <div className="flex flex-col items-start gap-1">
                                <p className="text-base font-bold">
                                    Get <span className="text-vivid">Creative AI</span>
                                </p>
                                <span className="text-sm dark:text-secondary">
                                    Unlock all features including AI and more
                                </span>
                            </div>

                            <div className="w-full bg-vivid-gradient p-[1px] rounded-full">
                                <Button
                                    className='w-full border-vivid bg-background-80 hover:bg-background-90 text-primary rounded-full font-bold'
                                    variant={'default'}
                                    size={'lg'}
                                >
                                    {loading ? 'Upgrading...' : 'Upgrade'}
                                </Button>
                            </div>
                        </div>
                    )}

                    <SignedIn>
                        <SidebarMenuButton size={'lg'}
                            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                            <UserButton />
                            <div className='grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden'>
                                <span className="truncate font-semibold">{user?.fullName}</span>
                                <span className="truncate text-secondary">{user?.emailAddresses[0]?.emailAddress}</span>
                            </div>
                        </SidebarMenuButton>
                    </SignedIn>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default NavFooter