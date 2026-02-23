import PostRequirementSection from "../components/Home/PostRequirementSection";

const PostRequirement = () => {
  return (
    <div className="pt-20 pb-8 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="glass-panel p-4 md:p-5 mb-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold mb-1.5">
            Own Design
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold main-highlight mb-2">
            Post Your Requirement
          </h1>
          <p className="text-sm text-muted-foreground">
            Apni requirement details fill kariye, dealer aapse direct contact karega.
          </p>
        </div>
        <PostRequirementSection />
      </div>
    </div>
  );
};

export default PostRequirement;
