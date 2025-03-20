"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { Container } from "@/components/Container";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <div 
      ref={ref}
      className="bg-card rounded-xl p-6 border shadow-sm group hover:shadow-md transition-all duration-300"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.5s ease-out ${delay}s`,
      }}
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default function FeaturesSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M11 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"/>
          <path d="M18.42 9.61a2.1 2.1 0 1 1 2.97 2.97L16.95 17 13 18l.99-3.95 4.43-4.44z"/>
        </svg>
      ),
      title: "AI Image Editing",
      description: "Effortlessly edit photos with intelligent AI tools that understand your vision"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M18 16.14h-7.5m7.5-9.54H7.35m0 0h16.2M7.35 6.6h.01M3.44 6.6h.01M7.35 19.4l-3.9-3.9 3.9-3.9"/>
        </svg>
      ),
      title: "Generative Fill",
      description: "Remove objects or add new elements with context-aware generative techniques"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <circle cx="12" cy="12" r="10"/>
          <path d="M16 12h-6.5a2 2 0 1 0 0 4H12"/>
          <path d="m9 8 3-3 3 3"/>
          <path d="m15 16-3 3-3-3"/>
        </svg>
      ),
      title: "Smart Filters",
      description: "Apply stunning filters that adapt to your image content for perfect results"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M3 9h18"/>
          <path d="M9 21V9"/>
        </svg>
      ),
      title: "Advanced Layout",
      description: "Create compositions and layouts that are pixel-perfect with intelligent alignment"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M12 3v12l-4-2-4 2V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1Z"/>
          <path d="M20 3v12l-4-2-4 2V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1Z"/>
          <path d="M12 15v7"/>
        </svg>
      ),
      title: "Smart Templates",
      description: "Choose from a library of professional templates or create your own custom designs"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <circle cx="12" cy="12" r="10"/>
          <path d="m16 16-4-4V6"/>
        </svg>
      ),
      title: "Real-time Edits",
      description: "See changes instantly as you edit, with no lag or waiting for processing"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[30%] -left-[15%] w-[40%] h-[40%] rounded-full bg-primary/3 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div 
          ref={headerRef}
          className="max-w-3xl mx-auto text-center mb-16"
          style={{
            opacity: isHeaderInView ? 1 : 0,
            transform: isHeaderInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease-out",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful AI Features
          </h2>
          <p className="text-lg text-muted-foreground">
            Our editing tools combine the latest in AI technology with an intuitive interface
            to give you professional results in minutes, not hours.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 + index * 0.05}
            />
          ))}
        </div>
      </Container>
    </section>
  );
} 