export const setImagePath = (url: string): string => {
  if (url.startsWith("https://") || url.startsWith("http://")) {
    return url;
  } else {
    return `${process.env.NEXTAUTH_URL}/${url}`;
  }
};
