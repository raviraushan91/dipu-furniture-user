import { categories } from "../data/products";
import ProductCard from "../components/Products/ProductCard";
import Pagination from "../components/Products/Pagination";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
const Products = () => {
  const location = useLocation();
  const { products } = useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);

  const source = products || [];

  const selectedCategory = useMemo(() => {
    const query = new URLSearchParams(location.search);
    return query.get("category") || "all";
  }, [location.search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const filtered = source.filter((item) => {
    return selectedCategory === "all" || item.category === selectedCategory;
  });

  const PER_PAGE = 6;
  const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1;
  const pageProducts = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  return (
    <div className="pt-20 pb-8 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="glass-panel p-3 md:p-4 mb-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold mb-1.5">
            Furniture Collection
          </p>
          <h1 className="text-xl md:text-2xl font-semibold main-highlight mb-2">
            Premium Wooden Designs
          </h1>
          <p className="text-sm text-muted-foreground">
            Category select karke direct matching products dekhiye.
          </p>
        </div>

        <div className="mb-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            <Link
              to="/products"
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedCategory === "all"
                  ? "gradient-primary text-primary-foreground"
                  : "bg-secondary"
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedCategory === cat.name
                    ? "gradient-primary text-primary-foreground"
                    : "bg-secondary hover:bg-muted"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="glass-panel text-center py-8">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try another category or broader search term.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {pageProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Products;

