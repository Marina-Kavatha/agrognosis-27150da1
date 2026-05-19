import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const STORAGE_KEY = "agrolab-newsletter-dismissed";

export const NewsletterPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dismiss();
    toast.success("Ευχαριστούμε για την εγγραφή!", {
      description: "Θα λάβετε σύντομα τον κωδικό έκπτωσης 10%.",
      position: "top-center",
    });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/40"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-background border border-border rounded-sm p-8 md:p-10"
          >
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-4">Agrognosis</p>
              <h3 className="font-display text-2xl md:text-3xl mb-3">
                Μείνε συνδεδεμένος με τη φύση
              </h3>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                Εγγράψου και κέρδισε 10% έκπτωση στην πρώτη σου παραγγελία
              </p>

              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="email"
                  required
                  placeholder="Το email σας"
                  className="flex-1 px-4 py-3 bg-secondary/50 border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-primary/90 transition-colors rounded-sm whitespace-nowrap"
                >
                  Εγγραφή
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
