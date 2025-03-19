import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto my-16 text-center space-y-8">
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Premium AI-powered Image Editing
        </h2>
        <p className="text-xl text-muted-foreground">
          Transform your images with advanced AI editing tools
        </p>
        <div className="flex justify-center">
          <Link href="/edit">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
