export default function swapHandler(primaryColor, secondaryColor, ctx) {
  const buf = primaryColor.value;
  primaryColor.value = secondaryColor.value; // eslint-disable-line
  secondaryColor.value = buf; // eslint-disable-line
  ctx.fillStyle = primaryColor.value;
  return [primaryColor.value, secondaryColor.value];
}
