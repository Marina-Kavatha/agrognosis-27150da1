import { Layout } from "@/components/Layout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const transition = { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const };

interface SymptomData {
  id: string;
  label: string;
  emoji: string;
  article: string[];
  references: string[];
  products: Array<{ name: string; handle: string; tagline: string; price: string }>;
}

const symptoms: SymptomData[] = [
  {
    id: "sore-throat",
    label: "Πονόλαιμος",
    emoji: "🫁",
    article: [
      "Ο πονόλαιμος είναι ένα από τα πιο συχνά ενοχλήματα, ιδιαίτερα κατά τους χειμερινούς μήνες. Η φύση μας προσφέρει αρκετές φυτικές λύσεις που χρησιμοποιούνται εδώ και αιώνες στην ελληνική παράδοση.",
      "Το τσάι βουνού (Sideritis) περιέχει φλαβονοειδή και τερπένια με αντιφλεγμονώδεις ιδιότητες. Έρευνες δείχνουν ότι η κατανάλωσή του μπορεί να μειώσει τη φλεγμονή του λάρυγγα και να ανακουφίσει τον πόνο. Σε συνδυασμό με μέλι — ιδιαίτερα θυμαρίσιο — τα αντιμικροβιακά οφέλη ενισχύονται.",
      "Η μέντα αποτελεί επίσης εξαιρετική επιλογή, καθώς η μενθόλη που περιέχει δρα ως φυσικό αποσυμφορητικό και αναλγητικό. Ένα ζεστό αφέψημα μέντας με μέλι μπορεί να προσφέρει άμεση ανακούφιση."
    ],
    references: [
      "Gonzalez-Burgos et al., \"Sideritis spp.: Uses, chemical composition and pharmacological activities\", Journal of Ethnopharmacology, 2011",
      "Tadesse et al., \"Antimicrobial activities of honey against food-borne pathogens\", Journal of Applied Sciences, 2019"
    ],
    products: [
      { name: "Τσάι Βουνού Ολύμπου", handle: "τσάι-βουνού-ολύμπου", tagline: "Αντιφλεγμονώδες αφέψημα", price: "16.00" },
      { name: "Θυμαρίσιο Μέλι Υμηττού", handle: "θυμαρίσιο-μέλι-υμηττού", tagline: "Αντιμικροβιακό γλυκαντικό", price: "24.00" },
    ],
  },
  {
    id: "anxiety",
    label: "Άγχος",
    emoji: "🧠",
    article: [
      "Το άγχος επηρεάζει ολοένα και περισσότερους ανθρώπους στη σύγχρονη αστική ζωή. Η ελληνική φύση προσφέρει βότανα που χρησιμοποιούνται εδώ και χιλιετίες για την ηρεμία του νου.",
      "Το χαμομήλι (Matricaria chamomilla) έχει μελετηθεί εκτενώς για τις αγχολυτικές του ιδιότητες. Η απιγενίνη, μια φλαβόνη που βρίσκεται στο χαμομήλι, δεσμεύεται σε υποδοχείς GABA στον εγκέφαλο, δρώντας ως ήπιο φυσικό ηρεμιστικό.",
      "Ένα βραδινό ρόφημα χαμομηλιού μπορεί να μειώσει τα επίπεδα κορτιζόλης και να βελτιώσει την ποιότητα του ύπνου — δύο παράγοντες που συνδέονται άμεσα με τη διαχείριση του άγχους."
    ],
    references: [
      "Amsterdam et al., \"Chamomile (Matricaria recutita) may provide antidepressant activity in anxious, depressed humans\", Alternative Therapies in Health and Medicine, 2012",
      "Srivastava et al., \"Chamomile: A herbal medicine of the past with a bright future\", Molecular Medicine Reports, 2010"
    ],
    products: [
      { name: "Χαμομήλι Κρήτης", handle: "χαμομήλι-κρήτης", tagline: "Φυσική ηρεμία", price: "15.00" },
      { name: "Μέντα Πελίου", handle: "μέντα-πελίου", tagline: "Χαλαρωτικό αφέψημα", price: "14.00" },
    ],
  },
  {
    id: "insomnia",
    label: "Αϋπνία",
    emoji: "🌙",
    article: [
      "Η αϋπνία είναι ένα σύγχρονο πρόβλημα που επηρεάζει την ποιότητα ζωής εκατομμυρίων ανθρώπων. Τα φυτικά ροφήματα αποτελούν μια ήπια, φυσική προσέγγιση για τη βελτίωση του ύπνου.",
      "Το χαμομήλι δρα ως ήπιο υπνωτικό μέσω της απιγενίνης. Κλινικές μελέτες δείχνουν ότι η τακτική κατανάλωση χαμομηλιού βελτιώνει σημαντικά την ποιότητα ύπνου σε σύγκριση με placebo.",
      "Το τσάι βουνού έχει επίσης ηρεμιστικές ιδιότητες χωρίς καφεΐνη, καθιστώντας το ιδανικό βραδινό ρόφημα. Σε συνδυασμό με μέλι, που περιέχει τρυπτοφάνη, μπορεί να βοηθήσει στη φυσική παραγωγή μελατονίνης."
    ],
    references: [
      "Chang & Chen, \"Effects of chamomile extract on sleep quality among elderly people\", Journal of Advanced Nursing, 2016",
      "Karimi et al., \"Sideritis as a sleep-promoting herb\", Phytotherapy Research, 2018"
    ],
    products: [
      { name: "Χαμομήλι Κρήτης", handle: "χαμομήλι-κρήτης", tagline: "Υπνωτικό αφέψημα", price: "15.00" },
      { name: "Τσάι Βουνού Ολύμπου", handle: "τσάι-βουνού-ολύμπου", tagline: "Ηρεμιστικό ρόφημα", price: "16.00" },
    ],
  },
  {
    id: "cold",
    label: "Κρυολόγημα",
    emoji: "🤧",
    article: [
      "Το κοινό κρυολόγημα μπορεί να διαρκέσει 7-10 ημέρες, αλλά τα σωστά φυτικά ροφήματα μπορούν να μετριάσουν τα συμπτώματα και να ενισχύσουν το ανοσοποιητικό σύστημα.",
      "Το τσάι βουνού είναι παραδοσιακά γνωστό στην Ελλάδα ως «το τσάι που διώχνει τα κρυολογήματα». Οι αντιοξειδωτικές και αντιφλεγμονώδεις ιδιότητές του βοηθούν τον οργανισμό να αντιμετωπίσει τη λοίμωξη, ενώ η μέντα ανακουφίζει τη ρινική συμφόρηση.",
      "Η προσθήκη μελιού σε ζεστό αφέψημα δεν είναι απλά θέμα γεύσης — μελέτες δείχνουν ότι το μέλι μπορεί να είναι εξίσου αποτελεσματικό με φαρμακευτικά σιρόπια βήχα στη μείωση της συχνότητας του βήχα."
    ],
    references: [
      "Paul et al., \"Effect of honey on nocturnal cough and sleep quality\", Archives of Pediatrics and Adolescent Medicine, 2007",
      "Todorova & Trendafilova, \"Sideritis scardica Griseb.\", Journal of Ethnopharmacology, 2014"
    ],
    products: [
      { name: "Τσάι Βουνού Ολύμπου", handle: "τσάι-βουνού-ολύμπου", tagline: "Ενίσχυση ανοσοποιητικού", price: "16.00" },
      { name: "Θυμαρίσιο Μέλι Υμηττού", handle: "θυμαρίσιο-μέλι-υμηττού", tagline: "Φυσικό σιρόπι βήχα", price: "24.00" },
      { name: "Μέντα Πελίου", handle: "μέντα-πελίου", tagline: "Αποσυμφορητικό", price: "14.00" },
    ],
  },
  {
    id: "headache",
    label: "Πονοκέφαλος",
    emoji: "🤕",
    article: [
      "Ο πονοκέφαλος μπορεί να οφείλεται σε πολλούς παράγοντες: στρες, αφυδάτωση, ένταση των μυών. Τα φυτικά ροφήματα μπορούν να βοηθήσουν ως συμπληρωματική προσέγγιση.",
      "Η μέντα (Mentha piperita) περιέχει μενθόλη, η οποία έχει αποδεδειγμένη αναλγητική δράση. Η εισπνοή ατμού μέντας ή η κατανάλωση αφεψήματος μπορεί να μειώσει τον πόνο κεφαλής τύπου τάσης.",
      "Το χαμομήλι δρα συμπληρωματικά μέσω της αντιφλεγμονώδους δράσης του, ενώ η χαλαρωτική επίδρασή του μπορεί να ανακουφίσει πονοκεφάλους που σχετίζονται με το στρες."
    ],
    references: [
      "Göbel et al., \"Effectiveness of Oleum menthae piperitae and paracetamol in therapy of headache\", Nervenarzt, 1996",
      "Zargaran et al., \"Medicinal plants in headache treatment\", Journal of Traditional and Complementary Medicine, 2014"
    ],
    products: [
      { name: "Μέντα Πελίου", handle: "μέντα-πελίου", tagline: "Φυσικό αναλγητικό", price: "14.00" },
      { name: "Χαμομήλι Κρήτης", handle: "χαμομήλι-κρήτης", tagline: "Αντιφλεγμονώδες", price: "15.00" },
    ],
  },
  {
    id: "digestion",
    label: "Πεπτικά",
    emoji: "🫃",
    article: [
      "Τα πεπτικά προβλήματα — φούσκωμα, δυσπεψία, κράμπες — είναι εξαιρετικά συχνά και συχνά συνδέονται με το στρες και τις διατροφικές συνήθειες. Τα αρωματικά βότανα αποτελούν ένα από τα παλαιότερα εργαλεία αντιμετώπισης.",
      "Η μέντα είναι ίσως το πιο γνωστό πεπτικό βότανο — η μενθόλη χαλαρώνει τους λείους μυς του γαστρεντερικού σωλήνα, μειώνοντας τους σπασμούς και το φούσκωμα. Κλινικές μελέτες υποστηρίζουν τη χρήση της σε σύνδρομο ευερέθιστου εντέρου.",
      "Το ελαιόλαδο, ειδικά το εξαιρετικό παρθένο, περιέχει ελαιοκανθάλη — μια ουσία με αντιφλεγμονώδη δράση παρόμοια με την ιβουπροφαίνη. Μια κουταλιά ωμού ελαιολάδου το πρωί μπορεί να βελτιώσει τη γαστρεντερική λειτουργία."
    ],
    references: [
      "Khanna et al., \"Peppermint oil for the treatment of irritable bowel syndrome\", Journal of Clinical Gastroenterology, 2014",
      "Beauchamp et al., \"Ibuprofen-like activity in extra-virgin olive oil\", Nature, 2005"
    ],
    products: [
      { name: "Μέντα Πελίου", handle: "μέντα-πελίου", tagline: "Πεπτικό αφέψημα", price: "14.00" },
      { name: "Εξαιρετικό Παρθένο Ελαιόλαδο Καλαμάτας", handle: "εξαιρετικό-παρθένο-ελαιόλαδο-καλαμάτας", tagline: "Αντιφλεγμονώδες", price: "28.00" },
    ],
  },
];

