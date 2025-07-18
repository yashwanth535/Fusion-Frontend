import React from 'react';

const Refund: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Refund Policy</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <p>
          Upon completing a Transaction, you are entering into a legally binding and enforceable agreement with us to purchase the product and/or service. After this point the User may cancel the Transaction unless it has been specifically provided for on the Platform. In which case, the cancellation will be subject to the terms mentioned on the Platform. We shall retain the discretion in approving any cancellation requests and we may ask for additional details before approving any requests. Once you have received the product and/or service, the only event where you can request for a replacement or a return and a refund is if the product and/or service does not match the description as mentioned on the Platform. Any request for refund must be submitted within three days from the date of the Transaction or such number of days prescribed on the Platform, which shall in no event be less than three days. A User may submit a claim for a refund for a purchase made, by raising a ticket here or contacting us on <a href="mailto:yashwanthmunikuntla@gmail.com" className="text-blue-600 underline">yashwanthmunikuntla@gmail.com</a> and providing a clear and specific reason for the refund request, including the exact terms that have been violated, along with any proof, if required. Whether a refund will be provided will be determined by us, and we may ask for additional details before approving any requests.
        </p>
        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Contact Details</h2>
          <p>Email: <a href="mailto:yashwanthmunikuntla@gmail.com" className="text-blue-600 underline">yashwanthmunikuntla@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default Refund; 