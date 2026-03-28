import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { producers } from "@/data/producers";
import { MapPin, Shield } from "lucide-react";

const transition = { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const };

const ProducersPage = () => {
  return (
    <Layout>
      <section className="py-[12vh]">
        <div className="container mx-auto">
          <h1 className="font-display text-4xl md:text-5xl mb-4">Οι Παραγωγοί μας</h1>
          <p className="text-muted-foreground mb-12 max-w-lg">
            Γνωρίστε τους ανθρώπους πίσω από τα προϊόντα μας. Κάθε ένας μοιράζεται
            τη δέσμευσή του για ποιότητα και αυθεντικότητα.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {producers.map((producer, i) => (
              <motion.div
                key={producer.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: i * 0.06 }}
              >
                <Link to={`/producers/${producer.slug}`} className="group block">
                  <div className="aspect-[3/4] overflow-hidden bg-secondary relative rounded-sm">
                    <img
                      src={producer.image}
                      alt={producer.name}
                      loading="lazy"
                      className="w-full h-full object-cover image-treatment group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="text-[10px] tracking-widest uppercase border border-secondary px-2 py-0.5 text-secondary bg-accent/50 backdrop-blur-sm">
                        {producer.region}
                      </span>
                    </div>
                    {producer.verified && (
                      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-primary/90 text-primary-foreground px-2 py-1 rounded-sm">
                        <Shield className="w-3 h-3" />
                        <span className="text-[9px] uppercase tracking-widest">Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 space-y-1">
                    <h3 className="font-display text-lg group-hover:text-primary transition-colors">{producer.name}</h3>
                    <p className="text-xs text-primary uppercase tracking-widest">{producer.products.join(", ")}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{producer.tagline}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProducersPage;
