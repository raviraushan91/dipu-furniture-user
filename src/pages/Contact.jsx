import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

const Contact = () => {
  const shopAddress =
    "Dipu furniture shop, road, Bishunganj, Makhdumpur, Bihar 804405";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    shopAddress
  )}`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await axiosInstance.post("/contact/submit", formData);
      toast.success(response.data?.message || "Message sent successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="page-title main-highlight mb-3">
            Contact Us
          </h1>
          <p className="text-base text-muted-foreground">
            Get in touch with our team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="glass-panel p-4 md:p-5 space-y-5">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Email</h3>
                <p className="text-muted-foreground text-sm">hello@dipufurniture.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                <p className="text-muted-foreground text-sm">+91 9973908573</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Address</h3>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary underline underline-offset-2"
                >
                  {shopAddress}
                </a>
                <div className="mt-2">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs sm:text-sm text-foreground hover:bg-background"
                  >
                    <MapPin className="w-4 h-4" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel p-4 md:p-5">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="px-3.5 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="px-3.5 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                required
              />

              <textarea
                rows="6"
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                required
              />

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full"
              >
                <Send className="w-5 h-5" />
                <span>{submitting ? "Sending..." : "Send Message"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
