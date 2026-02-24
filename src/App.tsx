import React from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { motion } from 'motion/react';
import { Leaf, ShieldCheck, Zap, Globe } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 flex flex-col gap-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-olive-900 tracking-tight">
              Grow Smarter with <span className="text-olive-600">AI Intelligence</span>
            </h2>
            <p className="text-lg text-olive-700 mt-4 font-medium">
              Your personal agricultural expert for crop diagnosis, pest management, and sustainable farming advice.
            </p>
          </motion.div>
        </section>

        {/* Chat Interface */}
        <section id="chat" className="w-full">
          <ChatInterface />
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Zap className="text-olive-600" />,
              title: "Instant Diagnosis",
              desc: "Upload photos of your crops for immediate pest and disease identification."
            },
            {
              icon: <ShieldCheck className="text-olive-600" />,
              title: "Expert Advice",
              desc: "Get science-backed recommendations for soil health and fertilization."
            },
            {
              icon: <Leaf className="text-olive-600" />,
              title: "Sustainable Practices",
              desc: "Learn about organic farming and eco-friendly pest control methods."
            },
            {
              icon: <Globe className="text-olive-600" />,
              title: "Global Knowledge",
              desc: "Access agricultural insights tailored to your local climate and crop types."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-olive-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-olive-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-olive-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-olive-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="bg-olive-900 rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-olive-600/20 blur-3xl rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-olive-400/10 blur-3xl rounded-full -ml-32 -mb-32"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Ready to transform your farm?</h2>
            <p className="text-olive-200 text-lg">
              Join thousands of farmers using AgroSolve AI to increase yields and protect their crops.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button className="bg-white text-olive-900 px-8 py-4 rounded-full font-bold hover:bg-olive-50 transition-colors">
                Get Started Now
              </button>
              <button className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-olive-50 border-t border-olive-200 py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-olive-600 p-1.5 rounded-full text-white">
                <Leaf size={18} />
              </div>
              <span className="text-xl font-serif font-bold text-olive-900">AgroSolve AI</span>
            </div>
            <p className="text-sm text-olive-600 max-w-sm">
              Empowering farmers with artificial intelligence to build a more sustainable and productive agricultural future.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-olive-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-olive-600">
              <li><a href="#" className="hover:text-olive-900">Features</a></li>
              <li><a href="#" className="hover:text-olive-900">Pricing</a></li>
              <li><a href="#" className="hover:text-olive-900">Mobile App</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-olive-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-olive-600">
              <li><a href="#" className="hover:text-olive-900">Documentation</a></li>
              <li><a href="#" className="hover:text-olive-900">Help Center</a></li>
              <li><a href="#" className="hover:text-olive-900">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-12 pt-8 border-t border-olive-200 text-center text-xs text-olive-400">
          © {new Date().getFullYear()} AgroSolve AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
