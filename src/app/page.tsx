'use client'

import React, { useState } from 'react'
import { 
  Menu, 
  X, 
  Zap, 
  ArrowRight, 
  Play, 
  TrendingUp, 
  Users, 
  Shield, 
  Smartphone, 
  BarChart3, 
  Globe, 
  Rocket, 
  Star, 
  Check,
  ChevronDown,
  Twitter,
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const router = useRouter()

  const features = [
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Lightning Fast Setup",
      description: "Get your store online in under 5 minutes with our AI-powered setup wizard."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Bank-level security with SSL certificates, PCI compliance, and fraud protection."
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Optimized",
      description: "Responsive themes that look perfect on every device and screen size."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Advanced Analytics",
      description: "Deep insights into customer behavior, sales trends, and performance metrics."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Reach",
      description: "Multi-currency support, international shipping, and localization tools."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI-Powered Tools",
      description: "Smart recommendations, automated marketing, and intelligent inventory management."
    }
  ]

  const plans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for new entrepreneurs",
      features: [
        "Unlimited products",
        "Basic analytics",
        "Standard themes",
        "24/7 support",
        "SSL certificate"
      ]
    },
    {
      name: "Professional",
      price: "$79",
      description: "For growing businesses",
      features: [
        "Everything in Starter",
        "Advanced analytics",
        "Premium themes",
        "Abandoned cart recovery",
        "Professional reports",
        "Gift cards"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$299",
      description: "For large-scale operations",
      features: [
        "Everything in Professional",
        "Custom development",
        "Priority support",
        "Advanced automation",
        "Custom integrations",
        "Dedicated account manager"
      ]
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, StyleCraft",
      content: "CommerceForge transformed our online presence. Sales increased by 300% in just 6 months.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Founder, TechGear",
      content: "The AI-powered analytics helped us understand our customers better than ever before.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Owner, Artisan Goods",
      content: "Setup was incredibly easy. I had my store running in less than an hour!",
      rating: 5
    }
  ]

  const faqs = [
    {
      question: "How long does it take to set up my store?",
      answer: "Most users have their store up and running in under 5 minutes using our AI-powered setup wizard."
    },
    {
      question: "Can I customize my store design?",
      answer: "Absolutely! We offer dozens of professional themes and full customization options to match your brand."
    },
    {
      question: "What payment methods do you support?",
      answer: "We support all major payment gateways including PayPal, Stripe, Square, and 100+ local payment methods."
    },
    {
      question: "Is there a transaction fee?",
      answer: "No hidden transaction fees! You only pay the standard processing fees from your chosen payment provider."
    }
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CommerceForge</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={(e) => handleNavClick(e, 'features')} className="text-slate-300 hover:text-white transition-colors">Features</button>
              <button onClick={(e) => handleNavClick(e, 'pricing')} className="text-slate-300 hover:text-white transition-colors">Pricing</button>
              <button onClick={(e) => handleNavClick(e, 'testimonials')} className="text-slate-300 hover:text-white transition-colors">Success Stories</button>
              <button onClick={(e) => handleNavClick(e, 'support')} className="text-slate-300 hover:text-white transition-colors">Support</button>
            </nav>

            {/* Desktop CTA */}
             <div className="hidden md:flex items-center space-x-4">
              <button
                className="text-slate-300 hover:text-white transition-colors"
                onClick={() => router.push('/sign-in')}
              >
                Sign In
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all transform hover:scale-105">
                Start Free Trial
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-slate-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800 rounded-lg mt-2">
                <button onClick={(e) => handleNavClick(e, 'features')} className="block w-full text-left px-3 py-2 text-slate-300 hover:text-white">Features</button>
                <button onClick={(e) => handleNavClick(e, 'pricing')} className="block w-full text-left px-3 py-2 text-slate-300 hover:text-white">Pricing</button>
                <button onClick={(e) => handleNavClick(e, 'testimonials')} className="block w-full text-left px-3 py-2 text-slate-300 hover:text-white">Success Stories</button>
                <button onClick={(e) => handleNavClick(e, 'support')} className="block w-full text-left px-3 py-2 text-slate-300 hover:text-white">Support</button>
                <div className="border-t border-slate-700 pt-2">
                  <button
                    className="block w-full text-left px-3 py-2 text-slate-300 hover:text-white"
                    onClick={() => {
                      setIsMenuOpen(false)
                      router.push('/sign-in')
                    }}
                  >
                    Sign In
                  </button>
                  <button className="block w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-3 py-2 rounded-lg mt-2 hover:from-purple-700 hover:to-cyan-700">
                    Start Free Trial
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 pt-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2">
                <Zap className="h-4 w-4 text-purple-400" />
                <span className="text-purple-300 text-sm">Next-Gen E-commerce Platform</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Build Your
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> Digital Empire </span>
                  in Minutes
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                  Transform your business with our cutting-edge e-commerce platform. From AI-powered insights to seamless integrations, we provide everything you need to dominate your market.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 py-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">500K+</div>
                  <div className="text-slate-400 text-sm">Active Stores</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">$2.5B+</div>
                  <div className="text-slate-400 text-sm">Revenue Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-slate-400 text-sm">Uptime</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="border border-slate-600 text-white px-8 py-4 rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl p-8 backdrop-blur-sm border border-slate-700">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-500 w-3 h-3 rounded-full"></div>
                    <div className="text-slate-300">Your Store Dashboard</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-green-400 mb-2" />
                      <div className="text-sm text-slate-400">Revenue</div>
                      <div className="text-xl font-bold">$125,430</div>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <Users className="h-8 w-8 text-purple-400 mb-2" />
                      <div className="text-sm text-slate-400">Customers</div>
                      <div className="text-xl font-bold">8,247</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need to <span className="text-purple-400">Succeed</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our platform combines powerful features with intuitive design to help you build, grow, and scale your online business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all hover:transform hover:scale-105">
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple, <span className="text-cyan-400">Transparent</span> Pricing
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Choose the perfect plan for your business. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative bg-slate-900/50 p-8 rounded-xl border ${plan.popular ? 'border-purple-500' : 'border-slate-700'} hover:border-purple-500/50 transition-all`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-2">
                    {plan.price}
                    <span className="text-lg text-slate-400">/month</span>
                  </div>
                  <p className="text-slate-300">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg transition-all ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700' 
                    : 'border border-slate-600 text-white hover:bg-slate-800'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Trusted by <span className="text-purple-400">500,000+</span> Businesses
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              See what our customers are saying about their experience with CommerceForge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-slate-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="support" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked <span className="text-cyan-400">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-700 rounded-lg">
                <button
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-cyan-900/50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Build Your Empire?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful entrepreneurs who chose CommerceForge to power their online business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all transform hover:scale-105">
              Start Your Free Trial
            </button>
            <button className="border border-slate-600 text-white px-8 py-4 rounded-lg hover:bg-slate-800 transition-all">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">CommerceForge</span>
              </div>
              <p className="text-slate-400">
                Empowering entrepreneurs to build successful online businesses with cutting-edge technology.
              </p>
              <div className="flex space-x-4">
                <button aria-label="Twitter">
                  <Twitter className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                </button>
                <button aria-label="Facebook">
                  <Facebook className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                </button>
                <button aria-label="Instagram">
                  <Instagram className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                </button>
                <button aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                </button>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><button className="text-slate-400 hover:text-white transition-colors">Features</button></li>
                <li><button className="text-slate-400 hover:text-white transition-colors">Pricing</button></li>
                <li><button className="text-slate-400 hover:text-white transition-colors">Templates</button></li>
                <li><button className="text-slate-400 hover:text-white transition-colors">Integrations</button></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><button className="text-slate-400 hover:text-white transition-colors">Help Center</button></li>
                <li><button className="text-slate-400 hover:text-white transition-colors">Documentation</button></li>
                <li><button className="text-slate-400 hover:text-white transition-colors">Community</button></li>
                <li><button className="text-slate-400 hover:text-white transition-colors">Contact Us</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><button className="text-slate-400 hover:text-white transition-colors">About Us</button></li>
                <li><button className="text-slate-400 hover:text-white transition-colors">Careers</button></li>
                <li><button className="text-slate-400 hover:text-white transition-colors">Press</button></li>
                <li><button className="text-slate-400 hover:text-white transition-colors">Partners</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400">© 2025 CommerceForge. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <button className="text-slate-400 hover:text-white transition-colors">Privacy Policy</button>
                <button className="text-slate-400 hover:text-white transition-colors">Terms of Service</button>
                <button className="text-slate-400 hover:text-white transition-colors">Cookie Policy</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}