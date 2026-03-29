import { Layout } from "@/components/Layout";
import { useParams, Link } from "react-router-dom";
import { producers } from "@/data/producers";
import { motion } from "framer-motion";
import { MapPin, Shield, ArrowRight } from "lucide-react";

const transition = { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const };

// Map product names to shop handles
const productHandles: Record<string, string> = {
  "Τσάι Βουνού Ολύμπου": "τσάι-βουνού-ολύμπου",
  "Μέντα Πελίου": "μέντα-πελίου",
  "Χαμομήλι Κρήτης": "χαμομήλι-κρήτης",
  "Θυμαρίσιο Μέλι Υμηττού": "θυμαρίσιο-μέλι-υμηττού",
  "Ανθόμελο Μακεδονίας": "ανθόμελο-μακεδονίας",
  "Πευκόμελο Χαλκιδικής": "πευκόμελο-χαλκιδικής",
  "Εξαιρετικό Παρθένο Ελαιόλαδο Καλαμάτας": "εξαιρετικό-παρθένο-ελαιόλαδο-καλαμάτας",
  "Βιολογικό Ελαιόλαδο Λέσβου": "βιολογικό-ελαιόλαδο-λέσβου",
};

const ProducerProfilePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const producer = producers.find((p) => p.slug === slug);

  if (!producer) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-muted-foreground">Ο παραγωγός δεν βρέθηκε.</p>
        </div>
      </Layout>
    );
  }

  const breadcrumbTrail = [
    { label: "Παραγωγοί", to: "/producers" },
    { label: producer.name },
  ];

  return (
    <Layout breadcrumbTrail={breadcrumbTrail}>
      <section className="py-[12vh]">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
          >
            {/* Photo */}
            <div className="aspect-[3/4] overflow-hidden bg-secondary rounded-sm relative">
              <img
                src={producer.image}
                alt={producer.name}
                className="w-full h-full object-cover image-treatment"
              />
              {producer.verified && (
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-sm">
                  <Shield className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase tracking-widest">AgroLab Verified</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <h1 className="font-display text-3xl md:text-4xl mb-2">{producer.name}</h1>
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">{producer.region}</span>
              </div>

              <p className="text-primary text-sm mb-8 italic">{producer.tagline}</p>

              <div className="space-y-4 mb-10">
                {producer.story.map((p, i) => (
                  <p key={i} className={`text-sm leading-relaxed ${i === 0 ? "font-display text-lg" : "text-muted-foreground"}`}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Products */}
              <div className="border-t border-border pt-8">
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Τα Προϊόντα του</h3>
                <div className="flex flex-col gap-2">
                  {producer.products.map((product) => {
                    const handle = productHandles[product];
                    return handle ? (
                      <Link
                        key={product}
                        to={`/product/${handle}`}
                        className="group flex items-center justify-between text-sm px-3 py-2.5 bg-secondary/50 border border-border rounded-sm hover:border-primary/40 hover:text-primary transition-all duration-200"
                      >
                        <span className="group-hover:underline underline-offset-2">{product}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    ) : (
                      <span key={product} className="text-sm px-3 py-2.5 bg-secondary/50 border border-border rounded-sm">
                        {product}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ProducerProfilePage;
