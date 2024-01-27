export const scrollIntoView = (element: HTMLElement | null) => {
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
