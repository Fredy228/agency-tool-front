export const setImagePath = (url: string): string => {
  if (url.startsWith("https://") || url.startsWith("http://")) {
    return url;
  } else if (Number(url)) {
    return `${process.env.NEXTAUTH_URL}/img/welcome-screen/screen-1.webp`;
  } else {
    return `${process.env.NEXTAUTH_URL}/${url}`;
  }
};
