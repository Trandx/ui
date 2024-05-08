type CropImageType = {
  crop_elt: HTMLElement;
  img_src: string;
  crop_size?: Partial<SizeCropElementType>;
  corner_class: resizerClassType;
};
type resizerClassType = {
  resizer_top_left: string | boolean;
  resizer_mid_top: string | boolean;
  resizer_top_right: string | boolean;
  resizer_mid_left: string | boolean;
  resizer_mid_right: string | boolean;
  resizer_bottom_left: string | boolean;
  resizer_mid_bottom: string | boolean;
  resizer_bottom_right: string | boolean;
};

type SizeCropElementType = {
  width: number;
  height?: number;
  minWidth: number;
  minHeight: number;
};

type SizeElementType = {
  width: number;
  height: number;
  left: number;
  top: number;
};

type DeltaType = {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};

type DrawImageDetailsType = [
  image: CanvasImageSource,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  dx: number,
  dy: number,
  dw: number,
  dh: number
]|[
  image: CanvasImageSource,
  dx: number,
  dy: number,
  dw: number,
  dh: number
]

type DrawImageInCanvasType = {
  
  translation?:{
      x: number,
      y: number
  }
  scale?:{
    x: number,
    y: number
}
}

type FormatType = "jpeg" | "png" | "jpg" | "svg" | "webp";

type MousePositionType = { x: number; y: number };


export class CropImage extends EventTarget {
  constructor() {
    super();
    this.coppedEvent = new CustomEvent("cropped");
    this.img = new Image();
    this.img.crossOrigin = "*";
    this.mouse = { x: 0, y: 0 };
    this.original = { width: 0, height: 0, left: 0, top: 0 };
    this.ctx = {
      baseCanvas:  null,
      canvas:  null
    };

    this.scale = {x: 1, y:1} 
    this.translation = {x: 0, y:0}

    this.eltHasClass = {
      resizer_top_left: false,
      resizer_mid_top: false,
      resizer_top_right: false,
      resizer_mid_left: false,
      resizer_mid_right: false,
      resizer_bottom_left: false,
      resizer_mid_bottom: false,
      resizer_bottom_right: false,
    };

    this.resizerEltDetail = {width: 128, height: 128, minWidth: 100, minHeight: 50}
  }

  private coppedEvent: CustomEvent;
  private cropElt!: HTMLElement;
  private canvas!: HTMLCanvasElement;
  private btnResizer!: NodeListOf<HTMLDivElement>;
  private baseElt!: HTMLElement;
  private baseCanvas!: HTMLCanvasElement;
  private img: HTMLImageElement;

  private cornerClass!: resizerClassType;

  private eltHasClass: resizerClassType;

  private resizerEltDetail: SizeCropElementType

  private mouse: MousePositionType;

  private deltaMouse!: MousePositionType;

  private original: SizeElementType;

  private ctx: {
    baseCanvas: CanvasRenderingContext2D | null
    canvas: CanvasRenderingContext2D | null
  };
  private scale: MousePositionType
  private translation: MousePositionType

  private buildImage = () => {
    this.img.crossOrigin = "*";
    this.img.onerror = function () {
      //throw new Error("Could not load image");
    };

    this.img.onload = () => {
      //this.resize(); // resize if overflow

      this.drawImageInCanvas({scale:{x:1, y:1}});

      this.cropElt.ondragstart = this.dragStart;
    };
  };

  private resetEltHasClass() {
    this.eltHasClass = {
      resizer_top_left: false,
      resizer_mid_top: false,
      resizer_top_right: false,
      resizer_mid_left: false,
      resizer_mid_right: false,
      resizer_bottom_left: false,
      resizer_mid_bottom: false,
      resizer_bottom_right: false,
    };
  }

  private checkCSS_Class(elt: HTMLElement) {
    this.resetEltHasClass();

    Object.entries(this.cornerClass).forEach(([key, className]) => {
      const hasClass = elt.classList.contains(className as string);

      if (hasClass) {
        this.eltHasClass[key as keyof typeof this.cornerClass] = true;
        return
      }
    });
  }

  private resize() {
    this.btnResizer = this.cropElt.querySelectorAll(".resizer")

    this.btnResizer.forEach((currentResizer) => {
      currentResizer.addEventListener("mousedown", (evt) => {
        evt.preventDefault();

        this.mousePosition(evt);

        this.getElmentSize(currentResizer.parentElement);

        this.checkCSS_Class(currentResizer);

        window.onmousemove = (evt) => {
          this.startResize(evt, currentResizer);
          this.canvasFullSize();
        }

        window.onmouseup = () => this.stopResize(window);
      });
    });
  }

  private getElmentSize(elt: HTMLElement | null) {
    if (!elt) throw "undefined element";

    this.original.width = elt.offsetWidth;
    this.original.height = elt.offsetHeight;
    this.original.left = elt.offsetLeft;
    this.original.top = elt.offsetTop;

  }

