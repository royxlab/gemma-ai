import { Container } from "@/components/Container";

export const metadata = {
  title: "Cookie Policy | Gemma AI",
  description: "Information about how Gemma AI uses cookies and similar technologies"
};

export default function CookiePolicyPage() {
  return (
    <div className="py-16 bg-background">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-muted-foreground">Last updated: March 20, 2025</p>
            
            <div className="mt-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p>
                  This Cookie Policy explains how Gemma AI ("we", "us", or "our") uses cookies and similar 
                  technologies when you visit our website or use our AI image editing services. This policy provides 
                  you with information about how we use these technologies, what types we use, and your choices 
                  regarding their use.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
                <p>
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you 
                  visit a website. Cookies are widely used to make websites work more efficiently, provide a better 
                  user experience, and give website owners information about how visitors use their site.
                </p>
                <p className="mt-2">
                  Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device after you 
                  close your browser until they expire or you delete them. Session cookies are deleted as soon as you 
                  close your browser.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
                <p>We use the following types of cookies:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. 
                    They enable core functionality such as security, network management, and account authentication. You 
                    cannot opt-out of these cookies.
                  </li>
                  <li>
                    <strong>Performance/Analytics Cookies:</strong> These cookies collect information about how visitors 
                    use our website, such as which pages they visit most often and if they receive error messages. This 
                    information helps us improve our website and user experience.
                  </li>
                  <li>
                    <strong>Functionality Cookies:</strong> These cookies allow the website to remember choices you make 
                    (such as your username, language, or the region you are in) and provide enhanced, personalized features.
                  </li>
                  <li>
                    <strong>Targeting/Advertising Cookies:</strong> These cookies are used to deliver advertisements more 
                    relevant to you and your interests. They also help limit the number of times you see an advertisement 
                    and measure the effectiveness of advertising campaigns.
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Specific Cookies We Use</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-border mt-4">
                    <thead>
                      <tr className="bg-card/70">
                        <th className="border border-border px-4 py-2 text-left">Cookie Name</th>
                        <th className="border border-border px-4 py-2 text-left">Purpose</th>
                        <th className="border border-border px-4 py-2 text-left">Duration</th>
                        <th className="border border-border px-4 py-2 text-left">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border px-4 py-2">__session</td>
                        <td className="border border-border px-4 py-2">Maintains user session and authentication state</td>
                        <td className="border border-border px-4 py-2">Session</td>
                        <td className="border border-border px-4 py-2">Essential</td>
                      </tr>
                      <tr className="bg-card/30">
                        <td className="border border-border px-4 py-2">_gemma_theme</td>
                        <td className="border border-border px-4 py-2">Remembers your preferred theme (light/dark/system)</td>
                        <td className="border border-border px-4 py-2">1 year</td>
                        <td className="border border-border px-4 py-2">Functionality</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-2">_ga</td>
                        <td className="border border-border px-4 py-2">Google Analytics - Used to distinguish users</td>
                        <td className="border border-border px-4 py-2">2 years</td>
                        <td className="border border-border px-4 py-2">Analytics</td>
                      </tr>
                      <tr className="bg-card/30">
                        <td className="border border-border px-4 py-2">_gid</td>
                        <td className="border border-border px-4 py-2">Google Analytics - Used to distinguish users</td>
                        <td className="border border-border px-4 py-2">24 hours</td>
                        <td className="border border-border px-4 py-2">Analytics</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Third-Party Cookies</h2>
                <p>
                  Some cookies are placed by third parties on our website. These third parties include analytics 
                  services (like Google Analytics) that help us understand how you use our site, and advertising partners 
                  that may use cookies to show you relevant ads on other websites based on your visit to our site.
                </p>
                <p className="mt-2">
                  We do not control the placement of third-party cookies on our website. These companies may use cookies 
                  to collect information about your visits to our site and other websites, to measure the effectiveness 
                  of ads, or to personalize content and ads you see.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Similar Technologies</h2>
                <p>In addition to cookies, we may use other similar technologies on our services:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    <strong>Web Beacons:</strong> Small graphic files that allow us to monitor the use of our services. 
                    These may be included in emails or on our web pages.
                  </li>
                  <li>
                    <strong>Local Storage:</strong> Storage on your device that allows websites to store larger amounts 
                    of data for better performance.
                  </li>
                  <li>
                    <strong>Pixels:</strong> Small blocks of code on webpages that are used to track user activity, 
                    site conversions, web traffic, and similar metrics.
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Managing Cookies</h2>
                <p>
                  Most web browsers allow you to manage your cookie preferences. You can:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Delete cookies from your device</li>
                  <li>Block cookies by activating the setting on your browser that allows you to refuse all or some cookies</li>
                  <li>Set your browser to notify you when you receive a cookie</li>
                </ul>
                <p className="mt-2">
                  Please note that if you choose to block or delete cookies, you may not be able to access certain areas 
                  or features of our website, and some services may not function properly.
                </p>
                <p className="mt-2">
                  To find out how to manage cookies in your web browser, you can visit:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    <a href="https://support.google.com/chrome/answer/95647" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Chrome</a>
                  </li>
                  <li>
                    <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a>
                  </li>
                  <li>
                    <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Edge</a>
                  </li>
                  <li>
                    <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Safari</a>
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Do Not Track Signals</h2>
                <p>
                  Some web browsers offer a "Do Not Track" ("DNT") signal that is an HTTP header that requests that a web 
                  application disable tracking of an individual user. We currently do not respond to DNT signals.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Updates to This Cookie Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our 
                  business practices. Any changes will become effective when we post the revised policy on our website. 
                  We encourage you to periodically review this page for the latest information on our cookie practices.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
                <p>
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
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