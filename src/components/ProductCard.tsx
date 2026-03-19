import Image from "next/image";
import { type Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

const priceFormatter = new Intl.NumberFormat("el-GR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group">
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gradient-to-br from-blush/30 via-cream to-blush/20 mb-3">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <span className="font-serif text-4xl md:text-5xl text-charcoal/40 text-center leading-tight">
              {product.name.split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium bg-blush text-white rounded">
            Προτεινόμενο
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center">
            <span className="text-white font-medium">Εξαντλημένο</span>
          </div>
        )}
      </div>
      <p className="text-xs text-charcoal/60 uppercase tracking-wider mb-1">
        {product.category}
      </p>
      <h3 className="font-serif text-lg font-medium text-charcoal group-hover:text-blush transition-colors">
        {product.name}
      </h3>
      <p className="text-sm text-charcoal/70 line-clamp-2 mt-1">
        {product.description}
      </p>
      <p className="mt-2 font-medium text-charcoal">
        {priceFormatter.format(product.price)}
      </p>
    </article>
  );
}
