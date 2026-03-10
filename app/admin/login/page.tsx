import type { Metadata } from 'next';
import AdminLoginClient from './AdminLoginClient';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <AdminLoginClient />
      </div>
    </section>
  );
}
