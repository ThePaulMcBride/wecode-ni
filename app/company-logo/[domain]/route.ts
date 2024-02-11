import { URL } from "universal-url";
import isValidDomain from "is-valid-domain";
import axios from "axios";
import Cloudinary from "cloudinary";
import mql from "@microlink/mql";

const cloudinary = Cloudinary.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(_request, context) {
  const domain = `https://${context.params.domain}`;
  const companyDomain = new URL(domain).hostname;
  const isValid = isValidDomain(companyDomain);

  if (!isValid) {
    return new Response(null, {
      status: 404,
    });
  }

  try {
    const file = await cloudinary.api.resource(
      `wecode-ni/logos/${companyDomain}/logo`
    );

    const logo = await fetchLogoFromUrl(file.url);

    return new Response(logo.data, {
      headers: {
        "Cache-Control": "s-maxage=259200",
      },
    });
  } catch {
    const clearbitLogoRes = await fetchLogoFromUrl(
      `https://logo.clearbit.com/${companyDomain}`
    );
    if (clearbitLogoRes) {
      console.log("clearbit logo");
      await cloudinary.uploader.upload(
        `https://logo.clearbit.com/${companyDomain}`,
        { public_id: `wecode-ni/logos/${companyDomain}/logo` }
      );

      return new Response(clearbitLogoRes.data, {
        headers: {
          "Cache-Control": "s-maxage=259200",
        },
      });
    }

    const { data } = await mql(`https://${companyDomain}`);
    const microlinkUrl = data?.logo?.url;
    const microlinkLogoRes = await fetchLogoFromUrl(microlinkUrl);

    if (microlinkLogoRes) {
      console.log("ritekit logo");
      await cloudinary.uploader.upload(microlinkUrl, {
        public_id: `wecode-ni/logos/${companyDomain}/logo`,
      });
      return new Response(microlinkLogoRes.data, {
        headers: {
          "Cache-Control": "s-maxage=259200",
        },
      });
    }

    const fallbackLogoRes = await fetchLogoFromUrl(
      `https://ui-avatars.com/api?name=${companyDomain}&size=400&background=4dc0b5&color=ffffff&length=1`
    );
    if (fallbackLogoRes) {
      console.log("fallback logo");
      return new Response(fallbackLogoRes.data);
    }
    return new Response(null, {
      status: 404,
    });
  }
}

async function fetchLogoFromUrl(url) {
  try {
    const res = await axios({
      url,
      responseType: "stream",
    });

    return res;
  } catch (e) {
    return null;
  }
}
