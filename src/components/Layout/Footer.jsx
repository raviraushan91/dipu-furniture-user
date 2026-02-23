import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const shopAddress =
    "Dipu furniture shop, road, Bishunganj, Makhdumpur, Bihar 804405";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    shopAddress
  )}`;

  const footerLinks = {
    company: [
      { name: "About Us", path: "/about" },
      { name: "Lookbook", path: "#" },
      { name: "Design Journal", path: "#" },
    ],
    customer: [
      { name: "Contact Us", path: "/contact" },
      { name: "FAQ", path: "/faq" },
      { name: "Delivery & Setup", path: "#" },
    ],
    legal: [
      { name: "Privacy Policy", path: "#" },
      { name: "Terms of Service", path: "#" },
      { name: "Warranty", path: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="mt-6 px-3 sm:px-4 pb-4">
      <div className="container mx-auto glass-panel p-4 md:p-5 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
            <h2 className="text-xl md:text-2xl font-semibold gradient-primary bg-clip-text text-transparent mb-2">
              Dipu Furniture
            </h2>
            <p className="text-muted-foreground mb-3 text-xs sm:text-sm">
              Curated furniture made for expressive homes. Modern comfort, timeless character.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span>support@dipufurniture.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span>+91 9973908573</span>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary underline underline-offset-2"
                >
                  {shopAddress}
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <h3 className="text-sm font-semibold mb-2">Company</h3>
              <ul className="space-y-1.5">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Support</h3>
              <ul className="space-y-1.5">
                {footerLinks.customer.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Legal</h3>
              <ul className="space-y-1.5">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t border-border">
          <div className="flex items-center gap-1.5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-1.5 rounded-lg bg-secondary hover:bg-muted transition-colors"
              >
                <social.icon className="w-3.5 h-3.5 text-primary" />
              </a>
            ))}
          </div>
          <p className="text-muted-foreground text-[11px] sm:text-xs">© 2012 Dipu Furniture. Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
