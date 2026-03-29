import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const routeLabels: Record<string, string> = {
  "": "Αρχική",
  shop: "Κατάστημα",
  product: "Προϊόν",
  producers: "Παραγωγοί",
  about: "Σχετικά",
  "become-producer": "Γίνε Παραγωγός",
  contact: "Επικοινωνία",
  "wellness-guide": "Wellness Guide",
};

interface BreadcrumbsProps {
  customTrail?: Array<{ label: string; to?: string }>;
}

export const Breadcrumbs = ({ customTrail }: BreadcrumbsProps) => {
  const location = useLocation();

  if (location.pathname === "/") return null;

  const trail = customTrail || (() => {
    const segments = location.pathname.split("/").filter(Boolean);
    return segments.map((seg, i) => ({
      label: routeLabels[seg] || decodeURIComponent(seg),
      to: i < segments.length - 1 ? "/" + segments.slice(0, i + 1).join("/") : undefined,
    }));
  })();

  return (
    <nav aria-label="breadcrumb" className="container mx-auto pt-4 pb-2">
      <ol className="flex items-center gap-1.5 text-[13px] flex-wrap">
        <li>
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Αρχική
          </Link>
        </li>
        {trail.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
            {item.to ? (
              <Link to={item.to} className="text-muted-foreground hover:text-foreground transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-muted-foreground/70">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
