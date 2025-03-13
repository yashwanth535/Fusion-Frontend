import React from 'react';
import { ChefHat, Shield } from 'lucide-react';

const Privacy = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-white-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="startup-form hover:shadow-xl">
          <div className="text-center mb-8">
            <div className="bg-primary-100 w-20 h-20 rounded-full flex-center mx-auto mb-4 shadow-md">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-30-bold">Privacy Policy</h1>
            <p className="text-16-medium text-black-100 mt-2">
              Last Updated: {currentDate}
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-24-bold text-black mb-4">Introduction</h2>
              <p className="text-16-regular text-black-100">
                At Flavour Fusion, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            <section>
              <h2 className="text-24-bold text-black mb-4">Information We Collect</h2>
              <p className="text-16-regular text-black-100 mb-4">
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-16-regular text-black-100">
                <li>Register for an account</li>
                <li>Create or share recipes</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us or provide feedback</li>
                <li>Respond to surveys or participate in promotions</li>
              </ul>
              <p className="text-16-regular text-black-100 mt-4">
                This information may include your name, email address, password, profile information, and any other information you choose to provide.
              </p>
            </section>

            <section>
              <h2 className="text-24-bold text-black mb-4">How We Use Your Information</h2>
              <p className="text-16-regular text-black-100 mb-4">
                We may use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-16-regular text-black-100">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and complete transactions</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Personalize your experience on our platform</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-24-bold text-black mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-16-regular text-black-100">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-24-bold text-black mb-4">Data Security</h2>
              <p className="text-16-regular text-black-100">
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-24-bold text-black mb-4">Your Rights</h2>
              <p className="text-16-regular text-black-100 mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-16-regular text-black-100">
                <li>The right to access personal information we hold about you</li>
                <li>The right to request that we correct any inaccurate personal information</li>
                <li>The right to request that we delete your personal information</li>
                <li>The right to opt out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-24-bold text-black mb-4">Changes to This Privacy Policy</h2>
              <p className="text-16-regular text-black-100">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this page. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-24-bold text-black mb-4">Contact Us</h2>
              <p className="text-16-regular text-black-100">
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@flavourfusion.com" className="text-primary hover:underline">privacy@flavourfusion.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 