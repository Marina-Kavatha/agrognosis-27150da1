import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { motion } from "framer-motion";

const categories = [
  { label: "Όλα", query: "" },
  { label: "Βότανα", query: "product_type:Βότανα" },
  { label: "Μέλι", query: "product_type:Μέλι" },
  { label: "Έλαια", query: "product_type:Έλαια" },
  { label: "Αρωματικά", query: "product_type:Αρωματικά" },
];

const ShopPage = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    setLoading(true);
    storefrontApiRequest(STOREFRONT_QUERY, {
      first: 24,
      query: activeCategory || undefined,
    })
      .then((data) => setProducts(data?.data?.products?.edges || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <Layout>
      <section className="py-[12vh]">
        <div className="container mx-auto">
          <h1 className="font-display text-4xl md:text-5xl mb-4">Κατάστημα</h1>
          <p className="text-muted-foreground mb-12 max-w-lg">
            Ανακαλύψτε αυθεντικά ελληνικά προϊόντα από επιλεγμένους τοπικούς παραγωγούς.
          </p>

          {/* Category filters */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.query}
                onClick={() => setActiveCategory(cat.query)}
                className={`text-xs uppercase tracking-widest px-4 py-2 border rounded-sm transition-colors duration-200 ${
                  activeCategory === cat.query
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/5] bg-secondary animate-pulse rounded-sm" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Δεν βρέθηκαν προϊόντα.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Προσθέστε προϊόντα μέσω του chat για να εμφανιστούν εδώ.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ShopPage;
