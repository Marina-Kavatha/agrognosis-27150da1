import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import aboutImage from "@/assets/about-landscape.jpg";

const transition = { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const };

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-end">
        <img src={aboutImage} alt="Ελληνική ύπαιθρος" className="absolute inset-0 w-full h-full object-cover image-treatment" />
        <div className="absolute inset-0 bg-accent/40" />
        <div className="relative container mx-auto pb-12">
          <h1 className="font-display text-4xl md:text-5xl text-secondary">Σχετικά με εμάς</h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-[12vh]">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={transition}>
            <h2 className="font-display text-3xl mb-6">Η Αποστολή μας</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Το AgroLab γεννήθηκε από την πεποίθηση ότι η ελληνική γη κρύβει θησαυρούς
              που αξίζουν να φτάσουν στα χέρια κάθε συνειδητού καταναλωτή. Δεν είμαστε απλά
              ένα κατάστημα — είμαστε γέφυρα μεταξύ παράδοσης και επιστήμης, μεταξύ χωραφιού
              και πόλης.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Κάθε προϊόν που φιλοξενούμε περνάει από αυστηρή αξιολόγηση: γνωρίζουμε τον
              παραγωγό, επισκεπτόμαστε τον τόπο, τεκμηριώνουμε τις ιδιότητες και προτείνουμε
              τον καλύτερο τρόπο χρήσης.
            </p>
          </motion.div>
        </div>
      </section>

      {/* B2B2C Model */}
      <section className="py-[12vh] bg-secondary/30">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={transition}>
            <h2 className="font-display text-3xl mb-6">Το Μοντέλο AgroLab</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Λειτουργούμε ως B2B2C πλατφόρμα: συνεργαζόμαστε απευθείας με μικρούς
              παραγωγούς (B2B) και φέρνουμε τα προϊόντα τους στον τελικό καταναλωτή (B2C)
              με πλήρη διαφάνεια.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <span className="font-body text-3xl font-light text-primary/40 tabular-nums">01</span>
                <p className="text-sm mt-2">Εντοπίζουμε αυθεντικούς παραγωγούς</p>
              </div>
              <div className="text-center">
                <span className="font-body text-3xl font-light text-primary/40 tabular-nums">02</span>
                <p className="text-sm mt-2">Τεκμηριώνουμε επιστημονικά</p>
              </div>
              <div className="text-center">
                <span className="font-body text-3xl font-light text-primary/40 tabular-nums">03</span>
                <p className="text-sm mt-2">Παραδίδουμε με σεβασμό</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="py-[12vh]">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl mb-12 text-center">Η Ομάδα μας</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="aspect-square bg-secondary rounded-sm mb-4" />
                <p className="text-sm text-muted-foreground">Σύντομα</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
