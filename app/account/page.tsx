import { Metadata } from "next";
import { Container } from "@/components/Container";
import { MyImages } from "@/components/gallery/MyImages";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Account - Gemma AI Image Editor",
  description: "View and manage your saved images",
};

export default async function AccountPage() {
  // Get auth session and user
  const { userId } = await auth();
  const user = await currentUser();

  // If not authenticated, show sign-in prompt instead of redirecting
  if (!userId || !user) {
    return (
      <Container>
        <div className="py-10 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter">My Account</h1>
            <p className="text-muted-foreground mb-6">
              Please sign in to view your account and saved images
            </p>
            <div className="flex gap-4">
              <Link href="/sign-in">
                <Button className="bg-[#4870db] hover:bg-[#3a5dc3] text-white px-8">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8">Create Account</Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  // Safely extract user information
  const userName = user.firstName || 
                   user.username || 
                   (user.emailAddresses && user.emailAddresses[0]?.emailAddress?.split('@')[0]) || 
                   "there";
  
  const userEmail = user.emailAddresses && user.emailAddresses.length > 0 
                    ? user.emailAddresses[0].emailAddress 
                    : null;

  return (
    <Container>
      <div className="py-10 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter">My Account</h1>
          <p className="text-muted-foreground">
            Welcome back, {userName}
          </p>
        </div>
        
        {userEmail ? (
          <MyImages userEmail={userEmail} />
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
            <h3 className="font-medium">Email address not found</h3>
            <p className="text-sm mt-1">We couldn't retrieve your email address. Your Clerk account may need to be updated.</p>
          </div>
        )}
      </div>
    </Container>
  );
} 