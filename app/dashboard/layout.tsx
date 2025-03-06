import { getUser } from "@/internal/lib/dal";
import Header from "./ui/Header";

interface layoutProps {
    children: React.ReactNode
};

const layout = async ({ children }: layoutProps) => {
    const session = await getUser();

    return (
        <>
            <div className="AppWrapper">
                <Header session={session} />
                <main className="MainContent">
                    {children}
                </main>
            </div>
        </>
    );
};

export default layout