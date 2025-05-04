
import { requireSession } from '@/lib/requireSession';
import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic'

export default async function ProtectedPage() {
    const session = await requireSession();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Welcome, {session.user.email}!</h1>
        </div>
    );
}
