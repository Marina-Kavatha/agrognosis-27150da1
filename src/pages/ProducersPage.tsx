import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import producer1 from "@/assets/producer-1.jpg";
import producer2 from "@/assets/producer-2.jpg";
import producer3 from "@/assets/producer-3.jpg";

const transition = { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const };

const producers = [
  {
    name: "Γιώργος Παπαδόπουλος",
    region: "Μεσσηνία",
    image: producer1,
    products: "Ελαιόλαδο, Ελιές",
    story: "Τρεις γενιές ελαιοπαραγωγών στις πλαγιές του Ταϋγέτου.",
  },
  {
    name: "Μαρία Κωνσταντίνου",
    region: "Κρήτη",
    image: producer2,
    products: "Μέλι, Κερί",
    story: "Μελισσοκόμος με πάθος για τα αγριολούλουδα της Κρήτης.",
  },
  {
    name: "Νίκος Αντωνίου",
    region: "Πελοπόννησος",
    image: producer3,
    products: "Βότανα, Αρωματικά",
    story: "Νέος αγρότης που επέστρεψε στη γη των παππούδων του.",
  },
];

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {producers.map((producer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: i * 0.08 }}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden bg-secondary relative rounded-sm">
                  <img
                    src={producer.image}
                    alt={producer.name}
                    className="w-full h-full object-cover image-treatment group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase border border-secondary px-2 py-0.5 text-secondary bg-accent/50 backdrop-blur-sm">
                    {producer.region}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-display text-lg">{producer.name}</h3>
                  <p className="text-xs text-primary uppercase tracking-widest">{producer.products}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{producer.story}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Decorative map */}
          <div className="mt-20 bg-secondary/30 rounded-sm p-12 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Χάρτης Παραγωγών</p>
            <div className="aspect-[16/9] max-w-3xl mx-auto bg-secondary rounded-sm flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Διαδραστικός χάρτης — σύντομα διαθέσιμος</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProducersPage;
