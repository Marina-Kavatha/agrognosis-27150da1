import { Header } from "./Header";
import { Footer } from "./Footer";
import { Breadcrumbs } from "./Breadcrumbs";

interface LayoutProps {
  children: React.ReactNode;
  breadcrumbTrail?: Array<{ label: string; to?: string }>;
}

export const Layout = ({ children, breadcrumbTrail }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        <Breadcrumbs customTrail={breadcrumbTrail} />
        {children}
      </main>
      <Footer />
    </div>
  );
};
