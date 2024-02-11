import Link from "next/link";
import config from "config";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { url: "/admin", title: "Dashboard", icon: "home" },
  { url: "/admin/jobs", title: "Jobs", icon: "briefcase" },
  { url: "/admin/settings", title: "Settings", icon: "settings" },
];

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const SideBar: React.FC<React.PropsWithChildren<Props>> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const path = usePathname();

  return (
    <>
      <div className="md:hidden">
        <div
          onClick={() => setSidebarOpen(false)}
          className={`fixed inset-0 z-30 bg-gray-600 pointer-events-none transition-opacity ease-linear duration-300 ${
            sidebarOpen
              ? "opacity-75 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        ></div>
        <div
          className={`fixed inset-y-0 left-0 flex flex-col z-40 max-w-xs w-full pt-5 pb-4 bg-white transform ease-in-out duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="absolute top-0 right-0 -mr-14 p-1">
            {sidebarOpen && (
              <button
                x-show="sidebarOpen"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
              >
                <svg
                  className="h-6 w-6 text-white"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="flex-shrink-0 flex items-center px-4">
            <Logo />
          </div>

          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2">
              {links.map((link, index) => (
                <Link
                  key={link.url}
                  href={link.url}
                  className={`${index === 0 ? "" : "mt-1"} ${
                    path === link.url
                      ? "text-gray-900 bg-gray-100 focus:bg-gray-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:text-gray-900 focus:bg-gray-100"
                  } group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md focus:outline-none transition ease-in-out duration-150`}
                >
                  <Icon
                    icon={link.icon}
                    className={`${
                      path === link.url
                        ? "text-gray-500 group-focus:text-gray-600"
                        : "text-gray-400 group-focus:text-gray-500"
                    } mr-4 h-6 w-6 group-hover:text-gray-500 transition ease-in-out duration-150`}
                  />

                  {link.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* <!-- Static sidebar for desktop --> */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-white">
          <div className="flex items-center flex-shrink-0 px-4">
            <Logo />
          </div>
          <div className="mt-5 h-0 flex-1 flex flex-col overflow-y-auto">
            {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
            <nav className="flex-1 px-2 bg-white">
              {links.map((link, index) => (
                <Link
                  key={link.url}
                  href={link.url}
                  className={`${index === 0 ? "" : "mt-1"} ${
                    path === link.url
                      ? "text-gray-900 bg-gray-100 hover:bg-gray-100 focus:bg-gray-200"
                      : "text-gray-600 hover:bg-gray-50 focus:bg-gray-100"
                  } group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md hover:text-gray-900 focus:outline-none transition ease-in-out duration-150`}
                >
                  <Icon
                    icon={link.icon}
                    className={`${
                      path === link.url
                        ? "text-gray-500 group-focus:text-gray-600"
                        : "text-gray-400 group-focus:text-gray-00"
                    } mr-3 h-6 w-6 group-hover:text-gray-500  transition ease-in-out duration-150`}
                  />
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

function Logo() {
  return (
    <Link href="/" className="flex items-center text-primary-500 no-underline">
      <svg
        className="fill-current h-8 w-8 mr-2"
        viewBox="0 0 800 800"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{`${config.title} Logo`}</title>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <path
            d="M440.23792,729.162577 L440.23792,574.407122 C440.23792,571.023624 442.213464,565.030865 444.227582,562.308637 L470.427651,526.903138 L523.577228,526.903138 C531.363682,526.903138 540.726163,522.180568 545.363319,515.909525 L580.024888,468.956599 C581.892976,469.383669 583.818925,469.653688 585.811001,469.653688 C600.199134,469.653688 611.903613,457.946453 611.903613,443.561075 C611.903613,429.175698 600.199134,417.476729 585.811001,417.476729 C571.428378,417.476729 559.723899,429.175698 559.723899,443.561075 C559.723899,449.878959 562.068653,455.598945 565.818605,460.120378 L531.947804,505.995985 C530.426883,508.056943 526.125872,510.225358 523.577228,510.225358 L482.771358,510.225358 L519.105389,461.128815 C523.246593,455.535573 526.368338,446.071146 526.368338,439.114035 L526.368338,422.959759 C526.368338,419.997821 528.5092,414.850936 530.611487,412.75967 L586.083775,357.659346 C589.007139,358.73391 592.029694,359.276703 595.027452,359.276703 C604.31554,359.271192 613.317078,354.308912 618.028627,345.577392 C624.86175,332.916827 620.117138,317.060123 607.459328,310.229755 C601.33707,306.92065 594.283523,306.198764 587.59643,308.188084 C580.920358,310.188426 575.418041,314.66302 572.111691,320.80181 C568.79983,326.932334 568.077944,333.983125 570.072775,340.661952 C570.764353,342.970886 571.847183,345.067663 573.09533,347.054229 L551.463535,368.539993 L551.463535,322.011383 C557.500379,319.969711 562.826358,315.789934 566.083113,309.75309 C572.913481,297.098035 568.171624,281.235821 555.516569,274.402698 C549.380534,271.088082 542.324232,270.368951 535.650916,272.366537 C528.972089,274.361368 523.475282,278.838717 520.166177,284.977507 C513.330298,297.632562 518.0694,313.48651 530.73272,320.325144 C532.04975,321.036009 533.410864,321.578802 534.782999,322.041691 L534.782999,385.107562 L518.857413,400.925692 C513.630625,406.127683 509.687802,415.59762 509.687802,422.959759 L509.687802,439.114035 C509.687802,442.494778 507.712258,448.487537 505.69814,451.209765 L430.817578,552.386831 C426.681885,557.982829 423.557384,567.447256 423.557384,574.407122 L423.557384,735.511155 C418.691679,736.827525 413.740843,737.727674 408.758712,738.211604 L408.758712,513.570282 L468.675285,430.751724 C472.736585,425.13644 475.803225,415.677524 475.803225,408.74521 L475.803225,253.283387 C481.834559,251.241716 487.166048,247.061938 490.422803,241.025094 C497.255926,228.364529 492.514069,212.51058 479.853504,205.674702 C467.195694,198.836068 451.33348,203.583435 444.500356,216.244001 C437.672743,228.901811 442.411845,244.76127 455.07241,251.597148 C456.38944,252.308013 457.750554,252.848051 459.119934,253.31094 L459.119934,408.74521 C459.119934,412.216877 457.193985,418.165552 455.163335,420.978705 L408.758712,485.11914 L408.758712,204.062856 C414.795557,202.026695 420.121535,197.841407 423.383801,191.807319 C430.211414,179.141243 425.475067,163.287294 412.811747,156.454171 C400.151181,149.621048 384.297233,154.36566 377.461354,167.02347 C374.152249,173.156749 373.427607,180.207541 375.425194,186.886368 C377.420025,193.565195 381.900129,199.064757 388.027898,202.373862 C389.344927,203.084727 390.706041,203.62752 392.080932,204.090409 L392.080932,485.11914 L345.679065,420.978705 C343.645659,418.165552 341.722466,412.216877 341.722466,408.74521 L341.722466,253.31094 C343.094601,252.845295 344.455715,252.308013 345.772744,251.597148 C358.430554,244.76127 363.169656,228.901811 356.342043,216.241245 C349.50892,203.583435 333.64395,198.847089 320.98614,205.674702 C308.32833,212.51058 303.589229,228.364529 310.419597,241.025094 C313.679107,247.061938 319.005086,251.241716 325.04193,253.283387 L325.04193,408.74521 C325.04193,415.677524 328.105814,425.13644 332.167114,430.751724 L392.080932,513.570282 L392.080932,738.280609 C387.101602,737.838524 382.15083,736.981184 377.28226,735.708587 L377.28226,574.407122 C377.28226,567.441745 374.160515,557.982829 370.022067,552.392342 L295.14426,451.209765 C293.130141,448.487537 291.154597,442.494778 291.154597,439.114035 L291.154597,422.959759 C291.154597,415.59762 287.211775,406.127683 281.984987,400.925692 L266.056645,385.107562 L266.056645,322.041691 C267.431536,321.578802 268.79265,321.036009 270.109679,320.325144 C282.773,313.48651 287.512102,297.627051 280.676223,284.974752 C277.367118,278.838717 271.870311,274.361368 265.191484,272.366537 C258.518167,270.368951 251.45911,271.096348 245.325831,274.402698 C232.670776,281.235821 227.931674,297.098035 234.759287,309.755845 C238.016042,315.792689 243.342021,319.975222 249.378865,322.014138 L249.378865,368.542749 L227.74707,347.054229 C228.995217,345.070419 230.078046,342.970886 230.769625,340.661952 C232.767211,333.983125 232.042569,326.929578 228.730709,320.796299 C225.424359,314.66302 219.922041,310.188426 213.24597,308.188084 C206.561632,306.198764 199.508085,306.92065 193.383072,310.229755 C180.725262,317.060123 175.983405,332.916827 182.813773,345.582903 C187.525322,354.311667 196.52686,359.276703 205.814948,359.276703 C208.812705,359.276703 211.838015,358.73391 214.76138,357.659346 L270.228157,412.75967 C272.3332,414.850936 274.474061,419.997821 274.474061,422.959759 L274.474061,439.114035 C274.474061,446.071146 277.595807,455.535573 281.73701,461.128815 L318.068287,510.225358 L277.265172,510.225358 C274.716527,510.225358 270.415517,508.056943 268.900106,506.001496 L235.023795,460.120378 C238.773747,455.598945 241.121256,449.878959 241.121256,443.561075 C241.121256,429.175698 229.416776,417.476729 215.031399,417.476729 C200.646021,417.476729 188.941542,429.175698 188.941542,443.561075 C188.941542,457.946453 200.646021,469.653688 215.031399,469.653688 C217.023474,469.653688 218.952179,469.383669 220.817511,468.956599 L255.481836,515.915035 C260.118992,522.180568 269.478718,526.903138 277.265172,526.903138 L330.411993,526.903138 L356.617573,562.314147 C358.628935,565.030865 360.601724,571.018114 360.601724,574.407122 L360.601724,729.528945 C358.725384,728.613608 356.873149,727.629252 355.048654,726.57588 L140,602.417481 C112.153903,586.34053 95,556.629098 95,524.475195 L95,276.158398 C95,244.004495 112.153903,214.293064 140,198.216112 L355.048654,74.0577137 C382.894751,57.9807621 417.202557,57.9807621 445.048654,74.0577137 L660.097308,198.216112 C687.943405,214.293064 705.097308,244.004495 705.097308,276.158398 L705.097308,524.475195 C705.097308,556.629098 687.943405,586.34053 660.097308,602.417481 L445.048654,726.57588 C443.465179,727.4901 441.860809,728.352332 440.23792,729.162577 Z M400,189 C394.477153,189 390,184.522847 390,179 C390,173.477153 394.477153,169 400,169 C405.522847,169 410,173.477153 410,179 C410,184.522847 405.522847,189 400,189 Z M468,239 C462.477153,239 458,234.522847 458,229 C458,223.477153 462.477153,219 468,219 C473.522847,219 478,223.477153 478,229 C478,234.522847 473.522847,239 468,239 Z M333,239 C327.477153,239 323,234.522847 323,229 C323,223.477153 327.477153,219 333,219 C338.522847,219 343,223.477153 343,229 C343,234.522847 338.522847,239 333,239 Z M258,307 C252.477153,307 248,302.522847 248,297 C248,291.477153 252.477153,287 258,287 C263.522847,287 268,291.477153 268,297 C268,302.522847 263.522847,307 258,307 Z M206,343 C200.477153,343 196,338.522847 196,333 C196,327.477153 200.477153,323 206,323 C211.522847,323 216,327.477153 216,333 C216,338.522847 211.522847,343 206,343 Z M215,453 C209.477153,453 205,448.522847 205,443 C205,437.477153 209.477153,433 215,433 C220.522847,433 225,437.477153 225,443 C225,448.522847 220.522847,453 215,453 Z M543,307 C537.477153,307 533,302.522847 533,297 C533,291.477153 537.477153,287 543,287 C548.522847,287 553,291.477153 553,297 C553,302.522847 548.522847,307 543,307 Z M595,343 C589.477153,343 585,338.522847 585,333 C585,327.477153 589.477153,323 595,323 C600.522847,323 605,327.477153 605,333 C605,338.522847 600.522847,343 595,343 Z M586,453 C580.477153,453 576,448.522847 576,443 C576,437.477153 580.477153,433 586,433 C591.522847,433 596,437.477153 596,443 C596,448.522847 591.522847,453 586,453 Z"
            fill="#4dc0b5"
          />
        </g>
      </svg>
      <span className="font-bold text-xl tracking-tighter text-gray-800 inline">
        {config.title}
      </span>
    </Link>
  );
}

function Icon({ icon, className }) {
  switch (icon) {
    case "home":
      return (
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      );
    case "briefcase":
      return (
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={className}
        >
          <path
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    case "settings":
      return (
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      );

    default:
      break;
  }
}
