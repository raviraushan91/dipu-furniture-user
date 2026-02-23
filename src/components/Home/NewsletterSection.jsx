import { useState } from "react";
import { Mail, Send } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-10">
      <div className="glass-panel text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-45 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-12 -right-8 w-52 h-52 rounded-full bg-accent/30 blur-3xl" />
        </div>
        <div className="max-w-2xl mx-auto relative z-10 px-2">
          <div className="w-16 h-16 mx-auto mb-6 gradient-primary rounded-2xl flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary-foreground" />
          </div>

          <h2 className="section-headline mb-4">
            The Atelier Letter
          </h2>
          <p className="section-subtitle mx-auto mb-5">
            Weekly edit of interior ideas, price drops, and new statement pieces before everyone else.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Subscribe</span>
            </button>
          </form>

          <p className="text-sm text-muted-foreground mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;

