 import { Container } from "@/components/Container";

export const metadata = {
  title: "Terms of Service | Gemma AI",
  description: "The terms and conditions for using Gemma AI's image editing services"
};

export default function TermsOfServicePage() {
  return (
    <div className="py-16 bg-background">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-muted-foreground">Last updated: March 20, 2025</p>
            
            <div className="mt-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p>
                  Welcome to Gemma AI. These Terms of Service ("Terms") govern your use of our website, applications, 
                  and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound 
                  by these Terms and our Privacy Policy.
                </p>
                <p className="mt-2">
                  Please read these Terms carefully before using our Services. If you do not agree to these Terms, 
                  you may not access or use our Services.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li><strong>"Gemma AI"</strong>, <strong>"we"</strong>, <strong>"us"</strong>, or <strong>"our"</strong> refers to the provider of the Services.</li>
                  <li><strong>"User"</strong>, <strong>"you"</strong>, or <strong>"your"</strong> refers to any individual or entity that uses our Services.</li>
                  <li>
                    <strong>"Content"</strong> refers to images, photos, text, graphics, logos, and other material 
                    that may be uploaded, edited, or created using our Services.
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
                <p>
                  To use certain features of our Services, you may need to create an account. When you create an account, 
                  you agree to provide accurate and complete information. You are responsible for maintaining the security 
                  of your account credentials and for all activities that occur under your account.
                </p>
                <p className="mt-2">
                  We reserve the right to suspend or terminate accounts that violate these Terms or that have been 
                  inactive for an extended period.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Subscription and Payments</h2>
                <p>
                  Some of our Services may require payment of fees. All fees are in US dollars and are non-refundable 
                  except as expressly provided in these Terms.
                </p>
                <p className="mt-2">
                  For subscription-based Services, you agree to pay all fees associated with your selected subscription plan. 
                  Subscriptions automatically renew unless canceled by you at least 24 hours before the end of the 
                  current billing period.
                </p>
                <p className="mt-2">
                  We may change our fees at any time by giving you notice through our Services. If you continue to use 
                  our Services after a fee change, you accept the new fees.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Content Ownership and Usage Rights</h2>
                <p>
                  You retain all ownership rights to the Content you upload to our Services. By uploading Content, 
                  you grant us a non-exclusive, worldwide, royalty-free license to use, store, display, and modify 
                  your Content solely for the purpose of providing the Services to you.
                </p>
                <p className="mt-2">
                  For AI-generated or AI-edited Content, you are granted a worldwide, non-exclusive, and perpetual 
                  right to use such Content for personal or commercial purposes, subject to the limitations below.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Prohibited Uses</h2>
                <p>You agree not to use our Services to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on the intellectual property rights of others</li>
                  <li>Create, upload, or distribute content that is illegal, harmful, threatening, abusive, or defamatory</li>
                  <li>
                    Generate images that depict realistic individuals without proper consent, including deepfakes 
                    or images designed to impersonate specific real people
                  </li>
                  <li>Create content that contains hate speech, violence, or explicit sexual content</li>
                  <li>Attempt to interfere with or disrupt the Services or servers</li>
                  <li>Engage in any activity that could harm minors</li>
                  <li>Attempt to gain unauthorized access to our Services or user accounts</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">7. AI Model Usage and Limitations</h2>
                <p>
                  Our Services use Google Gemini Flash AI technology to enable image editing and generation features. 
                  The AI models have limitations, and we do not guarantee that the Services will be error-free or 
                  will produce specific results.
                </p>
                <p className="mt-2">
                  We are not responsible for any Content created or edited by our AI models, and you are solely responsible 
                  for reviewing and ensuring that AI-generated or AI-edited Content meets your requirements and 
                  complies with applicable laws.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
                <p>
                  All intellectual property rights in the Services, including software, features, and technology, 
                  are owned by Gemma AI or its licensors. Nothing in these Terms grants you the right to use our 
                  trademarks, logos, domain names, or other distinctive brand features without our prior written consent.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
                <p>
                  We may terminate or suspend your access to our Services, without prior notice or liability, 
                  for any reason, including if you breach these Terms.
                </p>
                <p className="mt-2">
                  You may terminate your account at any time by contacting us or using the account deletion feature. 
                  Upon termination, your right to use the Services will immediately cease.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Disclaimer of Warranties</h2>
                <p>
                  THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS 
                  OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
                  PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p className="mt-2">
                  WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE 
                  CORRECTED, OR THAT THE SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR 
                  OTHER HARMFUL COMPONENTS.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Limitation of Liability</h2>
                <p>
                  IN NO EVENT SHALL GEMMA AI BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR 
                  PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER 
                  INTANGIBLE LOSSES, RESULTING FROM (i) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE 
                  SERVICES; (ii) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES; (iii) ANY CONTENT OBTAINED 
                  FROM THE SERVICES; AND (iv) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">12. Indemnification</h2>
                <p>
                  You agree to defend, indemnify, and hold harmless Gemma AI and its affiliates, officers, directors, 
                  employees, and agents, from and against any and all claims, damages, obligations, losses, liabilities, 
                  costs or debt, and expenses (including but not limited to attorney's fees) arising from: (i) your use 
                  of and access to the Services; (ii) your violation of these Terms; (iii) your violation of any third 
                  party right, including without limitation any copyright, property, or privacy right; or (iv) any claim 
                  that your Content caused damage to a third party.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
                <p>
                  We may modify these Terms at any time by posting the revised terms on our website. Your continued use 
                  of the Services after the effective date of the revised Terms constitutes your acceptance of the changes.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">14. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the State of California, 
                  without regard to its conflict of law provisions. Any dispute arising under these Terms shall be 
                  resolved exclusively in the state or federal courts located in San Francisco County, California.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">15. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="mt-2">
                  <p><strong>Email:</strong> <a href="mailto:legal@gemma-ai.com" className="text-primary hover:underline">legal@gemma-ai.com</a></p>
                  <p><strong>Address:</strong> 123 AI Innovation Drive, Suite 200, San Francisco, CA 94107, USA</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}