import React from 'react';

function Page() {
  return (
    <div className=" py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Upgrade</h2>
        <p className="text-lg text-gray-600 mt-2">Upgrade your workspace to unlock more features</p>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {/* Starter Plan */}
          <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Starter
                <span className="sr-only">Plan</span>
              </h2>
              <p className="mt-4">
                <strong className="text-4xl font-bold text-gray-900">$20</strong>
                <span className="text-lg font-medium text-gray-600">/month</span>
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              {[
                "10 users included",
                "2GB of storage",
                "Email support",
                "Help center access",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-indigo-600"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-8 block w-full rounded-lg bg-indigo-600 px-6 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 transition-colors duration-300"
            >
              Get Started
            </a>
          </div>

          {/* Pro Plan */}
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white">
                Pro
                <span className="sr-only">Plan</span>
              </h2>
              <p className="mt-4">
                <strong className="text-4xl font-bold text-white">$30</strong>
                <span className="text-lg font-medium text-indigo-200">/month</span>
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              {[
                "20 users included",
                "5GB of storage",
                "Email support",
                "Help center access",
                "Phone support",
                "Community access",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-indigo-200"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-indigo-100">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-8 block w-full rounded-lg bg-white px-6 py-3 text-center text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;