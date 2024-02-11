import config from "config";
import Link from "next/link";
import Image from "next/image";

import instilLogo from "./logos/instil.png";
import kainosLogo from "./logos/kainos.png";
import peak6Logo from "./logos/peak6.png";
import rapid7Logo from "./logos/rapid7.png";
import signifydLogo from "./logos/signifyd.png";
import sliceLogo from "./logos/slice.png";
import { buildMetadata } from "app/shared-metadata";

export const generateMetadata = buildMetadata({ title: "Pricing" });

export default function PricingPage() {
  return (
    <main className="flex-1">
      <div className="bg-primary-500">
        <div className="pt-12 sm:pt-16 lg:pt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10 lg:text-5xl lg:leading-none">
                Simple, fair pricing.
              </h2>
              <p className="mt-4 text-xl leading-7 text-primary-700">
                If you&apos;re not satisfied, get in touch within the first 7
                days and you&apos;ll receive a full refund.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-white sm:mt-12">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-primary-500"></div>
            <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-xlg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                <div className="bg-white px-6 py-8 lg:flex-shrink-1 lg:p-12">
                  <h3 className="text-2xl leading-8 font-extrabold text-gray-900 sm:text-3xl sm:leading-9">
                    30 Day Job Posting
                  </h3>
                  <p className="mt-6 text-base leading-6 text-gray-500">
                    Finding good developers is hard! WeCode NI is visited by
                    hundreds of developers from Belfast and Northern Ireland
                    each month. Post a job now to start receiving applications.
                  </p>
                  <div className="mt-8">
                    <div className="flex items-center">
                      <h4 className="flex-shrink-0 pr-4 bg-white text-sm leading-5 tracking-wider font-semibold uppercase text-primary-600">
                        What&apos;s included
                      </h4>
                      <div className="flex-1 border-t-2 border-gray-200"></div>
                    </div>
                    <ul className="mt-8 md:grid md:grid-cols-2 md:ga-x-8 md:gap-y-5">
                      <li className="flex items-start md:col-span-1">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700">
                          30 Day advert on WeCode NI
                        </p>
                      </li>
                      <li className="mt-5 flex items-start md:col-span-1 md:mt-0">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700">
                          Job displayed on Google&apos;s job search
                        </p>
                      </li>
                      <li className="mt-5 flex items-start md:col-span-1 md:mt-0">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700">
                          Job advertised in newsletter and tweets
                        </p>
                      </li>
                      <li className="mt-5 flex items-start md:col-span-1 md:mt-0">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700">
                          Free repost after 30 days if needed
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    Attract top talent now
                  </p>
                  <div className="mt-4 flex items-center justify-center text-5xl leading-none font-extrabold text-gray-900">
                    <span>
                      {config.currencySymbol}
                      {config.pricing / 100}
                    </span>
                    <span className="ml-3 text-xl leading-7 font-medium text-gray-500">
                      {config.currency.toUpperCase()}
                    </span>
                  </div>

                  <div className="mt-6">
                    <div className="rounded-md shadow">
                      <Link
                        href="/login"
                        tabIndex={0}
                        className="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-500 hover:bg-primary-500 focus:outline-none focus:ring transition duration-150 ease-in-out"
                      >
                        Post a job
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-screen-xl mx-auto pt-12 px-4 sm:px-6 lg:px-8 lg:pt-20">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div>
                <h2 className="text-2xl leading-9 font-extrabold text-gray-900 sm:text-3xl sm:leading-10">
                  Trusted by the Northern Ireland&apos;s best tech companies
                </h2>
                <p className="mt-3 max-w-3xl text-lg leading-7 text-gray-500">
                  From startups to tech giants. WeCode NI is trused by over 100
                  local and international software companies to help source top
                  devlopers.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                  <Image
                    className="max-h-14"
                    src={sliceLogo}
                    alt="Slice"
                    width={90}
                    height={56}
                  />
                </div>
                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                  <Image
                    className="max-h-16"
                    src={kainosLogo}
                    alt="Kainos"
                    width={102}
                    height={64}
                  />
                </div>
                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                  <Image
                    className="max-h-16"
                    src={rapid7Logo}
                    alt="Rapid7"
                    width={102}
                    height={64}
                  />
                </div>
                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                  <Image
                    className="max-h-16"
                    src={instilLogo}
                    alt="Instil"
                    width={102}
                    height={64}
                  />
                </div>
                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                  <Image
                    className="max-h-16"
                    src={signifydLogo}
                    alt="Signifyd"
                    width={102}
                    height={64}
                  />
                </div>
                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                  <Image
                    className="max-h-16"
                    src={peak6Logo}
                    alt="Peak6"
                    width={102}
                    height={64}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-screen-xl mx-auto pt-12 pb-16 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:pt-20 lg:pb-28 lg:px-8">
            <h2 className="text-3xl leading-9 font-extrabold text-gray-900">
              Frequently asked questions
            </h2>
            <div className="mt-6 border-t-2 border-gray-100 pt-10">
              <dl className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <div>
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      How does it work?
                    </dt>
                    <dd className="mt-2">
                      <p className="text-base leading-6 text-gray-500">
                        It&apos;s simple. Head over to{" "}
                        <Link href="/login" className="text-primary-600">
                          post a job
                        </Link>
                        , fill in the form and pay. Your job will go live on the
                        homepage immediately.
                      </p>
                    </dd>
                  </div>
                  <div className="mt-12">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      What form of payment do you accept?
                    </dt>
                    <dd className="mt-2">
                      <p className="text-base leading-6 text-gray-500">
                        All payment is handled by Stripe, so you&apos;ll need a
                        debit or credit card to pay. If you need to pay via
                        invoice, please get in touch for a custom quote.
                      </p>
                    </dd>
                  </div>
                  <div className="mt-12">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      I want to post several jobs. Can I get a discount?
                    </dt>
                    <dd className="mt-2">
                      <p className="text-base leading-6 text-gray-500">
                        Sure! Send an email to{" "}
                        <a
                          className="text-primary-600"
                          href="mailto:info@wecodeni.com"
                        >
                          info@wecodeni.com
                        </a>{" "}
                        with how many jobs you plan on posting to receive a
                        quote.
                      </p>
                    </dd>
                  </div>
                </div>
                <div className="mt-12 md:mt-0">
                  <div>
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      How does the free repost work?
                    </dt>
                    <dd className="mt-2">
                      <p className="text-base leading-6 text-gray-500">
                        Jobs stay on the homepage for 30 days. If after that
                        time, you still haven&apos;t filled the vacancy,
                        I&apos;ll repost the job to the top of the homepage.
                      </p>
                    </dd>
                  </div>
                  <div className="mt-12">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      You mentioned Twitter?
                    </dt>
                    <dd className="mt-2">
                      <p className="text-base leading-6 text-gray-500">
                        Yep! Twice a day, a link to a random live job will be
                        sent using the WeCode NI Twitter account. You can see
                        the{" "}
                        <a
                          className="text-primary-600"
                          target="blank"
                          href="https://twitter.com/wecodeni"
                        >
                          latest tweets here
                        </a>
                        !
                      </p>
                    </dd>
                  </div>
                  <div className="mt-12">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      How does the newsletter work?
                    </dt>
                    <dd className="mt-2">
                      <p className="text-base leading-6 text-gray-500">
                        Every Thursday at around lunchtime, all of the jobs that
                        were posted or re-posted in the last 7 days are sent via
                        an email to the 200+ subscribers.
                      </p>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
