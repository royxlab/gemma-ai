"use client";

import { useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { Container } from "@/components/Container";

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  isActive: boolean;
  onHover: () => void;
}

const Step = ({ number, title, description, icon, delay, isActive, onHover }: StepProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div 
      ref={ref}
      className={`relative ${isActive ? 'z-20' : 'z-10'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay }}
      onHoverStart={onHover}
    >
      <div 
        className={`
          relative flex flex-col items-center text-center max-w-xs mx-auto
          transition-all duration-300 ease-in-out
          ${isActive ? 'scale-110' : 'scale-100 hover:scale-105'}
        `}
      >
        {/* Connected line to next step */}
        {number < 4 && (
          <div className="absolute top-1/2 left-[calc(100%+0.5rem)] w-8 md:w-16 h-0.5 bg-primary/30 hidden lg:block"></div>
        )}
        
        {/* Step content */}
        <div 
          className={`
            group w-full p-6 rounded-2xl backdrop-blur-md
            border transition-all duration-300
            ${isActive 
              ? 'bg-primary/10 border-primary/20 shadow-lg shadow-primary/10' 
              : 'bg-card/70 border-border hover:border-primary/20 shadow-sm'
            }
          `}
        >
          {/* Icon with circular background */}
          <div className="mb-5">
            <div 
              className={`
                relative size-16 mx-auto rounded-full flex items-center justify-center
                transition-all duration-300
                ${isActive 
                  ? 'bg-primary/20' 
                  : 'bg-primary/10 group-hover:bg-primary/15'
                }
              `}
            >
              {/* Pulsing ring */}
              <div 
                className={`
                  absolute size-full rounded-full
                  transition-all duration-300
                  ${isActive ? 'animate-pulse-slow bg-primary/10' : 'bg-transparent'}
                `}
              ></div>
              
              {/* Number indicator */}
              <div 
                className={`
                  absolute -top-1 -right-1 size-7 rounded-full 
                  flex items-center justify-center text-sm font-semibold 
                  transition-all duration-300
                  ${isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card text-foreground border border-primary/30 group-hover:border-primary/50'
                  }
                `}
              >
                {number}
              </div>
              
              <div className={`text-primary transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {icon}
              </div>
            </div>
          </div>
          
          {/* Title with gradient on active */}
          <h3 
            className={`
              text-xl font-semibold mb-3 transition-all duration-300
              ${isActive 
                ? 'bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70' 
                : 'text-foreground group-hover:text-primary'
              }
            `}
          >
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-muted-foreground leading-relaxed group-hover:text-muted-foreground/90 transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(1);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  
  const steps = [
    {
      number: 1,
      title: "Upload Your Image",
      description: "Start by uploading the photo you want to edit. We support all major file formats including JPG, PNG, WebP, and more.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/>
          <path d="m9 11 3 3L22 4"/>
        </svg>
      ),
    },
    {
      number: 2,
      title: "Select Your Editing Tools",
      description: "Choose from our powerful editing tools – from basic adjustments to AI-powered transformations. Our intuitive interface makes selection easy.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 22H4a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h11"/>
          <path d="M21 9V6.5a2.5 2.5 0 0 0-5 0V9"/>
          <path d="M21 2v7h-5V2"/>
          <path d="M22 16.5v3c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-3c0-.8.7-1.5 1.5-1.5h7c.8 0 1.5.7 1.5 1.5Z"/>
        </svg>
      ),
    },
    {
      number: 3,
      title: "Apply AI Enhancements",
      description: "Use the power of Google Gemini Flash to transform your images with context-aware AI that understands exactly what you're trying to achieve.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6.5v11a1.5 1.5 0 0 1-3 0v-8a1.5 1.5 0 0 0-3 0v8a1.5 1.5 0 0 1-3 0v-8a1.5 1.5 0 0 0-3 0v8a1.5 1.5 0 0 1-3 0v-11a1.5 1.5 0 0 1 3 0"/>
          <path d="M16 6.5V5a2.5 2.5 0 0 0-5 0v1.5"/>
        </svg>
      ),
    },
    {
      number: 4,
      title: "Review and Export",
      description: "Preview your edits in real-time, make any final adjustments, then export your masterpiece in your preferred resolution and format.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4v16"/>
          <path d="M9 4v16"/>
          <path d="M14 4v16"/>
          <path d="M19 4v16"/>
          <path d="M4 9h16"/>
          <path d="M4 14h16"/>
        </svg>
      ),
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* 3D effect background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/20 to-background"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-[10%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-[10%] w-[25%] h-[25%] rounded-full bg-primary/5 blur-3xl animate-pulse-slow"></div>
      </div>
      
      <Container className="relative z-10">
        <motion.div 
          ref={headerRef}
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Our intuitive workflow makes professional image editing simple and accessible for everyone
          </p>
        </motion.div>

        {/* Simple Steps Layout (Similar to the image provided) */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`relative bg-card rounded-xl p-6 border shadow-sm ${
                  index === 2 ? 'md:relative md:z-10' : ''
                }`}
                onMouseEnter={() => setActiveStep(step.number)}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Circle with icon */}
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="text-primary">
                        {step.icon}
                      </div>
                    </div>
                    
                    {/* Number badge */}
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-card text-foreground border border-primary/20 flex items-center justify-center text-sm font-semibold">
                      {step.number}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Interactive illustration - hidden on mobile, optional visual enhancement */}
        <div className="hidden">
          {/* Editable visual preview that changes based on step */}
          <div className="hidden md:block relative h-[280px] mb-16">
            {/* Step visuals here - these are hidden now */}
          </div>

          {/* Workflow steps in a horizontal layout - advanced version (hidden) */}
          <div className="hidden">
            {steps.map((step, index) => (
              <Step
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
                delay={0.1 + index * 0.1}
                isActive={activeStep === step.number}
                onHover={() => setActiveStep(step.number)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
} 