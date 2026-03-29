import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Leaf, Shield, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const transition = { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const };

const criteria = [
  { icon: Leaf, title: "Περιβαλλοντικά Κριτήρια", items: ["Βιολογική ή φυσική καλλιέργεια", "Ελάχιστη χρήση χημικών", "Οικολογική συσκευασία"] },
  { icon: Users, title: "Κοινωνικά Κριτήρια", items: ["Δίκαιες εργασιακές πρακτικές", "Τοπική κοινότητα", "Διατήρηση παράδοσης"] },
  { icon: Shield, title: "Κριτήρια Διακυβέρνησης", items: ["Διαφάνεια προέλευσης", "Ιχνηλασιμότητα", "Επιστημονική τεκμηρίωση"] },
];

const BecomeProducerPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", region: "", products: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Η αίτησή σας υποβλήθηκε!", {
      description: "Θα επικοινωνήσουμε μαζί σας σύντομα.",
      position: "top-center",
    });
    setFormData({ name: "", email: "", region: "", products: "", message: "" });
  };

  return (
    <Layout breadcrumbTrail={[{ label: "Γίνε Παραγωγός" }]}>
      <section className="py-[12vh]">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl mb-4">Γίνε Παραγωγός</h1>
            <p className="text-muted-foreground leading-relaxed mb-12">
              Αν είστε μικρός Έλληνας παραγωγός με πάθος για ποιότητα και σεβασμό στη
              φύση, θέλουμε να σας γνωρίσουμε. Δείτε τα κριτήρια συνεργασίας και
              υποβάλετε την αίτησή σας.
            </p>
          </div>

          {/* ESG Criteria */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {criteria.map((criterion, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: i * 0.1 }}
                className="bg-secondary/30 p-8 rounded-sm"
              >
                <criterion.icon className="w-6 h-6 mb-4 text-primary stroke-[1px]" />
                <h3 className="font-display text-lg mb-4">{criterion.title}</h3>
                <ul className="space-y-2">
                  {criterion.items.map((item, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Application Form */}
          <div className="max-w-xl">
            <h2 className="font-display text-2xl mb-8">Αίτηση Συνεργασίας</h2>
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
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Περιοχή</label>
                <input
                  type="text"
                  required
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Προϊόντα</label>
                <input
                  type="text"
                  required
                  value={formData.products}
                  onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Μήνυμα</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-primary/90 transition-colors rounded-sm"
              >
                Υποβολή Αίτησης
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BecomeProducerPage;
