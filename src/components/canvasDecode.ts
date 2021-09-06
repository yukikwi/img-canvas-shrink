import { Ref } from 'vue'

// Draw algolithm
const drawCanvasDecode = (reference:Ref, url:string = '') => {
  // Define canvas
  const canvasCtx = reference.value.getContext("2d")

  // Fill blank with black
  canvasCtx.fillStyle = "#000000";

  // Create image object
  const img = new Image;
  img.addEventListener("load", function (this:HTMLImageElement) {
    // on image loaded

    //Use image resolution
    reference.value.width = this.width;
    reference.value.height = this.height;

    swapAlgo(reference, this)
  });
  img.src = url

  // End
  console.log('End draw process')
}

const swapAlgo = (reference:Ref, img:HTMLImageElement) => {
  const canvasCtx = reference.value.getContext("2d")
  // calc part size
  const shrinkConfig = {
    ssx: img.width/4 + 10,
    ssy: img.height/4 + 10,
    dsx: Math.round(0.25 * reference.value.width) + 10,
    dsy: Math.round(0.25 * reference.value.height) + 10
  }

  let config = {
    sx: 0,
    sy: 0,
    dx: 0,
    dy: 0
  }
  for (let i = 0; i < 16; i++) {
    if(i%4 === 0 && i !== 0){
      config.dx = 0
      config.dy = config.dy + Math.round(0.25 * reference.value.height)
    }

    // Y algo
    if(i === 0 || i === 2 || i === 5 || i === 9)
      config.sy = 0
    if(i === 1 || i === 4 || i === 8 || i === 12)
      config.sy = Math.round(0.25 * img.height)
    if(i === 3 || i === 7 || i === 11 || i === 14)
      config.sy = Math.round(0.5 * img.height)
    if(i === 6 || i === 10 || i === 13 || i === 15)
      config.sy = Math.round(0.75 * img.height)

    // X algo
    if(i === 0 || i === 1 || i === 3 || i === 6)
      config.sx = 0
    if(i === 2 || i === 4 || i === 7 || i === 10)
      config.sx = Math.round(0.25 * img.width)
    if(i === 5 || i === 8 || i === 11 || i === 13)
      config.sx = Math.round(0.5 * img.width)
    if(i === 9 || i === 12 || i === 14 || i === 15)
      config.sx = Math.round(0.75 * img.width)

    partArtist(canvasCtx, img, config, shrinkConfig)
    console.log(config)
    config.dx = config.dx + Math.round(0.25 * reference.value.width)
  }
}

const partArtist = (canvasCtx:any, img:HTMLImageElement, obj:any, shrinkconfig:any) => {
    console.log(shrinkconfig)
  canvasCtx.drawImage(
    img,
    obj.sx, obj.sy,
    shrinkconfig.ssx, shrinkconfig.ssy,
    obj.dx, obj.dy,
    shrinkconfig.dsx, shrinkconfig.dsy
  );
}

export default drawCanvasDecode