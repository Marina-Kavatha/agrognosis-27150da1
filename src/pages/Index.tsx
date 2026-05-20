import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Leaf, Shield, Users, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-herbs.jpg";
import { useEffect, useState } from "react";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { producers } from "@/data/producers";

const transition = { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const };

const steps = [
  { num: "01", title: "Παραγωγός", desc: "Μικροί Έλληνες παραγωγοί καλλιεργούν με παραδοσιακές μεθόδους." },
  { num: "02", title: "Agrognosis", desc: "Επαληθεύουμε, τεκμηριώνουμε και συσκευάζουμε με σεβασμό." },
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
      <NewsletterPopup />

      {/* Hero */}
      <section className="relative h-[400px] md:h-[600px] w-screen -mx-[calc((100vw-100%)/2)] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Ελληνικά βότανα" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-accent/60" />
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

      {/* What is Agrognosis */}
      <section className="py-[12vh]">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition}
          >
            <h2 className="font-display text-3xl md:text-4xl mb-6">Τι είναι το Agrognosis</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Το Agrognosis είναι μια υπερτοπική ελληνική αγορά ευεξίας που γεφυρώνει
              τους μικρούς τοπικούς παραγωγούς με τον σύγχρονο αστικό καταναλωτή.
              Κάθε προϊόν συνοδεύεται από τρία επίπεδα: την ιστορία του παραγωγού,
              την επιστημονική τεκμηρίωση και μια πρόταση συνειδητής χρήσης.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Producers community */}
      <section className="py-[12vh] bg-[hsl(35,30%,94%)]">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl mb-4">Οι Άνθρωποι Πίσω από τα Προϊόντα</h2>
            <p className="text-muted-foreground leading-relaxed">
              Γνωρίστε τους παραγωγούς που με μεράκι και αγάπη για τη γη φέρνουν στο σπίτι σας αυθεντικές γεύσεις της Ελλάδας.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {producers.slice(0, 3).map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: i * 0.1 }}
                className="text-center"
              >
                <Link to={`/producers/${p.slug}`} className="block group">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-display text-lg mb-1">{p.name}</h3>
                  <p className="text-xs uppercase tracking-widest text-primary/70 mb-4">{p.region}</p>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">«{p.tagline}»</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link
              to="/producers"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary/90 transition-colors duration-200 rounded-sm"
            >
              Γνώρισε όλους τους Παραγωγούς
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Story of the Week */}
      {(() => {
        const giorgis = producers.find((p) => p.slug === "giorgis-papadopoulos");
        if (!giorgis) return null;
        return (
          <section className="py-20 bg-[hsl(35,35%,90%)]">
            <div className="container mx-auto">
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-10 text-center">
                Η Ιστορία της Εβδομάδας
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={transition}
                className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-center max-w-5xl mx-auto"
              >
                <div className="w-[300px] h-[300px] overflow-hidden rounded-full mx-auto lg:mx-0 flex-shrink-0">
                  <img
                    src={giorgis.image}
                    alt={giorgis.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl mb-3 text-foreground">
                    Γιώργης Παπαδόπουλος — Ήπειρος
                  </h2>
                  <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-6">
                    Τσάι Βουνού από τις Κορυφές της Ηπείρου
                  </p>
                  <div className="font-display text-base md:text-lg leading-relaxed text-foreground/80 space-y-4">
                    <p>
                      Ο Γιώργης μεγάλωσε στους πρόποδες του Γράμμου, όπου από παιδί έμαθε να
                      διαβάζει τη φύση δίπλα στον παππού του. Κάθε καλοκαίρι, όταν τα βουνά
                      της Ηπείρου ανθίζουν, μαζεύει χειροκίνητα το τσάι του βουνού — όχι με
                      μηχανές, όχι με βιομηχανικές μεθόδους. Με χέρια που ξέρουν πότε το φυτό
                      είναι έτοιμο.
                    </p>
                    <p>Αυτή η γνώση δεν διδάσκεται σε σχολείο. Μεταφέρεται από γενιά σε γενιά.</p>
                    <p>
                      Στο Agrognosis πιστέψαμε στην ιστορία του από την πρώτη στιγμή. Γιατί
                      πίσω από κάθε φλιτζάνι τσάι κρύβεται μια ζωή αφιερωμένη στη γη.
                    </p>
                  </div>
                  <Link
                    to="/producers"
                    className="inline-flex items-center gap-2 mt-8 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary/90 transition-colors duration-200 rounded-sm"
                  >
                    Γνώρισε τον Γιώργη
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        );
      })()}


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
                <div key={i} className="aspect-square bg-secondary animate-pulse rounded-sm" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
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

      {/* Customer Reviews */}
      <section className="py-[12vh]">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-8">Τι Λένε οι Πελάτες μας</h2>
          <ReviewsCarousel />
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