  private resizeTo({
    elt,
    newPosition,
    delta,
  }: {
    elt: HTMLElement;
    newPosition: Partial<SizeElementType>;
    delta: DeltaType;
  }) {
    return {
      left: () => {
        const left = this.original.left + this.deltaMouse.x;
        if (delta.left && delta.left <= 0) {
          elt.style.left = 0 + "px";
        } else if (newPosition.width && newPosition.width >= this.resizerEltDetail.minWidth && left > 0) {
          elt.style.width = newPosition.width + "px";
          elt.style.left = left + "px";
        }
      },
      right: () => {
        if (newPosition.left !== undefined && delta.right && delta.right <= 0) {
          elt.style.width = this.baseElt.offsetWidth - newPosition.left + "px";
        } else if (newPosition.width && newPosition.width >= this.resizerEltDetail.minWidth) {
          elt.style.width = newPosition.width + "px";
          elt.style.left = newPosition.left+"px"; // block the left position
        }
      },
      top: () => {
        const top = this.original.top + this.deltaMouse.y;

        if (delta.top && delta.top <= 0) {
          elt.style.top = 0 + "px";
        } else if (newPosition.height && newPosition.height >= this.resizerEltDetail.minHeight && top > 0) {
          elt.style.height = newPosition.height + "px";
          elt.style.top = top + "px";
        }
      },
      bottom: () => {
        if (
          delta.bottom &&
          newPosition.top !== undefined &&
          delta.bottom <= 0
        ) {
          elt.style.height = this.baseElt.offsetHeight - newPosition.top + "px";
        } else if (newPosition.height && newPosition.height >= this.resizerEltDetail.minHeight) {
          elt.style.height = newPosition.height + "px";
          elt.style.left = newPosition.top+"px"; // block the top position
        }
      },
    };
  }

  private startResize = (evt: MouseEvent, elt: HTMLElement) => {
    const _parentNode = elt.parentElement;

    if (!_parentNode) {
      throw "not parent element";
    }

    // calculate the new cursor position:
    this.deltaMouse = {
      x: evt.clientX - this.mouse.x,
      y: evt.clientY - this.mouse.y,
    };

    if (this.eltHasClass.resizer_bottom_right) {
      const newPosition: SizeElementType = {
        top: _parentNode.offsetTop,
        left: _parentNode.offsetLeft,
        width: this.original.width + this.deltaMouse.x,
        height: this.original.height + this.deltaMouse.y,
      };

      const delta: DeltaType = {
        bottom:
          this.baseElt.offsetHeight - (newPosition.top + newPosition.height),
        right:
          this.baseElt.offsetWidth - (newPosition.left + newPosition.width),
      };

      const _resizeTo = this.resizeTo({
        elt: _parentNode,
        newPosition: newPosition,
        delta: delta,
      });

      _resizeTo.bottom();
      _resizeTo.right();

      return;
    }

    if (this.eltHasClass.resizer_bottom_left) {
      const newPosition = {
        top: _parentNode.offsetTop,
        left: _parentNode.offsetLeft,
        width: this.original.width - this.deltaMouse.x,
        height: this.original.height + this.deltaMouse.y,
      };

      const delta = {
        left: newPosition.left,
        bottom:
          this.baseElt.offsetHeight - (newPosition.top + newPosition.height),
      };

      const _resizeTo = this.resizeTo({
        elt: _parentNode,
        newPosition: newPosition,
        delta: delta,
      });

      _resizeTo.bottom();
      _resizeTo.left();

      return;
    }

    if (this.eltHasClass.resizer_top_left) {
      const newPosition = {
        top: _parentNode.offsetTop,
        left: _parentNode.offsetLeft,
        width: this.original.width - this.deltaMouse.x,
        height: this.original.height - this.deltaMouse.y,
      };

      const delta = {
        top: newPosition.top,
        left: newPosition.left,
      };

      const _resizeTo = this.resizeTo({
        elt: _parentNode,
        newPosition: newPosition,
        delta: delta,
      });

      _resizeTo.top();
      _resizeTo.left();

      return;
    }

    if (this.eltHasClass.resizer_top_right) {
      const newPosition = {
        top: _parentNode.offsetTop,
        left: _parentNode.offsetLeft,
        width: this.original.width + this.deltaMouse.x,
        height: this.original.height - this.deltaMouse.y,
      };

      const delta = {
        top: newPosition.top,
        right:
          this.baseElt.offsetWidth - (newPosition.left + newPosition.width),
      };

      const _resizeTo = this.resizeTo({
        elt: _parentNode,
        newPosition: newPosition,
        delta: delta,
      });

      _resizeTo.top();
      _resizeTo.right();

      return;
    }

    if (this.eltHasClass.resizer_mid_right) {
      const newPosition = {
        left: _parentNode.offsetLeft,
        width: this.original.width + this.deltaMouse.x,
      };

      const delta = {
        right:
          this.baseElt.offsetWidth - (newPosition.left + newPosition.width),
      };

      const _resizeTo = this.resizeTo({
        elt: _parentNode,
        newPosition: newPosition,
        delta: delta,
      });

      _resizeTo.right();

      return;
    }

    if (this.eltHasClass.resizer_mid_left) {
      const newPosition = {
        left: _parentNode.offsetLeft,
        width: this.original.width - this.deltaMouse.x,
      };

      const delta = {
        left: newPosition.left,
      };

      const _resizeTo = this.resizeTo({
        elt: _parentNode,
        newPosition: newPosition,
        delta: delta,
      });

      _resizeTo.left();

      return;
    }

    if (this.eltHasClass.resizer_mid_top) {
      const newPosition = {
        top: _parentNode.offsetTop,
        height: this.original.height - this.deltaMouse.y,
      };

      const delta = {
        top: newPosition.top,
      };

      const _resizeTo = this.resizeTo({
        elt: _parentNode,
        newPosition: newPosition,
        delta: delta,
      });

      _resizeTo.top();

      return;
    }

    if (this.eltHasClass.resizer_mid_bottom) {
      const newPosition = {
        top: _parentNode.offsetTop,
        height: this.original.height + this.deltaMouse.y,
      };

      const delta = {
        bottom:
          this.baseElt.offsetHeight - (newPosition.top + newPosition.height),
      };

      const _resizeTo = this.resizeTo({
        elt: _parentNode,
        newPosition: newPosition,
        delta: delta,
      });

      _resizeTo.bottom();

      return;
    }
  };

