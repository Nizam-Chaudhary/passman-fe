"use client";

import { type LucideIcon } from "lucide-react";
import { useState } from "react";

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
}) {
    const [activeItem, setActiveItem] = useState<string | null>(
        items.find((item) => item.isActive)?.title || null
    );

    const handleClick = (title: string) => {
        setActiveItem(title);
    };

    return (
        <SidebarGroup>
            {/* <SidebarGroupLabel>Passman</SidebarGroupLabel> */}
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            tooltip={item.title}
                            className={
                                activeItem === item.title ? "bg-accent" : ""
                            }
                            onClick={() => handleClick(item.title)}
                        >
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
