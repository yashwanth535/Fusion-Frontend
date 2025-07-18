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

          {/* --- Inserted Professional Legal Content --- */}
          <div className="space-y-8 mb-8">
            <section>
              <h2 className="text-24-bold text-black mb-4">Agreement to Terms</h2>
              <p className="text-16-regular text-black-100">
                By accessing this webpage, you are agreeing to be bound by these Terms and Conditions (&ldquo;Terms&quot;) in a legally binding agreement between us (&ldquo;Merchant&rdquo; or &ldquo;us&rdquo; or &ldquo;we&rdquo; or &ldquo;our&rdquo;) and the User (&ldquo;you&rdquo; or &ldquo;your&rdquo;). Please read these Terms carefully before accessing or using the Website. If you do not agree to the Terms, you may not access the Platform. We reserve the right to update and change the Terms and Conditions by posting updates and changes to the Platform. You are advised to check the Terms and Conditions from time to time for any updates or changes that may impact you. If at any point such amendments are not acceptable to you, we advise you to cease using the Platform at such time.
              </p>
            </section>
            <section>
              <h2 className="text-24-bold text-black mb-4">Eligibility</h2>
              <p className="text-16-regular text-black-100">
                You hereby represent and warrant that you have the right, power, and authority to agree to the Terms, to become a party to a legally binding agreement and to perform your obligations hereunder.
              </p>
            </section>
            <section>
              <h2 className="text-24-bold text-black mb-4">Definitions</h2>
              <ul className="list-disc pl-6 space-y-2 text-16-regular text-black-100">
                <li><b>Payment Instrument:</b> includes credit card, debit card, bank account, prepaid payment instrument, Unified Payment Interface (UPI), Immediate Payment Service (IMPS) or any other methods of payments which shall be developed or added or deployed by banks and financial institutions from time to time.</li>
                <li><b>Platform:</b> refers to the website or platform where the Merchant offers its products or services and where the Transaction may be initiated.</li>
                <li><b>Transaction:</b> shall refer to the order or request placed by the User with the Merchant to purchase the products and/or services listed on the Platform by paying the Transaction Amount to the Merchant.</li>
                <li><b>Transaction Amount:</b> shall mean the amount paid by the User in connection with a Transaction.</li>
                <li><b>User/Users:</b> means any person availing the products and/or services offered on the Platform.</li>
                <li><b>Website:</b> shall mean www.instamojo.com or the mobile application.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-24-bold text-black mb-4">Merchant's Rights</h2>
              <p className="text-16-regular text-black-100">
                You agree that we may collect, store, and share the information provided by you in order to deliver the products and/or services availed by you on our Platform and/or contact you in relation to the same.
              </p>
            </section>
            <section>
              <h2 className="text-24-bold text-black mb-4">Your Responsibilities</h2>
              <p className="text-16-regular text-black-100">
                You agree to provide us with true, complete and up-to-date information about yourself as may be required for the purpose of completing the Transactions. This information includes but is not limited to the personal details such as name, email address, phone number, delivery address, age, and gender (or any other information that we may deem necessary for us to fulfil the Transaction) as well as the accurate payment information required for the transaction.
              </p>
            </section>
            <section>
              <h2 className="text-24-bold text-black mb-4">Prohibited Actions</h2>
              <p className="text-16-regular text-black-100">
                You may not access or use the Platform for any purpose other than that for which we make the Platform available. The Platform may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a User of the Platform, you agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-16-regular text-black-100">
                <li>Systematically retrieve data or other content from the Platform to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                <li>Make any unauthorized use of the Platform, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of the Platform, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Platform and/or the Content contained therein.</li>
                <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
                <li>Interfere with, disrupt, or create an undue burden on the Platform or the networks or services connected to the Platform.</li>
                <li>Attempt to impersonate another user or person or use the username of another user.</li>
                <li>Use any information obtained from the Platform in order to harass, abuse, or harm another person.</li>
                <li>Use the Platform as part of any effort to compete with us or otherwise use the Platform and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
                <li>Decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Platform.</li>
                <li>Attempt to bypass any measures of the Platform designed to prevent or restrict access to the Platform, or any portion of the Platform.</li>
                <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Platform to you.</li>
                <li>Copy or adapt the Platform's software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
                <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party's uninterrupted use and enjoyment of the Platform or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Platform.</li>
                <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Platform.</li>
                <li>Use the Platform in a manner inconsistent with any applicable laws or regulations.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-24-bold text-black mb-4">Limitation of Liability</h2>
              <p className="text-16-regular text-black-100">
                The User agrees that the only recourse that the User has in the event of receiving a defective product and/or deficiency in service or a product and/or service which does not match the provided description is to initiate the refund process which will be subject to the terms for refund under this agreement. We hereby expressly disclaim any liability to them for any losses. The User shall indemnify and hold harmless the Merchant and its affiliates, agents and representatives from and against any and all claims, demands, causes of action, obligations, liabilities, losses, damages, injuries, costs and expenses incurred or sustained by reason of or arising out of any breach or alleged breach of any of the terms herein by the User.
              </p>
            </section>
            <section>
              <h2 className="text-24-bold text-black mb-4">Guidelines for Reviews</h2>
              <p className="text-16-regular text-black-100">
                We may provide you areas on the Platform to leave reviews or ratings. When posting a review, you must comply with the following criteria:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-16-regular text-black-100">
                <li>You should have firsthand experience with the person/entity being reviewed.</li>
                <li>Your reviews should not contain offensive profanity, or abusive, racist, offensive, or hate language.</li>
                <li>Your reviews should not contain discriminatory references based on religion, race, gender, national origin, age, marital status, sexual orientation, or disability.</li>
                <li>Your reviews should not contain references to illegal activity.</li>
                <li>You should not be affiliated with competitors if posting negative reviews.</li>
                <li>You should not make any conclusions as to the legality of conduct.</li>
                <li>You may not post any false or misleading statements.</li>
                <li>You may not organize a campaign encouraging others to post reviews, whether positive or negative.</li>
              </ul>
              <p className="text-16-regular text-black-100 mt-2">
                We may accept, reject, or remove reviews in our sole discretion. We have absolutely no obligation to screen reviews or to delete reviews, even if anyone considers reviews objectionable or inaccurate. Reviews are not endorsed by us, and do not necessarily represent our opinions or the views of any of our affiliates or partners. We do not assume liability for any review or for any claims, liabilities, or losses resulting from any review. By posting a review, you hereby grant to us a perpetual, non-exclusive, worldwide, royalty-free, fully paid, assignable, and sublicensable right and license to reproduce, modify, translate, transmit by any means, display, perform and/or distribute all content relating to reviews.
              </p>
            </section>
            <section>
              <h2 className="text-24-bold text-black mb-4">Governing Laws &amp; Dispute Resolution</h2>
              <p className="text-16-regular text-black-100">
                Please note that these terms of use, their subject matter and their formation, are governed by the laws of India. You and we both agree that the courts of India will have exclusive jurisdiction over any dispute. Any dispute or claim arising out of or in connection with or relating to these Terms or their breach, termination or invalidity hereof (&ldquo;Dispute&rdquo;) shall be referred to and finally resolved by arbitration in Bengaluru in accordance with the Arbitration and Conciliation Act, 1996 for the time being in force, which rules are deemed to be incorporated by reference in this clause. Within 30 (thirty) days of the issue of a notice of Dispute, the parties shall mutually agree on the appointment of a sole arbitrator. If such mutual agreement is not arrived at within the aforesaid 30 (thirty) days' period, the parties shall appoint such sole arbitrator in accordance with the Arbitration and Conciliation Act, 1996. The seat of arbitration shall be India and the arbitration proceedings shall be conducted in the English language. The parties shall keep the arbitration confidential and not disclose to any person, other than those necessary to the proceedings, any information, transcripts or award unless required to do so by law. The decision of the arbitrator shall be final and binding on all the parties hereto. The parties hereto agree that their consent for resolution of Dispute through arbitration shall not preclude or restrain either of them from seeking suitable injunctive relief in appropriate circumstances from courts in Bengaluru. The cost of arbitration shall be borne in the manner and by a party as determined by the arbitrators. In the meantime, each party shall bear its own cost for the arbitration which shall be reimbursed as per the directions in the arbitral award.
              </p>
            </section>
            <section>
              <h2 className="text-24-bold text-black mb-4">Grievance Redressal</h2>
              <p className="text-16-regular text-black-100">
                You agree that if you have any question or complaint with regard to any product and/or service availed on our Platform, or pertaining to the Transaction, including but not limited to, double debit of Transaction Amount, fraudulent Transaction, unauthorized Transaction, refund requests, etc., you may reach out here.
              </p>
            </section>
            <section>
              <h2 className="text-24-bold text-black mb-4">Disclaimer</h2>
              <p className="text-16-regular text-black-100">
                That upon initiating a Transaction, you as a User are entering into a legally binding and enforceable contract with us to purchase the products and/or services, and you shall pay the price as listed on the Platform through legitimate and legal sources of funds and through the accepted Payment Instruments. That you shall provide accurate payment details to the secure payment system for making purchase on the Platform. The information provided by you may be utilized or shared with any third party if required in relation to fraud verifications or by law, regulation or court order. We expressly disclaim all liabilities that may arise as a consequence of any unauthorized use of a User’s Payment Instrument. That all payments undertaken by you are subject to your own risk and volition. We shall not be liable for any loss or damage occurred to you arising directly or indirectly due to the decline of authorization for any Transaction, malfunction, errors and/or unscrupulous activities. If you receive a User identification code, order ID, password or any other piece of information as part of our security procedures, you must treat such information as confidential. You must not disclose it to any third party. The content on our Platform is provided for general information only. The information provided does not to amount to advice from us in any manner and should not be relied upon. Where our Platform contains links to other websites and resources provided by third parties, these links are provided for your information only. Such links should not be interpreted as approval by us of those linked websites or information you may obtain from them. This Platform includes information and materials uploaded by other Users of the Platform. You understand that such information and materials have not been verified or approved by us. The views expressed by other Users on our Platform do not represent our views or values. We do not guarantee that our Platform will be secure or free from bugs or viruses. You are responsible for configuring your information technology, computer programs and platform to access our Platform. You must use your own virus protection software.
              </p>
            </section>
          </div>
          {/* --- End Inserted Content --- */}

          {/* Existing Terms Sections */}
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