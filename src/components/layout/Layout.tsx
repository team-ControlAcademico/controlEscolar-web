import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen flex-col lg:pl-64">
        <Topbar onOpenSidebar={() => setSidebarOpen(true)} />
        <main id="main-content" className="flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10 xl:px-12">
          <div className="mx-auto w-full max-w-[1400px]">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
