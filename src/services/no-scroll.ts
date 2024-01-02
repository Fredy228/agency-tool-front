export default function noScroll(isScroll: boolean) {
  if (isScroll) {
    document.body.style.cssText = `
        overflow: hidden;
        padding-right: ${window.innerWidth - document.body.offsetWidth}px;
        `;
  } else {
    document.body.style.cssText = `
        overflow: initial;
        padding-right: 0;
        `;
  }
}
