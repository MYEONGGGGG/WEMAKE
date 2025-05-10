import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarProvider
} from "~/common/components";
import { Outlet } from "react-router";
import { MessageRoomCard } from "~/features/users/components/message-room-card";

export default function MessagesLayout() {
    return (
        <SidebarProvider className="max-h-[calc(100vh-14rem)] overflow-hidden h-[calc(100vh-14rem)] min-h-full">
            <Sidebar className="pt-16" variant="floating">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            {Array.from({ length: 20 }).map((_, index) => (
                                <MessageRoomCard
                                    key={index}
                                    id={index.toString()}
                                    name={`User ${index}`}
                                    lastMessage={`Last message ${index}`}
                                    avatarUrl={`https://github.com/shadcn.png`}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <div className="w-full h-full">
                <Outlet />
            </div>
        </SidebarProvider>
    );
}