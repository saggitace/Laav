import { ReactNode } from 'react';
import { SchoolNavigation } from './SchoolNavigation';
import { AdminSidebar } from './AdminSidebar';

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <SchoolNavigation />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
