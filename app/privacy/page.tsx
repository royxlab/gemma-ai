import { Container } from "@/components/Container";

export const metadata = {
  title: "Privacy Policy | Gemma AI",
  description: "Learn how Gemma AI protects your privacy and handles your data"
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 bg-background">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-muted-foreground">Last updated: March 20, 2025</p>
            
            <div className="mt-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p>
                  Welcome to Gemma AI. We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy explains how we collect, use, and safeguard your information when you use our 
                  AI image editing service.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Data We Collect</h2>
                <p>We may collect the following types of information:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    <strong>Account Information:</strong> When you register, we collect your name, email address, 
                    and authentication information.
                  </li>
                  <li>
                    <strong>Images and Content:</strong> The photos and images you upload for editing or generation.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Information about how you interact with our service, including features 
                    used and time spent on the platform.
                  </li>
                  <li>
                    <strong>Device Information:</strong> Data about your device, operating system, browser type, 
                    and IP address.
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
                <p>We use your information for the following purposes:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>To provide, maintain, and improve our image editing services</li>
                  <li>To process and complete transactions</li>
                  <li>To send you technical notices, updates, and support messages</li>
                  <li>To respond to your comments and questions</li>
                  <li>To develop new products and services</li>
                  <li>To monitor and analyze trends and usage</li>
                  <li>To protect the security and integrity of our services</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Image Data and AI Training</h2>
                <p>
                  Our service uses Google Gemini Flash for AI-powered image editing. By default, your uploaded 
                  images are used only to provide the requested editing services and are not used to train AI models. 
                  You maintain ownership of your content at all times.
                </p>
                <p className="mt-2">
                  If you opt in to our data improvement program, your anonymized image data may be used to improve 
                  our AI capabilities. You can opt out of this program at any time through your account settings.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Data Sharing and Disclosure</h2>
                <p>We may share your information in the following situations:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    <strong>Service Providers:</strong> With third-party vendors who provide services on our behalf, 
                    such as cloud storage or payment processing.
                  </li>
                  <li>
                    <strong>Compliance with Laws:</strong> When required by applicable law, regulation, or legal process.
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.
                  </li>
                  <li>
                    <strong>With Your Consent:</strong> When you have given us explicit permission to share your data.
                  </li>
                </ul>
                <p className="mt-2">
                  We do not sell your personal information to third parties.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal data against 
                  unauthorized access, alteration, disclosure, or destruction. However, no method of transmission or 
                  storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
                <p>
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
                  privacy policy, unless a longer retention period is required by law. Edited images are stored in your 
                  account until you choose to delete them or close your account.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Your Rights</h2>
                <p>Depending on your location, you may have the following rights:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Rectify inaccurate or incomplete information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Restrict or object to processing of your data</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p className="mt-2">
                  To exercise these rights, please contact us at <a href="mailto:privacy@gemma-ai.com" className="text-primary hover:underline">privacy@gemma-ai.com</a>.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your country of residence. 
                  These countries may have different data protection laws. We ensure appropriate safeguards are in place 
                  to protect your data when transferred internationally.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. The updated version will be indicated by an 
                  updated "Last updated" date, and the revised policy will be effective immediately upon posting. 
                  We encourage you to review this privacy policy periodically.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
                <p>
                  If you have any questions about this privacy policy or our data practices, please contact us at:
                </p>
                <div className="mt-2">
                  <p><strong>Email:</strong> <a href="mailto:privacy@gemma-ai.com" className="text-primary hover:underline">privacy@gemma-ai.com</a></p>
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