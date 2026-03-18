import { Layout } from "@/components/Layout";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Το μήνυμά σας στάλθηκε!", {
      description: "Θα απαντήσουμε σύντομα.",
      position: "top-center",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      <section className="py-[12vh]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h1 className="font-display text-4xl md:text-5xl mb-4">Επικοινωνία</h1>
              <p className="text-muted-foreground mb-12 max-w-md">
                Έχετε ερωτήσεις; Θέλετε να μάθετε περισσότερα; Στείλτε μας μήνυμα.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 stroke-[1px]" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                    <p className="text-sm">info@theagrolab.gr</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 stroke-[1px]" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Τοποθεσία</p>
                    <p className="text-sm">Αθήνα, Ελλάδα</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Ονοματεπώνυμο</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Μήνυμα</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-primary/90 transition-colors rounded-sm"
                >
                  Αποστολή
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
