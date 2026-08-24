const getImageUrl = (image) => {
  if (!image) return "";

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  const baseURL =
    import.meta.env.VITE_DJANGO_BASE_URL || "";

  return `${baseURL}${image.startsWith("/") ? image : `/${image}`}`;
};

export default getImageUrl;