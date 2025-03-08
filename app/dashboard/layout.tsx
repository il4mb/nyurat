import { getUser } from "@/internal/lib/dal";
import Sidebar from "./ui/Sidebar";
import AppProvider from "./ui/AppProvider";

interface layoutProps {
    children: React.ReactNode
};

export default async function Layout({ children }: layoutProps) {
    const session = await getUser();

    return (
        <AppProvider session={session}>
            <div className="AppWrapper">
                <Sidebar session={session} />
                <main className="MainContent">
                    {children}
                </main>
            </div>
        </AppProvider>
    );
};