  private stopResize(elt: Window | Document) {
    elt.onmousemove = null;

    //console.log("focus out", elt);
  }

  private drawImageInCanvas({scale = {x:1, y:1}, translation = {x: 0, y:0}}:DrawImageInCanvasType) {
    const _canvas = this.canvas;
    const _baseCanvas = this.baseCanvas;
    const _cropElt = this.cropElt;

    if (!_canvas) {
      throw Error("canvas is undefined");
    }

    if(!_baseCanvas){
      throw Error("basCanvas is undefined");
    }

    const _img: CanvasImageSource = this.img;
    const _baseElt = this.baseElt;

    this.scale = {
      x: scale.x*_baseElt.clientWidth / _img.width, // x scale of image inside the image tag
      y: scale.y*_baseElt.clientHeight / _img.height, // y scale of image inside the image tag
    };

    this.translation = {
      x: translation.x,
      y: translation.y
    }

    //console.log("image",_img.height, _img.naturalHeight, _img.clientHeight, "scale", scale);

    const drawImageDataInCanvas: DrawImageDetailsType = [
      _img,
      _cropElt.offsetLeft / this.scale.x, // x-axis coordinate of the top left of first pixel
      _cropElt.offsetTop / this.scale.y, // y-axis coordinate of the top left of first pixel
      _cropElt.clientWidth / this.scale.x, // width of image cropped
      _cropElt.clientHeight / this.scale.y, //  height of image cropped
      0, // x-axis coordinate of the top left
      0, //y-axis coordinate of the top left
     _canvas.width, // width of canvas
      _canvas.height, // height of canvas
    ];

    const drawImageDataInBaseCanvas: DrawImageDetailsType = [
      _img,
      0, // x-axis coordinate of the top left
      0, //y-axis coordinate of the top left
      _baseCanvas.width, // width of canvas
      _baseCanvas.height, // height of canvas
    ];

    //console.log( _canvas.clientWidth, _canvas.width, _canvas.offsetTop, scale);

    this.ctx.canvas = _canvas.getContext("2d");
    this.ctx.baseCanvas = _baseCanvas.getContext("2d");

    if(this.ctx.canvas && this.ctx.baseCanvas){

      this.ctx.canvas.save(); // Save the current state
      this.ctx.canvas.translate(this.translation.x, this.translation.y);
      this.ctx.canvas.scale(1, 1);
      this.ctx.canvas.drawImage(...drawImageDataInCanvas);
      this.ctx.canvas.restore();

      this.ctx.baseCanvas.save(); // Save the current state
      //this.ctx.baseCanvas.translate(0, 0);
      this.ctx.baseCanvas.scale(scale.x, scale.y);
      this.ctx.baseCanvas.drawImage(...drawImageDataInBaseCanvas);
      this.ctx.baseCanvas.restore();
    }
    
  }


  private mousePosition(evt: MouseEvent) {
    // get the mouse cursor position
    this.mouse.x = evt.clientX;
    this.mouse.y = evt.clientY;
  }

