import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Leaf, Shield, Users, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-herbs.jpg";
import { useEffect, useState } from "react";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

const transition = { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const };
const stagger = { staggerChildren: 0.08 };

const steps = [
  { num: "01", title: "Παραγωγός", desc: "Μικροί Έλληνες παραγωγοί καλλιεργούν με παραδοσιακές μεθόδους." },
  { num: "02", title: "AgroLab", desc: "Επαληθεύουμε, τεκμηριώνουμε και συσκευάζουμε με σεβασμό." },
  { num: "03", title: "Εσύ", desc: "Λαμβάνεις ένα προϊόν με ιστορία, επιστήμη και τελετουργία." },
];

const esgItems = [
  { icon: Leaf, title: "Περιβαλλοντικό", desc: "Οικολογική συσκευασία, τοπική προμήθεια, ελάχιστο αποτύπωμα μεταφοράς." },
  { icon: Users, title: "Κοινωνικό", desc: "Δίκαιη τιμολόγηση για μικρούς παραγωγούς, διατήρηση παραδοσιακής γνώσης." },
  { icon: Shield, title: "Διακυβέρνηση", desc: "Πλήρης διαφάνεια — κάθε προϊόν δείχνει προέλευση, συστατικά και πηγές." },
];

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storefrontApiRequest(STOREFRONT_QUERY, { first: 4 })
      .then((data) => {
        setProducts(data?.data?.products?.edges || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Ελληνικά βότανα" className="w-full h-full object-cover image-treatment" />
          <div className="absolute inset-0 bg-accent/50" />
        </div>
        <div className="relative container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="max-w-2xl"
          >
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-secondary leading-[1.1] mb-6">
              Από τη γη,<br />με επιστήμη.
            </h1>
            <p className="text-secondary/80 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              Rooted in Greece. Backed by Science.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary/90 transition-colors duration-200 rounded-sm"
            >
              Ανακαλύψτε τη Συλλογή
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What is AgroLab */}
      <section className="py-[12vh]">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition}
          >
            <h2 className="font-display text-3xl md:text-4xl mb-6">Τι είναι το AgroLab</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Το AgroLab είναι μια υπερτοπική ελληνική αγορά ευεξίας που γεφυρώνει
              τους μικρούς τοπικούς παραγωγούς με τον σύγχρονο αστικό καταναλωτή.
              Κάθε προϊόν συνοδεύεται από τρία επίπεδα: την ιστορία του παραγωγού,
              την επιστημονική τεκμηρίωση και μια πρόταση συνειδητής χρήσης.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-[12vh] bg-secondary/30">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-display text-3xl md:text-4xl">Επιλεγμένα Προϊόντα</h2>
            <Link to="/shop" className="text-sm text-primary hover:underline underline-offset-4 hidden md:block">
              Δείτε όλα →
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-[4/5] bg-secondary animate-pulse rounded-sm" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Δεν βρέθηκαν προϊόντα ακόμα.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Προσθέστε προϊόντα μέσω του chat για να εμφανιστούν εδώ.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="py-[12vh]">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-12 text-center">Πώς Λειτουργεί</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: i * 0.1 }}
                className="text-center md:text-left"
              >
                <span className="font-body text-4xl font-light text-primary/30 tabular-nums">{step.num}</span>
                <h3 className="font-display text-xl mt-2 mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG Section */}
      <section className="py-[12vh] bg-accent text-accent-foreground">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-12 text-center">
            Δέσμευση ESG
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {esgItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: i * 0.1 }}
              >
                <item.icon className="w-6 h-6 mb-4 stroke-[1px]" />
                <h3 className="font-display text-lg mb-3">{item.title}</h3>
                <p className="text-accent-foreground/70 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section className="py-[12vh]">
        <div className="container mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-12">Τι Λένε οι Πελάτες μας</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-secondary/30 p-8 rounded-sm">
                <p className="text-muted-foreground italic leading-relaxed text-sm mb-4">
                  "Σύντομα θα εμφανιστούν εδώ αληθινές αξιολογήσεις πελατών."
                </p>
                <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">— Αναμονή</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-[12vh] bg-secondary/30">
        <div className="container mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl mb-4">Ενημερωθείτε</h2>
          <p className="text-muted-foreground mb-8 text-sm">
            Λάβετε νέα για νέους παραγωγούς, εποχιακά προϊόντα και επιστημονικά άρθρα.
          </p>
          <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Το email σας"
              className="flex-1 px-4 py-3 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-primary/90 transition-colors rounded-sm"
            >
              Εγγραφή
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
