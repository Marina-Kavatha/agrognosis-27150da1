import { useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Μαρία Κ.",
    location: "Αθήνα",
    stars: 5,
    text: "Το τσάι βουνού από την Ήπειρο είναι απλά εκπληκτικό. Μπορώ να νιώσω τη διαφορά από τα supermarket προϊόντα.",
  },
  {
    name: "Γιάννης Π.",
    location: "Θεσσαλονίκη",
    stars: 5,
    text: "Επιτέλους ξέρω από πού προέρχεται αυτό που τρώω. Η διαφάνεια του AgroLab είναι αυτό που με κάνει να ξαναγοράζω.",
  },
  {
    name: "Ελένη Σ.",
    location: "Ηράκλειο",
    stars: 5,
    text: "Το μέλι Υμηττού ήταν δώρο για τη μητέρα μου. Τηλεφώνησε να με ευχαριστήσει τρεις φορές.",
  },
  {
    name: "Αλέξανδρος Μ.",
    location: "Πάτρα",
    stars: 4,
    text: "Πολύ καλή ποιότητα και γρήγορη αποστολή. Θα ήθελα περισσότερες επιλογές στα αρωματικά.",
  },
  {
    name: "Σοφία Δ.",
    location: "Αθήνα",
    stars: 5,
    text: "Το Wellness Guide με βοήθησε να βρω τι χρειαζόμουν για τον πονόλαιμό μου. Αγόρασα και δεν το μετάνιωσα.",
  },
];

export const ReviewsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="flex justify-end gap-2 mb-6">
        <button onClick={() => scroll("left")} className="p-2 border border-border rounded-sm hover:bg-secondary transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button onClick={() => scroll("right")} className="p-2 border border-border rounded-sm hover:bg-secondary transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory">
        {reviews.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex-shrink-0 w-[300px] md:w-[340px] bg-secondary/30 border border-border/50 p-6 rounded-sm snap-start"
          >
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  className={`w-4 h-4 ${j < review.stars ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                />
              ))}
            </div>
            <p className="text-sm text-foreground leading-relaxed mb-6 italic">
              "{review.text}"
            </p>
            <div>
              <p className="text-sm font-medium">{review.name}</p>
              <p className="text-xs text-muted-foreground">{review.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
