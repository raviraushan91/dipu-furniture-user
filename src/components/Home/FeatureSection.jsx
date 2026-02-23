import { Truck, Shield, Headphones, CreditCard } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50 worldwide'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure payment with SSL encryption'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated customer support available anytime'
    },
    {
      icon: CreditCard,
      title: 'Easy Returns',
      description: '30-day return policy for your peace of mind'
    }
  ];

  return (
    <section className="py-6">
      <div className="mb-4">
        <p className="text-[10px] tracking-[0.2em] uppercase text-primary font-semibold mb-1.5">
          Why Us
        </p>
        <h2 className="section-headline main-highlight mb-1.5">Designed For Stress-Free Furniture Buying</h2>
        <p className="text-muted-tight">Fast support, reliable delivery, and trusted supplier network.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {features.map((feature, index) => (
          <div key={index} className="glass-card p-3.5">
            <div className="w-10 h-10 mb-2.5 gradient-primary rounded-xl flex items-center justify-center">
              <feature.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">
              {feature.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;

