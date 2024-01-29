export default function noScroll(isScroll: boolean) {
  if (isScroll) {
    document.body.style.paddingRight = `${
      window.innerWidth - document.body.offsetWidth
    }px`;
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "initial";
    document.body.style.paddingRight = "0";
  }
}
