"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Container } from "@/components/Container";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image: string;
  delay: number;
}

const Testimonial = ({ quote, author, role, image, delay }: TestimonialProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <div 
      ref={ref}
      className="bg-card rounded-xl p-6 border shadow-sm relative"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s ease-out ${delay}s`,
      }}
    >
      {/* Quote icon */}
      <div className="text-primary/20 absolute -top-4 -left-2">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.0883 4.5C8.4783 4.5 6.33301 6.645 6.33301 9.255V14.5H11.583V9.255H9.05801C9.05801 8.07 9.90301 7.11 11.0883 7.11V4.5ZM18.333 7.11V4.5C15.723 4.5 13.583 6.645 13.583 9.255V14.5H18.833V9.255H16.303C16.303 8.07 17.148 7.11 18.333 7.11Z" />
        </svg>
      </div>
      
      <blockquote className="text-lg mb-6 relative z-10">
        "{quote}"
      </blockquote>
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
          <img 
            src={image} 
            alt={author}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=random`;
            }}
          />
        </div>
        <div>
          <div className="font-medium">{author}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialsSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  
  const testimonials = [
    {
      quote: "This AI image editor completely transformed my workflow. What used to take me hours now takes minutes, with even better results.",
      author: "Alex Johnson",
      role: "Professional Photographer",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "The generative fill feature is mind-blowing. I can remove unwanted objects from my travel photos with just a few clicks.",
      author: "David Chen",
      role: "Travel Blogger",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "As a graphic designer, I'm amazed by the precision and time-saving capabilities. The smart filters are especially impressive.",
      author: "Sarah Williams",
      role: "UI/UX Designer",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      quote: "I've tried many image editors, but this one stands out because of how intuitive it is. The AI features feel like magic!",
      author: "Michael Rodriguez",
      role: "Content Creator",
      image: "https://randomuser.me/api/portraits/men/79.jpg"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/3 blur-3xl"></div>
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
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover how our AI image editor is changing the way creators work worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              image={testimonial.image}
              delay={0.1 + index * 0.05}
            />
          ))}
        </div>
      </Container>
    </section>
  );
} 