"use client";

import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Clock } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

const NavMain = ({ items }: {
  items: {
    title: string
    url: string
    icon: React.FC<React.SVGProps<SVGSVGElement>>
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) => {

  const pathname = usePathname();

  return (
    <SidebarGroup className='p-0'>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip={"TEST"} className={`${pathname.includes("TEST") && "bg-background-80"}`}>
            <Link href={"TEST"}
              className={`text-lg ${pathname.includes("TEST") && "font-bold"}`}>
              <Clock className='text-lg' />
              <span>Test Sidebar Item</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavMain