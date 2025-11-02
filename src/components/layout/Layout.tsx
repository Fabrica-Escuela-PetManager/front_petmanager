import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  userInitial?: string;
}

export function Layout({ children, userInitial }: LayoutProps) {
  return (
    <div className="min-h-screen bg-petmanager-primary-light">
      <Header userInitial={userInitial} />
      <main className="container max-w-4xl mx-auto p-4">
        {children}
      </main>
    </div>
  );
}