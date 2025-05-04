import { requireSession } from "@/lib/requireSession";

export default async function ProtectedLayout({ children }) {
    await requireSession();
    return <>{children}</>;
}
