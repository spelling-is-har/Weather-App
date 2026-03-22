import { handleError } from "./error.js";

const loadImage = async (data) => {
  const module = await import(`./images/${data.icon}.png`);
  return module.default;
};

export const safeLoadImage = handleError(loadImage);
