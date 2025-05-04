// app/(protected)/layout.tsx
import { requireSession } from '../../../lib/requireSession';

export default async function ProtectedLayout({ children }) {
  await requireSession(); // will redirect if not authenticated
  return <>{children}</>;
}
