import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const transition = { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const };

interface ProductCardProps {
  product: ShopifyProduct;
}

const fallbackByCategory = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes("μέλι") || t.includes("meli") || t.includes("honey"))
    return "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80";
  if (t.includes("λάδι") || t.includes("ελαι") || t.includes("olive") || t.includes("oil"))
    return "https://images.unsplash.com/photo-1601301704941-eccd9d76ee4d?w=800&q=80";
  if (t.includes("βότ") || t.includes("τσάι") || t.includes("χαμομ") || t.includes("μέντα") || t.includes("herb"))
    return "https://images.unsplash.com/photo-1515envelope".length > 0
      ? "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800&q=80"
      : "";
  return "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80";
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const imageUrl = image?.url || fallbackByCategory(node.title);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition },
      }}
    >
      <Link to={`/product/${node.handle}`} className="group flex flex-col space-y-4">
        <div className="aspect-[4/5] overflow-hidden bg-secondary relative rounded-sm">
          <img
            src={imageUrl}
            alt={image?.altText || node.title}
            className="w-full h-full object-cover image-treatment mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700"
          />
          <button
            onClick={handleAddToCart}
            disabled={isLoading || !variant?.availableForSale}
            className="absolute bottom-4 right-4 p-3 bg-background/90 backdrop-blur-sm rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background disabled:opacity-50"
          >
            <ShoppingCart className="w-4 h-4 text-foreground" />
          </button>
        </div>
        <div className="flex flex-col space-y-1">
          <h3 className="font-display text-lg text-foreground">{node.title}</h3>
          <p className="text-sm text-muted-foreground/60">{parseFloat(price.amount).toFixed(2)}€</p>
        </div>
      </Link>
    </motion.div>
  );
};
