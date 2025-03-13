import React from 'react';
import { ChefHat, FileText } from 'lucide-react';

const Terms = () => {
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
              <FileText className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-30-bold">Terms of Service</h1>
            <p className="text-16-medium text-black-100 mt-2">
              Last Updated: {currentDate}
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-24-bold text-black mb-4">1. Acceptance of Terms</h2>
              <p className="text-16-regular text-black-100">
                By accessing or using Flavour Fusion, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section>
              <h2 className="text-24-bold text-black mb-4">2. Use License</h2>
              <p className="text-16-regular text-black-100 mb-4">
                Permission is granted to temporarily download one copy of the materials on Flavour Fusion for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-16-regular text-black-100">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on Flavour Fusion</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-24-bold text-black mb-4">3. User Accounts</h2>
              <p className="text-16-regular text-black-100">
                When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-24-bold text-black mb-4">4. User Content</h2>
              <p className="text-16-regular text-black-100">
                Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content you post, including its legality, reliability, and appropriateness. By posting content, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through our service.
              </p>
            </section>

            <section>
              <h2 className="text-24-bold text-black mb-4">5. Subscription and Payments</h2>
              <p className="text-16-regular text-black-100">
                Some features of the Service are provided on a subscription basis. You will be billed in advance on a recurring and periodic basis, depending on the type of subscription plan you select. At the end of each period, your subscription will automatically renew under the same conditions unless you cancel it or we cancel it.
              </p>
            </section>

            <section>
              <h2 className="text-24-bold text-black mb-4">6. Disclaimer</h2>
              <p className="text-16-regular text-black-100">
                The materials on Flavour Fusion are provided on an 'as is' basis. Flavour Fusion makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-24-bold text-black mb-4">7. Limitations</h2>
              <p className="text-16-regular text-black-100">
                In no event shall Flavour Fusion or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Flavour Fusion, even if Flavour Fusion or a Flavour Fusion authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-24-bold text-black mb-4">8. Governing Law</h2>
              <p className="text-16-regular text-black-100">
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-24-bold text-black mb-4">9. Changes to Terms</h2>
              <p className="text-16-regular text-black-100">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-24-bold text-black mb-4">10. Contact Us</h2>
              <p className="text-16-regular text-black-100">
                If you have any questions about these Terms, please contact us at <a href="mailto:terms@flavourfusion.com" className="text-primary hover:underline">terms@flavourfusion.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms; 