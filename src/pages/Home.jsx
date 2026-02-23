import React from "react";
import HeroSlider from "../components/Home/HeroSlider";
import CategoryGrid from "../components/Home/CategoryGrid";
import ProductSlider from "../components/Home/ProductSlider";
import FeatureSection from "../components/Home/FeatureSection";
import NewsletterSection from "../components/Home/NewsletterSection";
import PostRequirementSection from "../components/Home/PostRequirementSection";
import { useSelector } from "react-redux";

const Index = () => {
  const { products, topRatedProducts, newProducts } = useSelector(
    (state) => state.product
  );

  const fallbackNew = products.slice(0, 4);
  const fallbackTop = [...products]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);

  const newArrivals = newProducts.length ? newProducts : fallbackNew;
  const topRated = topRatedProducts.length ? topRatedProducts : fallbackTop;

  return (
    <div className="min-h-screen">
      <HeroSlider />
      <div className="container mx-auto px-3 sm:px-5 pt-6">
        <section className="glass-panel p-3 md:p-4 mb-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-xl bg-secondary/80 p-3 border border-border/70">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.13em]">
                Verified Suppliers
              </p>
              <p className="text-[1.72rem] font-bold mt-1 leading-none">12,000+</p>
            </div>
            <div className="rounded-xl bg-secondary/80 p-3 border border-border/70">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.13em]">
                Daily Enquiries
              </p>
              <p className="text-[1.72rem] font-bold mt-1 leading-none">5,400+</p>
            </div>
            <div className="rounded-xl bg-secondary/80 p-3 border border-border/70">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.13em]">
                Product Categories
              </p>
              <p className="text-[1.72rem] font-bold mt-1 leading-none">800+</p>
            </div>
            <div className="rounded-xl bg-secondary/80 p-3 border border-border/70">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.13em]">
                Buyer Satisfaction
              </p>
              <p className="text-[1.72rem] font-bold mt-1 leading-none">98.2%</p>
            </div>
          </div>
        </section>

        <CategoryGrid />
        <ProductSlider title="New Arrivals" products={newArrivals} />
        <ProductSlider title="Top Rated Products" products={topRated} />
        <PostRequirementSection />

        <FeatureSection />
        <NewsletterSection />
      </div>
    </div>
  );
};

export default Index;

