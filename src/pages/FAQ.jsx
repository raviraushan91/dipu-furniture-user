import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'Simply browse our products, add items to your cart, and proceed to checkout. Follow the prompts to complete your order.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and other secure payment methods.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Express shipping options are available at checkout.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Items must be in original condition with tags attached.'
    }
  ];

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="page-title main-highlight mb-3">Frequently Asked Questions</h1>
          <p className="text-base text-muted-foreground">Find answers to common questions</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-card overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-primary/10 transition-colors"
              >
                <h3 className="font-semibold text-foreground text-sm sm:text-base">{faq.question}</h3>
                {openItems[index] ? (
                  <ChevronUp className="w-4 h-4 text-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-foreground" />
                )}
              </button>
              {openItems[index] && (
                <div className="px-4 pb-3">
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;

