import { type Product } from "@/data/products";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-charcoal/70">
        <p className="text-lg">Κανένα προϊόν δεν ταιριάζει στα φίλτρα σας.</p>
        <p className="mt-2">Δοκιμάστε άλλα κριτήρια αναζήτησης ή φίλτρα.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
