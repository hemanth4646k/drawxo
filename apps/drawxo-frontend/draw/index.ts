type Shape ={
  type: "rect"
  x: number;
  y: number;
  width: number;
  height: number;
}|{
  type: "circle"
  centerX: number;
  centerY: number;
  radius: number;
};

let allShapes: Shape[]=[];
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
    const width = e.clientX - ptrx;
    const height = e.clientY - ptry;
    allShapes.push({type:"rect", x: ptrx, y: ptry, width, height });
  });
  canvas.addEventListener("mousemove", (e) => {
    if (mousedown) {
      const width = e.clientX - ptrx;
      const height = e.clientY - ptry;
      clearCanvas(allShapes,ctx,canvas);
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(ptrx, ptry, width, height);
    }
  });
}

function clearCanvas(existingshapes:Shape[],ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    existingshapes.map((shape)=>{
      if(shape.type==="rect"){
        ctx.strokeStyle="rgba(255,255,255)";
        ctx.strokeRect(shape.x,shape.y,shape.width,shape.height);
      }
    });
}