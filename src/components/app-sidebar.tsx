import { GalleryVerticalEnd, Lock } from "lucide-react";

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
    app: {
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
    navMain: [
        {
            title: "Passwords",
            url: "#",
            icon: Lock,
            isActive: true,
        },
        // {
        //     title: "Notes",
        //     url: "#",
        //     icon: Notebook,
        // },
    ],
    // projects: [
    //     {
    //         name: "Design Engineering",
    //         url: "#",
    //         icon: Frame,
    //     },
    //     {
    //         name: "Sales & Marketing",
    //         url: "#",
    //         icon: PieChart,
    //     },
    //     {
    //         name: "Travel",
    //         url: "#",
    //         icon: Map,
    //     },
    // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher app={data.app} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
