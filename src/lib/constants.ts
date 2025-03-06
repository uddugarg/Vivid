import { HomeIcon, LayoutTemplateIcon, SettingsIcon, TrashIcon } from "lucide-react";

export const data = {
    user: {
        name: "Shadcn",
        email: "s@example.com",
        avatar: "/s.jpg"
    },

    navMain: [
        {
            title: "Home",
            url: '/dashboard',
            icon: HomeIcon,
        },
        {
            title: "Templates",
            url: '/templates',
            icon: LayoutTemplateIcon,
        },
        {
            title: 'Trash',
            url: '/trash',
            icon: TrashIcon
        },
        {
            title: 'Settings',
            url: '/settings',
            icon: SettingsIcon
        }
    ]
}