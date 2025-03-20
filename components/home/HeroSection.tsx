"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 50 
      }
    }
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background/90 backdrop-blur-sm"></div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-card border shadow-sm text-sm font-medium mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Powered by Google Gemini Flash
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 mb-6"
          >
            Premium AI <br className="sm:hidden" />
            Image Editing
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Transform ordinary photos into extraordinary visual experiences with state-of-the-art AI tools
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/edit">
              <Button size="lg" className="w-full sm:w-auto px-8 py-6 min-w-[180px] text-base font-medium shadow-lg hover:shadow-xl transition-all">
                Start Editing
              </Button>
            </Link>
            <Link href="/gallery">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 min-w-[180px] text-base font-medium backdrop-blur-sm border-primary/20 shadow-sm hover:shadow-md transition-all">
                View Gallery
              </Button>
            </Link>
          </motion.div>

          {/* Preview image */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-4xl rounded-xl overflow-hidden shadow-2xl border border-primary/10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
              <img 
                src="/images/hero-preview.jpg" 
                alt="AI Image Editor Interface" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=1664&auto=format&fit=crop";
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
} 