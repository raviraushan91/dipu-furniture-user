import { Link } from "react-router-dom";
import { categories } from "../../data/products";
const CategoryGrid = () => {
  return (
    <section className="py-7">
      <div className="mb-5">
        <p className="text-xs tracking-[0.22em] uppercase text-primary font-semibold mb-2">
          Curated Collections
        </p>
        <h2 className="section-headline main-highlight mb-3">Shop By Room, Not By Chance</h2>
        <p className="section-subtitle">
          Handpicked furniture groups designed to help you build complete spaces faster.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {categories.map((category) => {
          const isOwnDesign = category.name.toLowerCase() === "own design";
          return (
            <Link
              key={category.id}
              to={isOwnDesign ? "/post-requirement" : `/products?category=${category.name}`}
              className="group glass-card p-2.5 md:p-3"
            >
              <div className="relative overflow-hidden rounded-lg mb-2.5">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-28 sm:h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <span className="text-[11px] px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                  {isOwnDesign ? "Post" : "View"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;

