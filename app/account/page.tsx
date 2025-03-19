import { Metadata } from "next";
import { Container } from "@/components/Container";
import { MyImages } from "@/components/gallery/MyImages";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "My Account - Gemma AI Image Editor",
  description: "View and manage your saved images",
};

export default async function AccountPage() {
  // Get auth session and user
  const { userId } = auth();
  const user = await currentUser();

  // If not authenticated, redirect to home page
  if (!userId || !user) {
    redirect("/");
  }

  return (
    <Container>
      <div className="py-10 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter">My Account</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.firstName || user.emailAddresses[0]?.emailAddress.split('@')[0]}
          </p>
        </div>
        
        <MyImages userEmail={user.emailAddresses[0]?.emailAddress} />
      </div>
    </Container>
  );
} 