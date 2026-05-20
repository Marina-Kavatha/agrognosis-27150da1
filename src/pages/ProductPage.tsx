import { Layout } from "@/components/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { fallbackByCategory } from "@/components/ProductCard";

const transition = { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const };

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"story" | "science" | "ritual">("story");
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle })
      .then((data) => {
        if (data?.data?.product) {
          setProduct({ node: data.data.product });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [handle]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-muted-foreground">Το προϊόν δεν βρέθηκε.</p>
        </div>
      </Layout>
    );
  }

  const { node } = product;
  const image = node.images.edges[0]?.node;
  const variant = node.variants.edges[0]?.node;

  const handleAddToCart = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Προστέθηκε στο καλάθι", {
      description: node.title,
      position: "top-center",
    });
  };

  const tabs = [
    { id: "story" as const, label: "Η Ιστορία" },
    { id: "science" as const, label: "Η Επιστήμη" },
    { id: "ritual" as const, label: "Η Τελετουργία" },
  ];

  return (
    <Layout breadcrumbTrail={[{ label: "Κατάστημα", to: "/shop" }, { label: node.title }]}>
      <section className="py-[12vh]">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
          >
            {/* Product Image */}
            <div className="aspect-square bg-secondary rounded-sm overflow-hidden relative">
              {image ? (
                <img
                  src={image.url}
                  alt={image.altText || node.title}
                  className="w-full h-full object-cover image-treatment"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Χωρίς εικόνα
                </div>
              )}
              {/* Eco badge */}
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground stroke-[1px]" />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <h1 className="font-display text-3xl md:text-4xl mb-2">{node.title}</h1>
              <p className="text-sm text-muted-foreground mb-6">{node.description}</p>

              <p className="text-2xl font-display mb-8">
                {parseFloat(node.priceRange.minVariantPrice.amount).toFixed(2)}€
              </p>

              {/* Variant options */}
              {node.options && node.options.length > 0 && node.options[0].name !== "Title" && (
                <div className="mb-8">
                  {node.options.map((option) => (
                    <div key={option.name} className="mb-4">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                        {option.name}
                      </label>
                      <div className="flex gap-2">
                        {option.values.map((value) => (
                          <span
                            key={value}
                            className="text-sm px-3 py-1.5 border border-border rounded-sm"
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={isLoading || !variant?.availableForSale}
                className="w-full py-4 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-primary/90 transition-colors duration-200 rounded-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Προσθήκη στο Καλάθι"
                )}
              </button>

              {/* Eco packaging notice */}
              <div className="mt-6 flex items-start gap-3 p-4 bg-secondary/30 rounded-sm">
                <Leaf className="w-4 h-4 mt-0.5 text-primary flex-shrink-0 stroke-[1px]" />
                <div>
                  <p className="text-xs font-medium">Οικολογική Συσκευασία</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Χρησιμοποιούμε 100% ανακυκλώσιμα και βιοδιασπώμενα υλικά συσκευασίας.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Triptych Tabs */}
          <div className="mt-20 border-t border-border pt-12">
            <div className="flex gap-8 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-sm pb-2 border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="max-w-2xl">
              {activeTab === "story" && (
                <div className="prose prose-sm">
                  <p className="font-display text-lg leading-relaxed first-letter:text-4xl first-letter:font-display first-letter:mr-1 first-letter:float-left">
                    Κάθε προϊόν μας έχει μια μοναδική ιστορία. Πίσω από κάθε συσκευασία κρύβεται
                    ένας παραγωγός με γενιές παράδοσης, ένας τόπος με ξεχωριστό μικροκλίμα και
                    μια αφοσίωση στην ποιότητα που δεν μπορεί να αναπαραχθεί βιομηχανικά.
                  </p>
                </div>
              )}
              {activeTab === "science" && (
                <div>
                  <ul className="space-y-3 text-sm font-body">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Υψηλή περιεκτικότητα σε πολυφαινόλες</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Πιστοποιημένη βιολογική καλλιέργεια</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Εργαστηριακά ελεγμένο για βαρέα μέταλλα και φυτοφάρμακα</span>
                    </li>
                  </ul>
                  <p className="text-[10px] text-muted-foreground/50 mt-4">
                    Πηγή: Εσωτερικά εργαστηριακά αποτελέσματα Agrognosis
                  </p>
                </div>
              )}
              {activeTab === "ritual" && (
                <div className="font-display italic text-lg leading-relaxed">
                  <p className="mb-4">
                    <span className="not-italic text-xs uppercase tracking-widest text-muted-foreground block mb-2">Βήμα 1</span>
                    Ζεστάνετε νερό στους 80°C — αφήστε το να ηρεμήσει για ένα λεπτό.
                  </p>
                  <p>
                    <span className="not-italic text-xs uppercase tracking-widest text-muted-foreground block mb-2">Βήμα 2</span>
                    Αφήστε το προϊόν να εκλύσει τα αρώματά του για 5 λεπτά. Αναπνεύστε βαθιά.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductPage;
