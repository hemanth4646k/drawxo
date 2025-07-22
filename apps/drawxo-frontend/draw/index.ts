export function initDraw(ctx: CanvasRenderingContext2D,canvas: HTMLCanvasElement) {
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let mousedown = false;
  let ptrx = 0;
  let ptry = 0;

  canvas.addEventListener("mousedown", (e) => {
    mousedown = true;
    ptrx = e.clientX;
    ptry = e.clientY;
  });
  canvas.addEventListener("mouseup", (e) => {
    mousedown = false;
    console.log(ptrx);
    console.log(ptry);
    console.log(e.clientX);
    console.log(e.clientY);
  });
  canvas.addEventListener("mousemove", (e) => {
    if (mousedown) {
      const width = e.clientX - ptrx;
      const height = e.clientY - ptry;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,0,0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(ptrx, ptry, width, height);
    }
  });
}
