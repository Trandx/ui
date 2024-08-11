
type MousePositionType = { x: number; y: number };
type OptionsType = {
    resize: boolean;
    resizeElt: string;
}
type SizeElementType = {
  width: number;
  height: number;
  left: number;
  top: number;
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
type DeltaType = {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};
type SizeCropElementType = {
  width: number;
  height?: number;
  minWidth: number;
  minHeight: number;
};

export class Draggable {

    private static dragElt: HTMLElement
    private static parentDragElt: HTMLElement
    private static option: OptionsType
    private static baseElt: HTMLElement
    private static mouse: MousePositionType = {
        x: 0,
        y:0
    };
    private static original: SizeElementType  = { width: 0, height: 0, left: 0, top: 0 };
    private static eltHasClass: resizerClassType;
    private static cornerClass: resizerClassType = {
      resizer_top_left: "r_top_left",
      resizer_mid_top: "r_mid_top",
      resizer_top_right: "r_top_right",
      resizer_mid_left: "r_mid_left",
      resizer_mid_right: "r_mid_right",
      resizer_bottom_left: "r_bottom_left",
      resizer_mid_bottom: "r_mid_bottom",
      resizer_bottom_right: "r_bottom_right",
    };
    private static deltaMouse: MousePositionType;

    private static resizerEltDetail: SizeCropElementType = {width: 128, height: 128, minWidth: 100, minHeight: 50}


    public static bind(dragEltId: string, option?: OptionsType, baseElt:HTMLElement  = document.body){
        
        const dragElt = document.querySelector<HTMLElement>(dragEltId)
        
        if(dragElt && dragElt.parentElement){
            this.dragElt = dragElt
            this.baseElt = baseElt
            this.parentDragElt = dragElt.parentElement
            this.parentDragElt.style.position = "absolute"
            this.dragElt.addEventListener("mousedown", (evt) => {
              evt.stopPropagation()
              this.eltCanBeDraggated(true)
              this.dragStart(evt)
            })

            if(option && option.resize){

              this.option = option
              this.resize(this.option.resizeElt)
            }
            return
        }
        throw new TypeError('No Element would be detected');
    }

    private static resize(eltName: string){
      const eltResizer = this.parentDragElt.querySelectorAll(eltName)

      eltResizer.forEach((currentEltResizer)=>{
        currentEltResizer.addEventListener("mousedown", (evt)=>{

          evt.preventDefault()

          this.eltCanBeDraggated(false)
          
          this.resetStatusClassOfResizerElt()

          this.getMousePosition(evt as MouseEvent)

          this.getElmentSize(currentEltResizer.parentElement)

          this.checkCSS_Class(currentEltResizer as HTMLElement);

          // // call a function whenever the cursor moves:
          document.onmousemove = (evt) => this.startResize(evt, currentEltResizer as HTMLElement);

          // stop moving when mouse button is released:
          document.onmouseup = () =>this.stopResize(document);
        })
      })
    }

    private static checkCSS_Class(elt: HTMLElement) {
      this.resetStatusClassOfResizerElt();
  
      Object.entries(this.cornerClass).forEach(([key, className]) => {
        const hasClass = elt.classList.contains(className as string);
  
        if (hasClass) {
          this.eltHasClass[key as keyof typeof this.cornerClass] = true;
          return
        }
      });
    }

    private static resetStatusClassOfResizerElt() {
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

    private static eltCanBeDraggated(status: boolean, elt: HTMLElement | null = null){
      (elt || this.parentDragElt).setAttribute("draggable", `${status}`)
    }

    private static getElmentSize = (elt: HTMLElement | null) => {
      if (!elt) throw "undefined element";
  
      this.original.width = elt.offsetWidth;
      this.original.height = elt.offsetHeight;
      this.original.left = elt.offsetLeft;
      this.original.top = elt.offsetTop;
  
    }

    private static resizeTo({
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
            elt.style.left = left + "px";// block the left position
          }
        },
        right: () => {
          if (newPosition.left !== undefined && delta.right && delta.right <= 0) {
            elt.style.width = this.baseElt.offsetWidth - newPosition.left + "px";
          } else if (newPosition.width && newPosition.width >= this.resizerEltDetail.minWidth) {
            elt.style.width = newPosition.width + "px";
            elt.style.left = newPosition.left+'px'// block the left position
          }
        },
        top: () => {
          const top = this.original.top + this.deltaMouse.y;
  
          if (delta.top && delta.top <= 0) {
            elt.style.top = 0 + "px";
          } else if (newPosition.height && newPosition.height >= this.resizerEltDetail.minHeight && top > 0) {
            elt.style.height = newPosition.height + "px";
            elt.style.top = top + "px";// block the top position
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
            elt.style.top = newPosition.top+'px'// block the top position
          }
        },
      };
    }
  
    private static startResize = (evt: MouseEvent, elt: HTMLElement) => {
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

    private static stopResize(elt: Window | Document) {
      elt.onmousemove = null;
  
      //console.log("focus out", elt);
    }

    private static dragMouseEnd = () => {
        // stop moving when mouse button is released:
        this.parentDragElt.onmousemove = null;
        this.parentDragElt.onmouseup = null;
        document.onmousemove = null;
        document.onmouseup = null;
        this.eltCanBeDraggated(false)
    };

    private static dragStart = (evt: MouseEvent) => {
        evt.preventDefault();
    
        // get the mouse cursor position at startup:
        this.getMousePosition(evt);
    
        // // call a function whenever the cursor moves:
        this.parentDragElt.onmousemove = this.dragElement;
    
        // stop moving when mouse button is released:
        this.parentDragElt.onmouseup = this.dragMouseEnd;
    };

    private static getMousePosition(evt: MouseEvent) {
        // get the mouse cursor position
        this.mouse.x = evt.clientX;
        this.mouse.y = evt.clientY;
    }

    private static dragElement = async (evt: MouseEvent) => {
        (async () => {
            
          const _mouse = this.mouse;
          const _dragElt = this.parentDragElt;
          const baseElt = this.baseElt;
    
          // calculate the new cursor position:
          this.deltaMouse = {
            x: evt.clientX - _mouse.x,
            y: evt.clientY - _mouse.y,
          };
    
          // set the element's new position:
          const newPosition = {
            top: _dragElt.offsetTop + this.deltaMouse.y,
            left: _dragElt.offsetLeft + this.deltaMouse.x,
            maxTop: baseElt.offsetHeight - _dragElt.offsetHeight,
            maxLeft: baseElt.offsetWidth - _dragElt.offsetWidth,
          };
    
          const deltaBottom =
            baseElt.offsetHeight - (newPosition.top + _dragElt.offsetHeight);
          const deltaRight =
            baseElt.offsetWidth - (newPosition.left + _dragElt.offsetWidth);
    
          _dragElt.style.top =
            (deltaBottom < 0
              ? newPosition.maxTop
              : newPosition.top < 0
              ? 0
              : newPosition.top
            ).toString() + "px";
    
          _dragElt.style.left =
            (deltaRight < 0
              ? newPosition.maxLeft
              : newPosition.left < 0
              ? 0
              : newPosition.left
            ).toString() + "px";
    
          //console.log({x: mouse.x, y: mouse.y}, deltaTop, deltaLeft, deltaBottom, deltaRight);
    
          this.mouse = {
            x: evt.clientX,
            y: evt.clientY,
          };

        })().then(() => {});
      };
}