import { Suspense } from 'react';
import { getProducts, type Product } from '@/data/products';
import { categories } from '@/data/categories';
import ShopFilters from '@/components/ShopFilters';
import ProductGrid from '@/components/ProductGrid';

type PageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getCategoryName(slug: string): Promise<string> {
  const category = categories.find((c) => c.slug === slug);
  return category?.name ?? slug.replace(/-/g, ' ');
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const name = await getCategoryName(category);
  return {
    title: `${name} | Wed`,
    description: `${name} — επιλεγμένα νυφικά είδη για τη μέρα σας.`,
  };
}

export default async function CategoryShopPage({ params, searchParams }: PageProps) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const categoryName = await getCategoryName(category);

  const search = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : undefined;
  const filterCategory =
    typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : categoryName;
  const minPrice =
    typeof resolvedSearchParams.minPrice === 'string' ? parseFloat(resolvedSearchParams.minPrice) : undefined;
  const maxPrice =
    typeof resolvedSearchParams.maxPrice === 'string' ? parseFloat(resolvedSearchParams.maxPrice) : undefined;
  const sortParam = typeof resolvedSearchParams.sort === 'string' ? resolvedSearchParams.sort : undefined;
  const validSort = ['newest', 'price-asc', 'price-desc'] as const;
  const sort = sortParam && validSort.includes(sortParam as typeof validSort[number])
    ? (sortParam as 'newest' | 'price-asc' | 'price-desc')
    : 'newest';
  const inStockOnly = resolvedSearchParams.inStock === 'true';

  const products = getProducts({
    search,
    category: filterCategory,
    minPrice,
    maxPrice,
    sort,
    inStockOnly,
  });

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl md:text-4xl font-serif font-light text-charcoal mb-2">
          {categoryName}
        </h1>
        <p className="text-charcoal/70 mb-8">
          {products.length}{" "}
          {products.length === 1 ? "προϊόν" : "προϊόντα"}
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <ShopFilters
              currentCategory={filterCategory}
              categories={categories.map((c) => c.name)}
              defaultSearch={search}
              defaultMinPrice={minPrice}
              defaultMaxPrice={maxPrice}
              defaultSort={sort}
              defaultInStock={inStockOnly}
            />
          </aside>

          <div className="flex-1 min-w-0">
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid products={products} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="aspect-[3/4] rounded-lg bg-charcoal/5 animate-pulse" />
      ))}
    </div>
  );
}
