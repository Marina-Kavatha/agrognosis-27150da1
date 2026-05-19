import { useState } from "react";
import { X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "forgot") {
      toast.success("Email αποστολής", {
        description: "Αν υπάρχει λογαριασμός, θα λάβετε email επαναφοράς.",
        position: "top-center",
      });
    } else if (mode === "register") {
      toast.success("Εγγραφή επιτυχής!", {
        description: "Καλωσορίσατε στο Agrognosis.",
        position: "top-center",
      });
    } else {
      toast.success("Σύνδεση επιτυχής!", {
        description: `Καλωσορίσατε πίσω.`,
        position: "top-center",
      });
    }
    setForm({ name: "", email: "", password: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/40"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-background border border-border rounded-sm p-8"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-6">
              <User className="w-5 h-5 text-primary" />
            </div>

            <h3 className="font-display text-2xl text-center mb-6">
              {mode === "login" && "Σύνδεση"}
              {mode === "register" && "Εγγραφή"}
              {mode === "forgot" && "Επαναφορά Κωδικού"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Ονοματεπώνυμο</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              )}
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              {mode !== "forgot" && (
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Κωδικός</label>
                  <input
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-primary/90 transition-colors rounded-sm"
              >
                {mode === "login" && "Σύνδεση"}
                {mode === "register" && "Δημιουργία Λογαριασμού"}
                {mode === "forgot" && "Αποστολή Email"}
              </button>
            </form>

            <div className="mt-6 text-center space-y-2">
              {mode === "login" && (
                <>
                  <button onClick={() => setMode("forgot")} className="text-xs text-primary hover:underline block mx-auto">
                    Ξεχάσατε τον κωδικό σας;
                  </button>
                  <p className="text-xs text-muted-foreground">
                    Δεν έχετε λογαριασμό;{" "}
                    <button onClick={() => setMode("register")} className="text-primary hover:underline">
                      Εγγραφή
                    </button>
                  </p>
                </>
              )}
              {mode === "register" && (
                <p className="text-xs text-muted-foreground">
                  Έχετε ήδη λογαριασμό;{" "}
                  <button onClick={() => setMode("login")} className="text-primary hover:underline">
                    Σύνδεση
                  </button>
                </p>
              )}
              {mode === "forgot" && (
                <button onClick={() => setMode("login")} className="text-xs text-primary hover:underline">
                  Επιστροφή στη σύνδεση
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
