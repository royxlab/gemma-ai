"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5"></div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div 
          ref={ref}
          className="max-w-4xl mx-auto bg-card rounded-2xl p-8 md:p-12 border shadow-lg overflow-hidden relative"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease-out",
          }}
        >
          {/* Decorative element */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/10 blur-2xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-primary/10 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Images?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Start creating stunning visuals with our AI-powered editor. No complex software to learn, no expensive subscriptions.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link href="/edit">
                <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-base font-medium shadow-lg">
                  Start Editing Now
                </Button>
              </Link>
              <Link href="/gallery">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-base font-medium">
                  Browse Gallery
                </Button>
              </Link>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              No credit card required. Try our basic features for free.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
} 