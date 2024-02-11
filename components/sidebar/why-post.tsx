import config from "config";

export const WhyPost: React.FC = () => {
  return (
    <div className="w-full p-6 lg:p-4 bg-white rounded shadow mb-6">
      <h4 className="text-gray-800 text-lg mb-4 font-semibold">
        Why post a job with {config.title}?
      </h4>
      <div className="flex mb-4 items-start">
        <div className="w-6 mr-2">
          <svg
            className="fill-current text-primary-500 block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              className="heroicon-ui"
              d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-base text-uppercase text-gray-800 font-semibold mb-1">
            Local
          </h2>
          <p className="text-sm text-gray-600 leading-normal">
            WeCode NI specialises in connecting Tech Professionals in Northern
            Ireland.
          </p>
        </div>
      </div>
      <div className="flex mb-4 items-start">
        <div className="w-6 mr-2">
          <svg
            className="fill-current text-primary-500 block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              className="heroicon-ui"
              d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-11v2h1a3 3 0 0 1 0 6h-1v1a1 1 0 0 1-2 0v-1H8a1 1 0 0 1 0-2h3v-2h-1a3 3 0 0 1 0-6h1V6a1 1 0 0 1 2 0v1h3a1 1 0 0 1 0 2h-3zm-2 0h-1a1 1 0 1 0 0 2h1V9zm2 6h1a1 1 0 0 0 0-2h-1v2z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-base text-uppercase text-gray-800 font-semibold mb-1">
            Low Cost
          </h2>
          <p className="text-sm text-gray-600 leading-normal">
            {config.currencySymbol}
            {config.pricing / 100} is all it costs to post a job with WeCode NI
            for 30 days.
          </p>
        </div>
      </div>
      <div className="flex mb-4 items-start">
        <div className="w-6 mr-2">
          <svg
            className="fill-current text-primary-500 block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M6 18.7V21a1 1 0 0 1-2 0v-5a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2H7.1A7 7 0 0 0 19 12a1 1 0 1 1 2 0 9 9 0 0 1-15 6.7zM18 5.3V3a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1h-5a1 1 0 0 1 0-2h2.9A7 7 0 0 0 5 12a1 1 0 1 1-2 0 9 9 0 0 1 15-6.7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-base text-uppercase text-gray-800 font-semibold mb-1">
            Free Repost
          </h2>
          <p className="text-sm text-gray-600 leading-normal">
            If your job isn&apos;t filled within the first 30 days, we&apos;ll
            post it again for free.
          </p>
        </div>
      </div>
      <div className="flex mb-4 items-start">
        <div className="w-6 mr-2">
          <svg
            className="fill-current text-primary-500 block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M15 19a3 3 0 0 1-6 0H4a1 1 0 0 1 0-2h1v-6a7 7 0 0 1 4.02-6.34 3 3 0 0 1 5.96 0A7 7 0 0 1 19 11v6h1a1 1 0 0 1 0 2h-5zm-4 0a1 1 0 0 0 2 0h-2zm0-12.9A5 5 0 0 0 7 11v6h10v-6a5 5 0 0 0-4-4.9V5a1 1 0 0 0-2 0v1.1z" />
          </svg>
        </div>
        <div>
          <h2 className="text-base text-uppercase text-gray-800 font-semibold mb-1">
            Notifications
          </h2>
          <p className="text-sm text-gray-600 leading-normal">
            When you post a job with us, we automatically notify local tech
            professionals.
          </p>
        </div>
      </div>
    </div>
  );
};
