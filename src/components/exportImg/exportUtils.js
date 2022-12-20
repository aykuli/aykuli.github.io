export default function saveHandler(e, canvas, gifSave, apngSave, GIFEncoder, LS_KEYS) {
  let res;
  switch (e.target.dataset.save) {
    case 'gif':
      res = gifSave(canvas, GIFEncoder, LS_KEYS);
      break;
    case 'apng':
      res = apngSave(canvas, LS_KEYS);
      break;
    default:
      res = "image haven't saved";
      return res;
  }
  return res;
}
