import config from "config";
import cloudinary from "cloudinary";

// @ts-ignore
cloudinary.config({
  cloud_name: config.get("cloudinaryName"),
  api_key: config.get("cloudinaryApiKey"),
  api_secret: config.get("cloudinaryApiSecret"),
});

export default cloudinary;
