import { Users, UserStar } from "lucide-react";

export const sideBarItems = [
    {
        id: 'admin',
        name: 'Admin',
        href: '/admin',
        icon: UserStar
    },
    {
        id: 'pim',
        name: 'PIM',
        href: '/pim',
        icon: Users
    }
]