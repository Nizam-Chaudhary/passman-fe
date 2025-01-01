import {
    Frame,
    GalleryVerticalEnd,
    Lock,
    Map,
    Notebook,
    PieChart,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-swicher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "./ui/sidebar";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Passman",
            logo: GalleryVerticalEnd,
            plan: "Super",
        },
        // {
        // 	name: 'Acme Corp.',
        // 	logo: AudioWaveform,
        // 	plan: 'Startup',
        // },
        // {
        // 	name: 'Evil Corp.',
        // 	logo: Command,
        // 	plan: 'Free',
        // },
    ],
    navMain: [
        {
            title: "Vaults",
            url: "#",
            icon: Lock,
            isActive: false,
            items: [],
        },
        {
            title: "Notes",
            url: "#",
            icon: Notebook,
            // items: [
            // 	{
            // 		title: 'Genesis',
            // 		url: '#',
            // 	},
            // 	{
            // 		title: 'Explorer',
            // 		url: '#',
            // 	},
            // 	{
            // 		title: 'Quantum',
            // 		url: '#',
            // 	},
            // ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
