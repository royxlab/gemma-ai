import { Metadata } from "next";
import { EditorInterface } from "@/components/editor/EditorInterface";

export const metadata: Metadata = {
  title: "Image Editor | Gemma AI",
  description: "Edit your images with the power of AI",
};

export default function EditPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Image Editor</h1>
        <p className="text-muted-foreground mt-1">Transform your images with AI-powered tools</p>
      </div>
      <EditorInterface />
    </div>
  );
}
