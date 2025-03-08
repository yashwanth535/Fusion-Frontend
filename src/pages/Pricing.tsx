import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChefHat, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const { user } = useAuth();

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for casual cooking enthusiasts',
      price: {
        monthly: 0,
        annually: 0
      },
      features: [
        'Create up to 5 recipes',
        'Basic recipe search',
        'Community recipe access',
        'Standard support',
      ],
      notIncluded: [
        'AI recipe generation',
        'Nutritional analysis',
        'Meal planning tools',
        'Priority support',
      ],
      buttonText: user ? 'Current Plan' : 'Get Started',
      highlighted: false,
      ctaColor: 'bg-black'
    },
    {
      name: 'Pro',
      description: 'For serious home cooks and food bloggers',
      price: {
        monthly: 9.99,
        annually: 7.99
      },
      features: [
        'Unlimited recipe creation',
        'Advanced recipe search',
        'Community recipe access',
        'AI recipe generation (5/month)',
        'Basic nutritional analysis',
        'Priority support',
      ],
      notIncluded: [
        'Advanced nutritional analysis',
        'Meal planning tools',
      ],
      buttonText: 'Subscribe Now',
      highlighted: true,
      ctaColor: 'bg-primary'
    },
    {
      name: 'Chef',
      description: 'For professional chefs and culinary businesses',
      price: {
        monthly: 19.99,
        annually: 16.99
      },
      features: [
        'Unlimited recipe creation',
        'Advanced recipe search',
        'Community recipe access',
        'AI recipe generation (unlimited)',
        'Advanced nutritional analysis',
        'Meal planning tools',
        'Recipe scaling for restaurants',
        'Dedicated support',
        'White-label option',
      ],
      notIncluded: [],
      buttonText: 'Subscribe Now',
      highlighted: false,
      ctaColor: 'bg-black'
    }
  ];

  return (
    <div className="min-h-screen bg-white-100">
      {/* Hero Section */}
      <section className="pink_container">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <ChefHat className="h-16 w-16 text-white" />
          </div>
          <h1 className="heading">
            Choose Your Plan
          </h1>
          <p className="sub-heading">
            Unlock premium features and take your cooking to the next level
          </p>
        </div>
      </section>

      {/* Pricing Toggle */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 text-center">
        <div className="inline-flex items-center bg-white border-[3px] border-black rounded-full p-1">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2 rounded-full text-16-medium transition-colors ${
              !isAnnual ? 'bg-primary text-black' : 'bg-transparent text-black-100'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2 rounded-full text-16-medium transition-colors ${
              isAnnual ? 'bg-primary text-black' : 'bg-transparent text-black-100'
            }`}
          >
            Annually <span className="text-sm font-bold text-primary-600">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 mt-10 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`pricing-card ${plan.highlighted ? 'pricing-card-highlighted' : ''}`}
            >
              <div className="mb-8">
                <h3 className="text-24-black mb-2">{plan.name}</h3>
                <p className="text-16-medium text-black-100">{plan.description}</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-end">
                  <span className="text-30-bold">
                    ${isAnnual ? plan.price.annually : plan.price.monthly}
                  </span>
                  <span className="text-16-medium text-black-100 ml-2 mb-1">
                    / month
                  </span>
                </div>
                {isAnnual && plan.price.annually > 0 && (
                  <p className="text-sm text-primary-600 font-medium mt-1">
                    Billed annually (${(plan.price.annually * 12).toFixed(2)}/year)
                  </p>
                )}
              </div>
              
              <div className="mb-8">
                <h4 className="text-16-medium font-semibold mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-16-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {plan.notIncluded.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-16-medium font-semibold mb-4 text-black-100">Not included:</h4>
                  <ul className="space-y-3">
                    {plan.notIncluded.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <X className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-16-medium text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-auto">
                <Link
                  to={user ? '/dashboard' : '/sign-up'}
                  className={`pricing-cta-button ${plan.ctaColor}`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-white py-16 border-t-[3px] border-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-30-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            <div className="faq-item">
              <h3 className="text-20-medium mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-16-medium text-black-100">
                Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle.
              </p>
            </div>
            
            <div className="faq-item">
              <h3 className="text-20-medium mb-2">What payment methods do you accept?</h3>
              <p className="text-16-medium text-black-100">
                We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through Stripe.
              </p>
            </div>
            
            <div className="faq-item">
              <h3 className="text-20-medium mb-2">Is there a free trial?</h3>
              <p className="text-16-medium text-black-100">
                Yes, all paid plans come with a 14-day free trial. No credit card required until you decide to continue.
              </p>
            </div>
            
            <div className="faq-item">
              <h3 className="text-20-medium mb-2">What happens to my recipes if I cancel?</h3>
              <p className="text-16-medium text-black-100">
                If you downgrade to the Free plan, you'll still have access to your first 5 recipes. All other recipes will be archived and can be accessed again if you resubscribe.
              </p>
            </div>
            
            <div className="faq-item">
              <h3 className="text-20-medium mb-2">Do you offer discounts for teams or educational institutions?</h3>
              <p className="text-16-medium text-black-100">
                Yes, we offer special pricing for teams, schools, and culinary institutions. Please contact our sales team for more information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-30-bold mb-4">Ready to elevate your cooking experience?</h2>
          <p className="text-20-medium mb-8">Join thousands of chefs and food enthusiasts who are creating amazing recipes with Flavour Fusion.</p>
          <Link to="/sign-up" className="startup-card_btn bg-black text-white py-4 px-8 text-16-medium">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing; 