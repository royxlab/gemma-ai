import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI("AIzaSyCvpxkr8M_sFTAcHzLL4eGz8fkIyKHePUM");

// Model configurations
const IMAGE_GENERATION_MODEL = "gemini-2.0-flash-exp-image-generation";

/**
 * Apply an AI filter to an image
 * @param imageBase64 - Base64 encoded image
 * @param filterType - Type of filter to apply
 * @param prompt - Additional context for the filter
 */
export async function applyAiFilter(
  imageBase64: string,
  filterType: string,
  prompt?: string
) {
  try {
    const filterPrompts = {
      daytime: "Transform this image to look like it was taken during bright daylight.",
      night: "Transform this image to look like it was taken at night with moonlight.",
      autumn: "Apply autumn colors and atmosphere to this image.",
      winter: "Make this image look like it was taken in winter with a cold atmosphere.",
      summer: "Apply a vibrant summer feel to this image with warm, bright colors.",
      vintage: "Transform this image to have a vintage, retro film look from the 1970s.",
      noir: "Convert this image to black and white with high contrast like film noir.",
      hdr: "Enhance this image with HDR effects for vibrant colors and high dynamic range.",
      "infrastructure-aging": "Transform this infrastructure to look aged, weathered, and deteriorated over several decades. Add rust, cracks, wear and tear, and signs of neglect.",
    };

    const filterPrompt = filterPrompts[filterType as keyof typeof filterPrompts] || 
      "Apply an artistic filter to this image.";
    
    const userPrompt = prompt ? `${filterPrompt} ${prompt}` : filterPrompt;

    const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp-image-generation",
    generationConfig: {
        responseModalities: ['Text', 'Image']
    },
  });

    const contents = [
      { text: userPrompt },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64.replace(/^data:image\/\w+;base64,/, ""),
        },
      },
    ];

    const response = await model.generateContent(contents);
    
    // Extract the image from the response
    for (const part of response.response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/jpeg;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image generated in response");
  } catch (error) {
    console.error("Error applying AI filter:", error);
    throw error;
  }
}

/**
 * Apply generative fill to an image using a mask
 * @param imageBase64 - Base64 encoded image
 * @param maskBase64 - Base64 encoded mask (red areas indicate where to fill)
 * @param prompt - Description of what to fill the masked area with
 */
export async function applyGenerativeFill(
  imageBase64: string,
  maskBase64: string,
  prompt: string
) {
  try {
    const defaultPrompt = "Replace the masked (red) area in this image";
    const userPrompt = prompt 
      ? `${defaultPrompt} with ${prompt}` 
      : `${defaultPrompt} with appropriate content that matches the rest of the image.`;

    const model = genAI.getGenerativeModel({
      model: IMAGE_GENERATION_MODEL,
      generationConfig: {
        responseModalities: ["Text", "Image"],
      },
    });

    const contents = [
      { text: userPrompt },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64.replace(/^data:image\/\w+;base64,/, ""),
        },
      },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: maskBase64.replace(/^data:image\/\w+;base64,/, ""),
        },
      },
    ];

    const response = await model.generateContent(contents);
    
    // Extract the image from the response
    for (const part of response.response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/jpeg;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image generated in response");
  } catch (error) {
    console.error("Error applying generative fill:", error);
    throw error;
  }
}

/**
 * Generate a new image based on a prompt
 * @param prompt - Text description of the image to generate
 */
export async function generateImage(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: IMAGE_GENERATION_MODEL,
      generationConfig: {
        responseModalities: ["Text", "Image"],
      },
    });

    const response = await model.generateContent(prompt);
    
    // Extract the image from the response
    for (const part of response.response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/jpeg;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image generated in response");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
} 