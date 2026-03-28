import { Layout } from "@/components/Layout";
import { useParams, Link } from "react-router-dom";
import { producers } from "@/data/producers";
import { motion } from "framer-motion";
import { MapPin, Shield, ArrowLeft } from "lucide-react";

const transition = { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const };

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

  return (
    <Layout>
      <section className="py-[12vh]">
        <div className="container mx-auto">
          <Link
            to="/producers"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Όλοι οι Παραγωγοί
          </Link>

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
                <div className="flex flex-wrap gap-2">
                  {producer.products.map((product) => (
                    <span key={product} className="text-sm px-3 py-1.5 bg-secondary/50 border border-border rounded-sm">
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact note */}
              <div className="mt-8 p-4 bg-secondary/30 rounded-sm">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ενδιαφέρεστε για συνεργασία με αυτόν τον παραγωγό;{" "}
                  <Link to="/contact" className="text-primary hover:underline">
                    Επικοινωνήστε μαζί μας
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ProducerProfilePage;
