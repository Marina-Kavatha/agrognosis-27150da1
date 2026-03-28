import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground py-[12vh]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl mb-4">The AgroLab</h3>
            <p className="text-accent-foreground/70 leading-relaxed max-w-md text-sm">
              Από τη γη, με επιστήμη. Συνδέουμε μικρούς Έλληνες παραγωγούς με
              σύγχρονους καταναλωτές που αναζητούν αυθεντικά, επιστημονικά
              τεκμηριωμένα προϊόντα ευεξίας.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4 text-accent-foreground/50">Πλοήγηση</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/shop" className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">Κατάστημα</Link>
              <Link to="/producers" className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">Παραγωγοί</Link>
              <Link to="/about" className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">Σχετικά</Link>
              <Link to="/become-producer" className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">Γίνε Παραγωγός</Link>
            </nav>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4 text-accent-foreground/50">Επικοινωνία</h4>
            <div className="flex flex-col gap-2 text-sm text-accent-foreground/70">
              <a href="mailto:theagrolab@gmail.com" className="hover:text-accent-foreground transition-colors">theagrolab@gmail.com</a>
              <span>Αθήνα, Ελλάδα</span>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-accent-foreground/10">
          <p className="text-xs text-accent-foreground/40">
            © {new Date().getFullYear()} The AgroLab. Με επιφύλαξη παντός δικαιώματος.
          </p>
        </div>
      </div>
    </footer>
  );
};
