import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-70px)] bg-background/50 flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full max-w-6xl mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-card text-sm font-medium mb-4">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Powered by Google Gemini Flash
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-primary mb-6">
            Premium AI Image Editing
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Transform ordinary photos into extraordinary visual experiences with state-of-the-art AI tools
          </p>
          
          <div className="flex justify-center gap-4">
            <Link href="/edit">
              <Button size="lg" className="px-8 py-3 min-w-[180px]">
                Start Editing
              </Button>
            </Link>
            <Link href="/gallery">
              <Button variant="outline" size="lg" className="px-8 py-3 min-w-[180px]">
                View Gallery
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-6xl mx-auto px-4 py-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M11 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"/><path d="M18.42 9.61a2.1 2.1 0 1 1 2.97 2.97L16.95 17 13 18l.99-3.95 4.43-4.44z"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Image Editing</h3>
            <p className="text-muted-foreground">Effortlessly edit photos with intelligent AI tools that understand your vision</p>
          </div>
          
          <div className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M18 16.14h-7.5m7.5-9.54H7.35m0 0h16.2M7.35 6.6h.01M3.44 6.6h.01M7.35 19.4l-3.9-3.9 3.9-3.9"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Generative Fill</h3>
            <p className="text-muted-foreground">Remove objects or add new elements with context-aware generative techniques</p>
          </div>
          
          <div className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="M16 12h-6.5a2 2 0 1 0 0 4H12"/><path d="m9 8 3-3 3 3"/><path d="m15 16-3 3-3-3"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Filters</h3>
            <p className="text-muted-foreground">Apply stunning filters that adapt to your image content for perfect results</p>
          </div>
        </div>
      </div>
    </div>
  );
}
