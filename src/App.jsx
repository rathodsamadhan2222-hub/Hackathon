import { useEffect } from 'react';
import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import Problem         from './components/Problem';
import HowItWorks      from './components/HowItWorks';
import Features        from './components/Features';
import Dashboard       from './components/Dashboard';
import BusinessResults from './components/BusinessResults';
import Lifecycle       from './components/Lifecycle';
import Pricing         from './components/Pricing';
import SocialProof     from './components/SocialProof';
import FAQ             from './components/FAQ';
import Footer          from './components/Footer';
import './index.css';

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.10, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content">

        {/* 1. HERO — Big promise */}
        <Hero />

        {/* 2. PROBLEM — Why the status quo fails */}
        <Problem />

        {/* 3. HOW AI WORKS — The mechanism that solves it */}
        <HowItWorks />

        {/* 4. FEATURES — Every capability in detail */}
        <Features />

        {/* 5. DASHBOARD — Visual proof of the product */}
        <Dashboard />

        {/* 6. LIFECYCLE — Step-by-step data journey */}
        <Lifecycle />

        {/* 7. BUSINESS RESULTS — Hard numbers + bridge to Pricing */}
        <BusinessResults />

        {/* 8. PRICING — The purchase decision */}
        <Pricing />

        {/* 9. TESTIMONIALS — Social proof after the price reveal */}
        <SocialProof />

        {/* 10. FAQ — Last objection handling */}
        <FAQ />

      </main>
      <Footer />
    </>
  );
}
