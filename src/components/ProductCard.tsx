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

const driveImg = (id: string) => `https://lh3.googleusercontent.com/d/${id}=w800`;

const productImageOverrides: { match: string[]; url: string }[] = [
  { match: ["χαμομήλι"], url: driveImg("1x55PZCgQoysmuGPxNhvWPF6uoADIHBlk") },
  { match: ["τσάι βουνού", "ολύμπου"], url: driveImg("1Raf0omEvpNO5Itrbp9HAc96us1nH6VJo") },
  { match: ["πευκόμελο"], url: driveImg("1BbxcDUzjL-WxDQuJxo8EtYefraZ_hjHq") },
  { match: ["μέντα"], url: driveImg("1rWUwEFxiIF6YCvcDLSJe2W_d8Ac7Q_1D") },
  { match: ["θυμαρίσιο", "υμηττού"], url: driveImg("173rD9IXQa4QYl18MFFoXX99o-V9sZX0V") },
  { match: ["ανθόμελο"], url: driveImg("12atLFuw8-IJmqgSvnj5DApblqWBZlnHr") },
  { match: ["λέσβου"], url: driveImg("1UbNAUhLIfwasSXl-EMXf7LDxE7boBDEg") },
  { match: ["καλαμάτας"], url: driveImg("1v2B7mUIRQjtiTxe_YtpY4LmZIX-EwxMZ") },
];

export const fallbackByCategory = (title: string): string => {
  const t = title.toLowerCase();
  for (const o of productImageOverrides) {
    if (o.match.every((m) => t.includes(m))) return o.url;
  }
  for (const o of productImageOverrides) {
    if (o.match.some((m) => t.includes(m))) return o.url;
  }
  if (t.includes("μέλι") || t.includes("honey")) return driveImg("173rD9IXQa4QYl18MFFoXX99o-V9sZX0V");
  if (t.includes("λάδι") || t.includes("ελαι") || t.includes("olive") || t.includes("oil"))
    return driveImg("1v2B7mUIRQjtiTxe_YtpY4LmZIX-EwxMZ");
  if (t.includes("βότ") || t.includes("τσάι") || t.includes("herb")) return driveImg("1Raf0omEvpNO5Itrbp9HAc96us1nH6VJo");
  return "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80";
};

export const getProductImageUrl = (product: ShopifyProduct): string => {
  const img = product.node.images.edges[0]?.node;
  return img?.url || fallbackByCategory(product.node.title);
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
    // Meta Pixel: AddToCart tracking
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const productPrice = parseFloat(variant.price?.amount ?? price?.amount ?? '') || 35.00;
      (window as any).fbq('track', 'AddToCart', { value: productPrice, currency: 'EUR' });
    }
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
        <div className="aspect-square overflow-hidden bg-secondary relative rounded-sm">
          <img
            src={imageUrl}
            alt={image?.altText || node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