  private dragStart = (evt: MouseEvent) => {
    evt.preventDefault();

    // get the mouse cursor position at startup:
    this.mousePosition(evt);

    // // call a function whenever the cursor moves:
    this.cropElt.onmousemove = this.dragElement;

    // stop moving when mouse button is released:
    this.cropElt.onmouseup = this.dragEnd;
  };

  private dragEnd = () => {
    // stop moving when mouse button is released:

    const _cropElt = this.cropElt;
    _cropElt.onmousemove = null;
    _cropElt.onmouseup = null;
    //this.getImageCropped()

    this.dispatchEvent(this.coppedEvent);
  };

  private dragElement = async (evt: MouseEvent) => {
    (async () => {
      const _mouse = this.mouse;
      const _cropElt = this.cropElt;
      const baseElt = this.baseElt;

      // calculate the new cursor position:
      const _deltaMouse = {
        x: evt.clientX - _mouse.x,
        y: evt.clientY - _mouse.y,
      };

      // set the element's new position:
      const newCropPosition = {
        top: _cropElt.offsetTop + _deltaMouse.y,
        left: _cropElt.offsetLeft + _deltaMouse.x,
        maxTop: baseElt.offsetHeight - _cropElt.offsetHeight,
        maxLeft: baseElt.offsetWidth - _cropElt.offsetWidth,
      };

      const deltaBottom =
        baseElt.offsetHeight - (newCropPosition.top + _cropElt.offsetHeight);
      const deltaRight =
        baseElt.offsetWidth - (newCropPosition.left + _cropElt.offsetWidth);

      _cropElt.style.top =
        (deltaBottom < 0
          ? newCropPosition.maxTop
          : newCropPosition.top < 0
          ? 0
          : newCropPosition.top
        ).toString() + "px";

      _cropElt.style.left =
        (deltaRight < 0
          ? newCropPosition.maxLeft
          : newCropPosition.left < 0
          ? 0
          : newCropPosition.left
        ).toString() + "px";

      //console.log({x: mouse.x, y: mouse.y}, deltaTop, deltaLeft, deltaBottom, deltaRight);
      

      this.mouse = {
        x: evt.clientX,
        y: evt.clientY,
      };
    })().then(() => this.drawImageInCanvas({scale:{x:1, y:1}}));
  };

  private canvasFullSize() {
    this.canvas.width = this.cropElt.offsetWidth;
    this.canvas.height = this.cropElt.offsetHeight;

    this.canvas.style.width = this.canvas.width + "px";
    this.canvas.style.height = this.canvas.height + "px";
  }

  public zoomIn(scale: number){
    const _scale = {x:scale, y:scale}
    this.drawImageInCanvas({scale:_scale})
  }

  public zoomOut(){
    
  }

  public verticalFlip(){
    
  }

  public horizontalFlip(){
    
  }

  public moveImage(){

  }

  /**
   * public function
   */

  /*, crop_size */

  public run({ crop_elt, img_src, corner_class, crop_size ={width: 128, height: 128, minWidth: 100, minHeight: 50}}: CropImageType) {
    this.img.src = img_src;
    this.cropElt = crop_elt;
    this.cornerClass = corner_class;

    if (this.cropElt && img_src) {
      // resize cropElt
      Object.assign(this.resizerEltDetail, crop_size)

      this.cropElt.style.width = this.resizerEltDetail.width+"px";
      this.cropElt.style.height = this.resizerEltDetail.height+"px";
      
      this.baseElt = this.cropElt.parentNode as HTMLElement;
      this.baseCanvas = this.baseElt.querySelector("canvas") as HTMLCanvasElement
      this.canvas = this.cropElt.querySelector("canvas") as HTMLCanvasElement;

      this.canvasFullSize();

      this.resize();

      this.buildImage();

      return this;
    }
  }

  public oncrop(fn: EventListenerOrEventListenerObject | null) {
    //this.event = new CustomEvent("cropped", {detail: fn});
    this.addEventListener("cropped", fn); // handle copped event
  }

  public download = () => {
    //alert('testss')
    const canvasUrl = this.getImageCropped();

    const createEl = document.createElement("a");
    createEl.href = canvasUrl;

    // This is the name of our downloaded file
    createEl.download = "download-this-canvas";

    // Click the download button, causing a download, and then remove it
    createEl.click();
    createEl.remove();
  };

  public getImageCropped = (
    type: FormatType | null = "png",
    quality: number | null = 1
  ) => {
    //console.log(this.canvas.style.width = "120px", this.canvas.width=120);

    return this.canvas.toDataURL(`image/${type}`, quality);
  };
}

export interface ICropImage {
  run({ crop_elt, img_src, corner_class }: CropImageType) : CropImage
  oncrop(fn: EventListenerOrEventListenerObject | null): void
  download(): void
  getImageCropped(): string
}

export default CropImage;
