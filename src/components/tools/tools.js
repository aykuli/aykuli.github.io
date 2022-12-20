import './tools.scss';
import { RGBToHex } from './toolsUtils';

export default class Tools {
  constructor(canvas, ctx, currentColor, size, LS_KEYS) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.isDrawing = false;
    this.currentColor = currentColor;
    this.size = size;
    this.isEraser = false;
    this.LS_KEYS = LS_KEYS;

    if (canvas == null) {
      throw new Error('there is no canvas');
    }
  }

  plot(x, y, ctx) {
    const penSize =
      localStorage.getItem(this.LS_KEYS.penSize) !== null ? +localStorage.getItem(this.LS_KEYS.penSize) : 1;
    const pixelSize =
      localStorage.getItem(this.LS_KEYS.pixelSize) !== null ? +localStorage.getItem(this.LS_KEYS.pixelSize) : 1;
    ctx.fillStyle = this.currentColor.value;
    x = Math.round(x / pixelSize) * pixelSize; // eslint-disable-line
    y = Math.round(y / pixelSize) * pixelSize; // eslint-disable-line
    const delta = Math.floor((penSize * pixelSize) / 2);

    if (this.isEraser) {
      ctx.clearRect(x - delta, y - delta, penSize * pixelSize, penSize * pixelSize);
    } else {
      ctx.fillRect(x - delta, y - delta, penSize * pixelSize, penSize * pixelSize);
    }
  }

  // Bresenham algorithm
  bresenham = (x1, x2, y1, y2, ctx) => {
    let [innerX1, innerY1] = [x1, y1];
    const [innerX2, innerY2] = [x2, y2];
    if (!this.isDrawing) return;
    this.isDrawing = true;

    const deltaX = Math.abs(x2 - x1);
    const deltaY = Math.abs(y2 - y1);
    const signX = x1 < x2 ? 1 : -1;
    const signY = y1 < y2 ? 1 : -1;
    let err = deltaX - deltaY;

    this.plot(innerX2, innerY2, ctx);
    while (innerX1 !== innerX2 || innerY1 !== innerY2) {
      this.plot(innerX1, innerY1, ctx);
      const err2 = err * 2;
      if (err2 > -deltaY) {
        err -= deltaY;
        innerX1 += signX;
      }
      if (err2 < deltaX) {
        err += deltaX;
        innerY1 += signY;
      }
    }
  };

  getXYCoors(e) {
    const canvasWidth = this.canvas.parentNode.style.width.slice(0, -2);
    return [
      Math.round((e.offsetX / canvasWidth) * this.canvas.width),
      Math.round((e.offsetY / canvasWidth) * this.canvas.width),
    ];
  }

  draw = e => {
    if (this.isDrawing) {
      [this.x2, this.y2] = this.getXYCoors(e);
      this.bresenham(this.x1, this.x2, this.y1, this.y2, this.ctx);
      [this.x1, this.y1] = [this.x2, this.y2];
    }
  };

  drawOnMouseDown = e => {
    this.isDrawing = true;
    [this.x1, this.y1] = this.getXYCoors(e);
    this.plot(this.x1, this.y1, this.ctx);
  };

  drawMouseUp = e => {
    [this.x2, this.y2] = this.getXYCoors(e);
    this.bresenham(this.x1, this.x2, this.y1, this.y2, this.ctx);
    this.isDrawing = false;
  };

  pencilTool(targetTool) {
    if (targetTool === 'pencil' || targetTool === 'eraser') {
      this.isEraser = targetTool === 'eraser';
      this.canvas.addEventListener('mousemove', this.draw);
      this.canvas.addEventListener('mousedown', this.drawOnMouseDown);
      this.canvas.addEventListener('mouseup', this.drawMouseUp);
      this.canvas.addEventListener('mouseout', () => {
        this.isDrawing = false;
      });
    } else {
      this.isEraser = false;
      this.canvas.removeEventListener('mousemove', this.draw);
      this.canvas.removeEventListener('mousedown', this.drawOnMouseDown);
      this.canvas.removeEventListener('mouseup', this.drawMouseUp);
    }
  }

  bucketTool(targetTool) {
    if (targetTool === 'bucket') {
      this.canvas.addEventListener('mousedown', this.floodFill);
    } else {
      this.canvas.removeEventListener('mousedown', this.floodFill);
    }
  }

  floodFill = e => {
    let [x, y] = this.getXYCoors(e);

    const targetColor = RGBToHex(this.ctx.getImageData(x, y, 1, 1).data);
    const replacementColor = this.currentColor.value;
    if (targetColor === replacementColor) return;
    this.ctx.fillStyle = replacementColor;
    this.ctx.fillRect(x, y, 1, 1);
    let queue = [];

    queue.push([x, y]);
    while (queue.length > 0) {
      if (
        x + 1 > 0 &&
        x + 1 < this.canvas.width &&
        targetColor === RGBToHex(this.ctx.getImageData(x + 1, y, 1, 1).data)
      ) {
        queue.push([x + 1, y]);
        this.ctx.fillRect(x + 1, y, 1, 1);
      }

      if (
        x - 1 >= 0 &&
        x - 1 < this.canvas.width &&
        targetColor === RGBToHex(this.ctx.getImageData(x - 1, y, 1, 1).data)
      ) {
        queue.push([x - 1, y]);
        this.ctx.fillRect(x - 1, y, 1, 1);
      }

      if (
        y + 1 > 0 &&
        y + 1 < this.canvas.width &&
        targetColor === RGBToHex(this.ctx.getImageData(x, y + 1, 1, 1).data)
      ) {
        queue.push([x, y + 1]);
        this.ctx.fillRect(x, y + 1, 1, 1);
      }

      if (
        y - 1 >= 0 &&
        y - 1 < this.canvas.width &&
        targetColor === RGBToHex(this.ctx.getImageData(x, y - 1, 1, 1).data)
      ) {
        queue.push([x, y - 1]);
        this.ctx.fillRect(x, y - 1, 1, 1);
      }

      queue.shift(0);
      if (queue.length > 0) {
        [x, y] = [queue[0][0], queue[0][1]];
      }
    }
    queue = [];
  };

  bucketSamePixelTool(targetTool) {
    if (targetTool === 'bucketAll') {
      this.canvas.addEventListener('mousedown', this.floodFillSamePixel);
    } else {
      this.canvas.removeEventListener('mousedown', this.floodFillSamePixel);
    }
  }

  floodFillSamePixel = e => {
    const [x, y] = this.getXYCoors(e);
    const prevColor = RGBToHex(this.ctx.getImageData(x, y, 1, 1).data);
    this.ctx.fillStyle = this.currentColor.value;

    for (let i = 0; i < this.canvas.width; i += 1) {
      for (let j = 0; j < this.canvas.height; j += 1) {
        const currentColor = RGBToHex(this.ctx.getImageData(i, j, 1, 1).data);
        if (currentColor === prevColor) this.ctx.fillRect(i, j, 1, 1);
      }
    }
  };

  pickerTool(targetTool) {
    if (targetTool === 'picker') {
      this.canvas.addEventListener('click', this.colorPicker);
    } else {
      this.canvas.removeEventListener('click', this.colorPicker);
    }
  }

  colorPicker = e => {
    const [x, y] = this.getXYCoors(e);
    const choosedColor = this.ctx.getImageData(x, y, 1, 1);
    const color = RGBToHex(choosedColor.data);

    this.ctx.fillStyle = color;
    this.currentColor.value = color;
  };

  strokeTool(targetTool, frameDraw, frameClassName, getDomElementsList, framePreviewDraw, preview, drawOnCanvas) {
    const canvasAbove = document.querySelector('.canvas--above');
    const ctxAbove = canvasAbove.getContext('2d');
    ctxAbove.imageSmoothingEnabled = false;

    if (targetTool === 'stroke') {
      canvasAbove.style.display = 'block';
      this.isDrawing = false;
      let x1;
      let y1;
      let x0;
      let y0;

      canvasAbove.addEventListener('mousedown', e => {
        this.isDrawing = true;
        [x0, y0] = this.getXYCoors(e);
      });

      canvasAbove.addEventListener('mousemove', e => {
        if (this.isDrawing) {
          [x1, y1] = this.getXYCoors(e);
          ctxAbove.clearRect(0, 0, canvasAbove.width, canvasAbove.height);
          this.bresenham(x0, x1, y0, y1, ctxAbove);
        }
      });

      canvasAbove.addEventListener('mouseup', e => {
        [x1, y1] = this.getXYCoors(e);
        ctxAbove.clearRect(0, 0, canvasAbove.width, canvasAbove.height);
        this.bresenham(x0, x1, y0, y1, this.ctx);
        this.isDrawing = false;

        const dataURI = this.canvas.toDataURL();
        const piskelImg = JSON.parse(localStorage.getItem(this.LS_KEYS.piskelImg));
        const currentCount = localStorage.getItem(this.LS_KEYS.counter);
        piskelImg[currentCount] = dataURI;

        localStorage.removeItem(this.LS_KEYS.piskelImg);
        localStorage.setItem(this.LS_KEYS.piskelImg, JSON.stringify(piskelImg));
        frameDraw(piskelImg, currentCount, frameClassName, getDomElementsList);
        framePreviewDraw(this.LS_KEYS.fps, preview, piskelImg, currentCount, drawOnCanvas);
      });
    } else {
      canvasAbove.style.display = '';
    }
  }

  toolHandler = (
    targetTool,
    frameDraw,
    frameClassName,
    getDomElementsList,
    framePreviewDraw,
    preview,
    drawOnCanvas
  ) => {
    this.pencilTool(targetTool);
    this.bucketTool(targetTool);
    this.pickerTool(targetTool);
    this.strokeTool(targetTool, frameDraw, frameClassName, getDomElementsList, framePreviewDraw, preview, drawOnCanvas);
    this.bucketSamePixelTool(targetTool);

    localStorage.removeItem(this.LS_KEYS.tool);
    localStorage.setItem(this.LS_KEYS.tool, targetTool);
  };
}