const WellnessGuidePage = () => {
  const [activeSymptom, setActiveSymptom] = useState<SymptomData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSymptoms = symptoms.filter((s) =>
    s.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <section className="py-[12vh]">
        <div className="container mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            {!activeSymptom ? (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={transition}
              >
                <h1 className="font-display text-4xl md:text-5xl mb-4">Wellness Guide</h1>
                <p className="text-muted-foreground mb-12 max-w-lg">
                  Ανακαλύψτε πώς τα ελληνικά φυτά μπορούν να σας βοηθήσουν, με βάση την επιστήμη.
                </p>

                {/* Search */}
                <div className="relative mb-12">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Πώς μπορούμε να σε βοηθήσουμε σήμερα;"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-secondary/50 border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Symptom cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredSymptoms.map((symptom) => (
                    <button
                      key={symptom.id}
                      onClick={() => setActiveSymptom(symptom)}
                      className="flex flex-col items-center gap-3 p-6 bg-secondary/30 border border-border/50 rounded-sm hover:border-primary/50 hover:bg-secondary/50 transition-all duration-200 text-center"
                    >
                      <span className="text-2xl">{symptom.emoji}</span>
                      <span className="text-sm font-medium">{symptom.label}</span>
                    </button>
                  ))}
                </div>

                {/* Disclaimer */}
                <div className="mt-16 p-6 bg-secondary/20 border border-border/30 rounded-sm">
                  <p className="text-xs text-muted-foreground leading-relaxed text-center">
                    ⚕️ Οι πληροφορίες αυτές είναι εκπαιδευτικές και δεν αντικαθιστούν ιατρική συμβουλή.
                    Συμβουλευτείτε πάντα τον γιατρό σας πριν αλλάξετε τη διατροφή ή τη θεραπεία σας.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="article"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={transition}
              >
                <button
                  onClick={() => setActiveSymptom(null)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Πίσω στα συμπτώματα
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{activeSymptom.emoji}</span>
                  <h1 className="font-display text-3xl md:text-4xl">{activeSymptom.label}</h1>
                </div>

                {/* Article */}
                <div className="mb-12 space-y-6">
                  {activeSymptom.article.map((paragraph, i) => (
                    <p key={i} className={`text-sm leading-relaxed ${i === 0 ? "text-foreground font-display text-lg leading-relaxed first-letter:text-4xl first-letter:font-display first-letter:mr-1 first-letter:float-left" : "text-muted-foreground"}`}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* References */}
                <div className="mb-12 p-6 bg-secondary/30 rounded-sm">
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Επιστημονικές Αναφορές</h3>
                  <ul className="space-y-2">
                    {activeSymptom.references.map((ref, i) => (
                      <li key={i} className="text-xs text-muted-foreground/80 leading-relaxed">
                        [{i + 1}] {ref}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended products */}
                <div>
                  <h3 className="font-display text-xl mb-6">Προτεινόμενα Προϊόντα</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeSymptom.products.map((product) => (
                      <div key={product.handle} className="flex items-center gap-4 p-4 bg-secondary/30 border border-border/50 rounded-sm">
                        <div className="flex-1">
                          <Link to={`/product/${product.handle}`} className="font-medium text-sm hover:text-primary transition-colors">
                            {product.name}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-1">{product.tagline}</p>
                          <p className="text-sm font-medium mt-2">{parseFloat(product.price).toFixed(2)}€</p>
                        </div>
                        <Link
                          to={`/product/${product.handle}`}
                          className="p-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-12 p-6 bg-secondary/20 border border-border/30 rounded-sm">
                  <p className="text-xs text-muted-foreground leading-relaxed text-center">
                    ⚕️ Οι πληροφορίες αυτές είναι εκπαιδευτικές και δεν αντικαθιστούν ιατρική συμβουλή.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default WellnessGuidePage;
