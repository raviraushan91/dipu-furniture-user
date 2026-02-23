import { useState } from "react";
import { Building2, CircleCheckBig, Factory, ShieldCheck } from "lucide-react";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

const NEED_OPTIONS = [
  "Sofa Set",
  "L-Shape Sofa",
  "Recliner Sofa",
  "Bed",
  "Hydraulic Bed",
  "Bunk Bed",
  "Dining Table Set",
  "Center Table",
  "TV Unit",
  "Wardrobe",
  "Study Table",
  "Office Table",
  "Office Chair",
  "Bookshelf",
  "Shoe Rack",
  "Kitchen Cabinet",
  "Mandir Unit",
  "Wooden Partition",
  "Custom Furniture",
  "Other",
];

const WOOD_OPTIONS = [
  "Teak Wood",
  "Sheesham Wood",
  "Oak Wood",
  "Pine Wood",
  "Mango Wood",
  "Walnut Wood",
  "Mahogany Wood",
  "Engineered Wood",
  "Plywood",
  "MDF",
];

const PostRequirementSection = () => {
  const [isSubmittingRequirement, setIsSubmittingRequirement] = useState(false);
  const [requirementForm, setRequirementForm] = useState({
    user_name: "",
    product_needed: "",
    custom_product_needed: "",
    required_by_date: "",
    quantity: "",
    wood_type: "",
    dimensions: "",
    mobile: "+91",
    address: "",
    design_image: null,
  });

  const handleRequirementSubmit = async (e) => {
    e.preventDefault();
    if (!requirementForm.design_image) {
      toast.error("Please upload a design photo.");
      return;
    }

    const finalNeed =
      requirementForm.product_needed === "Other"
        ? requirementForm.custom_product_needed.trim()
        : requirementForm.product_needed;

    if (!finalNeed) {
      toast.error("Please enter what you need.");
      return;
    }

    const data = new FormData();
    data.append("user_name", requirementForm.user_name);
    data.append("product_needed", finalNeed);
    data.append("required_by_date", requirementForm.required_by_date);
    data.append("quantity", requirementForm.quantity);
    data.append("wood_type", requirementForm.wood_type);
    data.append("dimensions", requirementForm.dimensions);
    data.append("mobile", requirementForm.mobile);
    data.append("address", requirementForm.address);
    data.append("design_image", requirementForm.design_image);

    try {
      setIsSubmittingRequirement(true);
      const response = await axiosInstance.post("/order/special-requirement", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data?.message || "Requirement submitted.");
      setRequirementForm({
        user_name: "",
        product_needed: "",
        custom_product_needed: "",
        required_by_date: "",
        quantity: "",
        wood_type: "",
        dimensions: "",
        mobile: "+91",
        address: "",
        design_image: null,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit requirement.");
    } finally {
      setIsSubmittingRequirement(false);
    }
  };

  return (
    <section id="post-requirement" className="grid grid-cols-1 lg:grid-cols-3 gap-5 py-5">
      <div className="lg:col-span-2 glass-panel p-4 md:p-5">
        <p className="text-xs tracking-[0.2em] uppercase text-primary font-semibold">
          Post Your Requirement
        </p>
        <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-2">
          Get Best Quotes from Furniture Suppliers
        </h3>
        <p className="text-muted-foreground mb-4">
          Share your quantity, budget and delivery location. Suppliers will contact you
          with pricing and offers.
        </p>
        <form onSubmit={handleRequirementSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <input
            required
            className="px-3.5 py-2.5 rounded-lg bg-secondary border border-border outline-none"
            placeholder="Your Name"
            value={requirementForm.user_name}
            onChange={(e) =>
              setRequirementForm((prev) => ({
                ...prev,
                user_name: e.target.value,
              }))
            }
          />
          <select
            required
            className="px-3.5 py-2.5 rounded-lg bg-secondary border border-border outline-none"
            value={requirementForm.product_needed}
            onChange={(e) =>
              setRequirementForm((prev) => ({
                ...prev,
                product_needed: e.target.value,
              }))
            }
          >
            <option value="">What do you need?</option>
            {NEED_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {requirementForm.product_needed === "Other" && (
            <input
              required
              className="px-3.5 py-2.5 rounded-lg bg-secondary border border-border outline-none"
              placeholder="Please enter product name"
              value={requirementForm.custom_product_needed}
              onChange={(e) =>
                setRequirementForm((prev) => ({
                  ...prev,
                  custom_product_needed: e.target.value,
                }))
              }
            />
          )}
          <input
            required
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="px-3.5 py-2.5 rounded-lg bg-secondary border border-border outline-none"
            value={requirementForm.required_by_date}
            onChange={(e) =>
              setRequirementForm((prev) => ({
                ...prev,
                required_by_date: e.target.value,
              }))
            }
          />
          <input
            required
            type="number"
            min={1}
            className="px-3.5 py-2.5 rounded-lg bg-secondary border border-border outline-none"
            placeholder="How much quantity?"
            value={requirementForm.quantity}
            onChange={(e) =>
              setRequirementForm((prev) => ({
                ...prev,
                quantity: e.target.value,
              }))
            }
          />
          <select
            className="px-3.5 py-2.5 rounded-lg bg-secondary border border-border outline-none"
            value={requirementForm.wood_type}
            onChange={(e) =>
              setRequirementForm((prev) => ({
                ...prev,
                wood_type: e.target.value,
              }))
            }
          >
            <option value="">Wood type (Optional)</option>
            {WOOD_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            required
            className="px-3.5 py-2.5 rounded-lg bg-secondary border border-border outline-none"
            placeholder="Dimensions (e.g., 72 x 36 x 30 in)"
            value={requirementForm.dimensions}
            onChange={(e) =>
              setRequirementForm((prev) => ({
                ...prev,
                dimensions: e.target.value,
              }))
            }
          />
          <input
            required
            className="px-3.5 py-2.5 rounded-lg bg-secondary border border-border outline-none"
            placeholder="Mobile Number (+91...)"
            value={requirementForm.mobile}
            onChange={(e) =>
              setRequirementForm((prev) => ({
                ...prev,
                mobile: e.target.value,
              }))
            }
          />
          <input
            required
            type="file"
            accept="image/*"
            className="px-3.5 py-2.5 rounded-lg bg-secondary border border-border outline-none"
            onChange={(e) =>
              setRequirementForm((prev) => ({
                ...prev,
                design_image: e.target.files?.[0] || null,
              }))
            }
          />
          <textarea
            required
            className="md:col-span-2 px-3.5 py-2.5 rounded-lg bg-secondary border border-border outline-none min-h-20"
            placeholder="Address"
            value={requirementForm.address}
            onChange={(e) =>
              setRequirementForm((prev) => ({
                ...prev,
                address: e.target.value,
              }))
            }
          />
          <button disabled={isSubmittingRequirement} className="md:col-span-2 btn-primary disabled:opacity-60">
            {isSubmittingRequirement ? "Submitting..." : "Submit Requirement"}
          </button>
        </form>
      </div>

      <div className="glass-panel p-4 md:p-5">
        <h4 className="text-xl md:text-2xl font-bold mb-4">Why Buy Here</h4>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <CircleCheckBig className="w-5 h-5 text-primary mt-0.5" />
            <span>Direct connection with furniture manufacturers and wholesalers.</span>
          </li>
          <li className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
            <span>Supplier verification and transparent business profiles.</span>
          </li>
          <li className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-primary mt-0.5" />
            <span>Bulk order support for hotels, offices, retailers and projects.</span>
          </li>
          <li className="flex items-start gap-3">
            <Factory className="w-5 h-5 text-primary mt-0.5" />
            <span>Factory-direct rates with easy negotiation on quantity.</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PostRequirementSection;
