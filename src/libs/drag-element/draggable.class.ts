type MousePosition = { x: number; y: number }
type Options = { resize?: boolean; resizeElt?: string }
type Delta = { top?: number; left?: number; bottom?: number; right?: number }
interface ElementState {
  width: number
  height: number
  left: number
  top: number
  minWidth: number
  minHeight: number
  lastAction?: 'minimize' | 'expand' | 'resize' | 'restore' | 'drag'
}
type BindOptions = { dragContentEltId?: string; options?: Options; baseElt?: string }

export class Draggable {
  private windowSize!: { innerWidth: number; innerHeight: number }
  private draggableElt!: HTMLElement
  private draggableContent!: HTMLElement
  private draggableZone!: HTMLElement
  private options: Required<Options> = { resize: true, resizeElt: '.resizer' }
  private mouse: MousePosition = { x: 0, y: 0 }
  private originalDragContState: ElementState = {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    minHeight: 50,
    minWidth: 100,
  }
  private resizerState: Record<string, boolean> = {}
  private deltaMouse: MousePosition = { x: 0, y: 0 }
  private readonly resizerClasses: Record<string, string> = {
    resizer_top_left: 'r_top_left',
    resizer_mid_top: 'r_mid_top',
    resizer_top_right: 'r_top_right',
    resizer_mid_left: 'r_mid_left',
    resizer_mid_right: 'r_mid_right',
    resizer_bottom_left: 'r_bottom_left',
    resizer_mid_bottom: 'r_mid_bottom',
    resizer_bottom_right: 'r_bottom_right',
  }

  // Control flags to prevent observer conflicts
  private isManuallyResizing = false
  private isDragging = false
  private isWindowResizing = false
  private ignoreNextObserverCallback = false

  private boundDragElement = (evt: MouseEvent) => this.moveElement(evt)
  private boundEndDrag = () => this.endDrag()
  private boundResizeElement: ((evt: MouseEvent) => void) | null = null
  private boundStopResize: ((evt: MouseEvent) => void) | null = () => {
    const boundingRect = this.draggableContent.getBoundingClientRect()

    this.saveDraggableState({
      width: boundingRect.width,
      height: boundingRect.height,
      left: boundingRect.left,
      top: boundingRect.top,
      minWidth: this.originalDragContState.minWidth,
      minHeight: this.originalDragContState.minHeight,
      lastAction: 'resize',
    })
  }
  private resizeObserver?: ResizeObserver

  public static bind(
    dragEltId: string,
    { dragContentEltId, options, baseElt = 'body' }: BindOptions = {},
  ) {
    const instance = new Draggable()
    instance.init(dragEltId, dragContentEltId, options, baseElt)
    return instance
  }

  private init(
    dragEltId: string,
    dragContentEltId?: string,
    options?: Options,
    baseElt: string = 'body',
  ) {
    this.windowSize = {
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
    }

    const dragElt = document.querySelector<HTMLElement>(
      dragEltId.startsWith('#') ? dragEltId : `#${dragEltId}`,
    )
    const contentElt = dragContentEltId
      ? document.querySelector<HTMLElement>(dragContentEltId)
      : null

    if (!dragElt || !dragElt.parentElement) {
      throw new TypeError('No Element could be detected')
    }

    this.draggableElt = dragElt
    this.draggableZone = document.querySelector<HTMLElement>(baseElt) || document.body
    this.draggableContent = contentElt || dragElt.parentElement
    this.draggableContent.style.position = 'absolute'

    // Initialize state from current element
    this.initializeState()

    this.options = { ...this.options, ...options }

    this.draggableElt.addEventListener('mousedown', (evt) => {
      evt.stopPropagation()
      this.setDraggable(true)
      this.startDrag(evt)
    })

    this.observeResize()
    window.addEventListener('resize', this.handleResize)

    if (this.options.resize) {
      this.initResizers(this.options.resizeElt)
    }
  }

  private initializeState() {
    const rect = this.draggableContent.getBoundingClientRect()
    this.originalDragContState = {
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top,
      minWidth: 100,
      minHeight: 50,
    }
  }

  private saveDraggableState(state: Partial<ElementState>) {
    if (!this.originalDragContState) {
      throw new TypeError('originalDragContState is not defined')
    }

    if (typeof state !== 'object' || !state) {
      throw new TypeError('State must be an object')
    }

    const styleState = state ?? this.originalDragContState

    console.log('Saving draggable state:', state, styleState)

    this.originalDragContState = {
      ...this.originalDragContState,
      ...styleState,
    }

    console.log('Saving draggable state:', styleState)

    console.log('Updated originalDragContState:', this.originalDragContState)
  }

  private observeResize() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
    if (!this.draggableContent) {
      throw new TypeError('draggableContent is not defined')
    }

    if (!(this.draggableContent instanceof HTMLElement)) {
      throw new TypeError('draggableContent must be an HTMLElement')
    }

    this.resizeObserver = new ResizeObserver((entries) => {
      // Skip if we're manually resizing, dragging, or ignoring
      if (this.isManuallyResizing || this.isDragging || this.ignoreNextObserverCallback) {
        this.ignoreNextObserverCallback = false
        return
      }

      // Only process if it's a programmatic resize or external change
      if (!this.isWindowResizing) {
        const entry = entries[0]
        if (entry) {
          const { width, height } = entry.contentRect
          const draggableContentState = {
            width,
            height,
            left: this.draggableContent.offsetLeft,
            top: this.draggableContent.offsetTop,
            lastAction: 'resize' as const,
          }

          this.saveDraggableState(draggableContentState)
        }
      }
    })

    this.resizeObserver.observe(this.draggableContent)
  }

  private handleResize = () => {
    this.isWindowResizing = true
    requestAnimationFrame(() => {
      this.performAutoResize()
      // Reset flag after a short delay to ensure all related operations complete
      setTimeout(() => {
        this.isWindowResizing = false
      }, 100)
    })
  }

  private initResizers(selector: string) {
    this.draggableContent.querySelectorAll(selector).forEach((resizer) => {
      resizer.addEventListener('mousedown', (evt) => {
        evt.preventDefault()
        this.setDraggable(false)
        this.resetResizerState()
        this.setMousePosition(evt as MouseEvent)
        this.checkResizerClass(resizer as HTMLElement)

        // Set manual resizing flag BEFORE getting bounding rect
        this.isManuallyResizing = true
        this.ignoreNextObserverCallback = true

        this.boundResizeElement = (e) => this.resizeElement(e, resizer as HTMLElement)
        this.boundStopResize = () => this.stopResize()

        document.addEventListener('mousemove', this.boundResizeElement)
        document.addEventListener('mouseup', this.boundStopResize)
      })
    })
  }

  private performAutoResize() {
    if (this.draggableContent.offsetParent === null) return

    const scale = {
      x: window.innerWidth / (this.windowSize.innerWidth || 1),
      y: window.innerHeight / (this.windowSize.innerHeight || 1),
    }

    this.windowSize = {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    }

    const boundingRect = this.draggableContent.getBoundingClientRect()

    const left = Math.round(boundingRect.left * scale.x)
    const width = Math.round(boundingRect.width * scale.x)
    const top = Math.round(boundingRect.top * scale.y)
    const height = Math.round(boundingRect.height * scale.y)
    const minWidth = Math.round(100 * scale.x)
    const minHeight = Math.round(50 * scale.y)

    if (width === 0 || height === 0) return

    // Ignore next observer callback since we're setting styles programmatically
    this.ignoreNextObserverCallback = true

    Object.assign(this.draggableContent.style, {
      width: `${width}px`,
      height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
      minWidth: `${minWidth}px`,
      minHeight: `${minHeight}px`,
    })
  }

  private checkResizerClass(elt: HTMLElement) {
    this.resetResizerState()
    for (const [key, className] of Object.entries(this.resizerClasses)) {
      this.resizerState[key] = elt.classList.contains(className)
    }
  }

  private resetResizerState() {
    for (const key of Object.keys(this.resizerClasses)) {
      this.resizerState[key] = false
    }
  }

  private setDraggable(status: boolean, elt: HTMLElement | null = null) {
    ;(elt || this.draggableContent).setAttribute('draggable', String(status))
  }

  private resizeTo(elt: HTMLElement, newPosition: Partial<ElementState>, delta: Delta) {
    if (!elt || !elt.parentElement) {
      throw new TypeError('Element or parentElement is not defined')
    }

    return {
      left: () => {
        const left = this.originalDragContState.left + this.deltaMouse.x
        if (delta.left !== undefined && delta.left <= 0) {
          elt.style.left = '0px'
        } else if (
          newPosition.width &&
          newPosition.width >= this.originalDragContState.minWidth &&
          left > 0
        ) {
          elt.style.width = newPosition.width + 'px'
          elt.style.left = left + 'px'
        }
      },
      right: () => {
        const maxWidth = Math.min(this.draggableZone.offsetWidth, window.innerWidth)
        if (newPosition.left !== undefined && delta.right !== undefined && delta.right <= 0) {
          elt.style.width = maxWidth - newPosition.left + 'px'
        } else if (newPosition.width && newPosition.width >= this.originalDragContState.minWidth) {
          elt.style.width = newPosition.width + 'px'
          if (newPosition.left !== undefined) {
            elt.style.left = newPosition.left + 'px'
          }
        }
      },
      top: () => {
        const top = this.originalDragContState.top + this.deltaMouse.y

        if (delta.top !== undefined && delta.top <= 0) {
          elt.style.top = '0px'
        } else if (
          newPosition.height &&
          newPosition.height >= this.originalDragContState.minHeight &&
          top > 0 &&
          top < this.maxTop()
        ) {
          elt.style.height = newPosition.height + 'px'
          elt.style.top = top + 'px'
        }
      },
      bottom: () => {
        const maxHeight = Math.min(this.draggableZone.offsetHeight, window.innerHeight)
        if (delta.bottom !== undefined && newPosition.top !== undefined && delta.bottom <= 0) {
          elt.style.height = maxHeight - newPosition.top + 'px'
        } else if (
          newPosition.height &&
          newPosition.height >= this.originalDragContState.minHeight
        ) {
          elt.style.height = newPosition.height + 'px'
          if (newPosition.top !== undefined) {
            elt.style.top = newPosition.top + 'px'
          }
        }
      },
      elt,
    }
  }

  private resizeElement(evt: MouseEvent, elt: HTMLElement) {
    const parent = elt.parentElement as HTMLElement
    this.deltaMouse = {
      x: evt.clientX - this.mouse.x,
      y: evt.clientY - this.mouse.y,
    }

    const state = this.resizerState
    const maxWidth = Math.min(this.draggableZone.offsetWidth, window.innerWidth)
    const maxHeight = Math.min(this.draggableZone.offsetHeight, window.innerHeight)

    // Apply resize logic for each direction
    if (state.resizer_bottom_right) {
      const newPosition = {
        top: parent.offsetTop,
        left: parent.offsetLeft,
        width: this.originalDragContState.width + this.deltaMouse.x,
        height: this.originalDragContState.height + this.deltaMouse.y,
      }
      const delta = {
        bottom: maxHeight - (newPosition.top + newPosition.height),
        right: maxWidth - (newPosition.left + newPosition.width),
      }
      const resize = this.resizeTo(parent, newPosition, delta)
      resize.bottom()
      resize.right()
      return
    }

    if (state.resizer_bottom_left) {
      const newPosition = {
        top: parent.offsetTop,
        left: parent.offsetLeft,
        width: this.originalDragContState.width - this.deltaMouse.x,
        height: this.originalDragContState.height + this.deltaMouse.y,
      }
      const delta = {
        left: newPosition.left,
        bottom: maxHeight - (newPosition.top + newPosition.height),
      }
      const resize = this.resizeTo(parent, newPosition, delta)
      resize.bottom()
      resize.left()
      return
    }

    if (state.resizer_top_left) {
      const newPosition = {
        top: parent.offsetTop,
        left: parent.offsetLeft,
        width: this.originalDragContState.width - this.deltaMouse.x,
        height: this.originalDragContState.height - this.deltaMouse.y,
      }
      const delta = {
        top: newPosition.top,
        left: newPosition.left,
      }
      const resize = this.resizeTo(parent, newPosition, delta)
      resize.top()
      resize.left()
      return
    }

    if (state.resizer_top_right) {
      const newPosition = {
        top: parent.offsetTop,
        left: parent.offsetLeft,
        width: this.originalDragContState.width + this.deltaMouse.x,
        height: this.originalDragContState.height - this.deltaMouse.y,
      }
      const delta = {
        top: newPosition.top,
        right: maxWidth - (newPosition.left + newPosition.width),
      }
      const resize = this.resizeTo(parent, newPosition, delta)
      resize.top()
      resize.right()
      return
    }

    if (state.resizer_mid_right) {
      const newPosition = {
        left: parent.offsetLeft,
        width: this.originalDragContState.width + this.deltaMouse.x,
      }
      const delta = {
        right: maxWidth - (newPosition.left + newPosition.width),
      }
      const resize = this.resizeTo(parent, newPosition, delta)
      resize.right()
      return
    }

    if (state.resizer_mid_left) {
      const newPosition = {
        left: parent.offsetLeft,
        width: this.originalDragContState.width - this.deltaMouse.x,
      }
      const delta = {
        left: newPosition.left,
      }
      const resize = this.resizeTo(parent, newPosition, delta)
      resize.left()
      return
    }

    if (state.resizer_mid_top) {
      const newPosition = {
        top: parent.offsetTop,
        height: this.originalDragContState.height - this.deltaMouse.y,
      }
      const delta = {
        top: newPosition.top,
      }
      const resize = this.resizeTo(parent, newPosition, delta)
      resize.top()
      return
    }

    if (state.resizer_mid_bottom) {
      const newPosition = {
        top: parent.offsetTop,
        height: this.originalDragContState.height + this.deltaMouse.y,
      }
      const delta = {
        bottom: maxHeight - (newPosition.top + newPosition.height),
      }
      const resize = this.resizeTo(parent, newPosition, delta)
      resize.bottom()
      return
    }
  }

  private stopResize() {
    // Clear manual resizing flag
    this.isManuallyResizing = false

    if (this.boundResizeElement) {
      document.removeEventListener('mousemove', this.boundResizeElement)
      this.boundResizeElement = null
    }
    if (this.boundStopResize) {
      document.removeEventListener('mouseup', this.boundStopResize)
      this.boundStopResize = null
    }

    // Update the saved state after resizing is complete
    setTimeout(() => {
      const rect = this.draggableContent.getBoundingClientRect()
      this.originalDragContState = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
        minWidth: this.originalDragContState.minWidth,
        minHeight: this.originalDragContState.minHeight,
        lastAction: 'resize',
      }
    }, 50)
  }

  private endDrag() {
    this.draggableZone.removeEventListener('mousemove', this.boundDragElement)
    this.draggableZone.removeEventListener('mouseup', this.boundEndDrag)
    this.draggableZone.removeEventListener('mouseleave', this.boundEndDrag)
    this.setDraggable(false)

    if (this.isDragging) {
      this.isDragging = false
      // Update state after drag is complete
      setTimeout(() => {
        const rect = this.draggableContent.getBoundingClientRect()
        this.saveDraggableState({
          // width: rect.width,
          // height: rect.height,
          left: rect.left,
          top: rect.top,
          lastAction: 'drag',
        })
        // this.originalDragContState = {
        //   ...this.originalDragContState,
        //   left: rect.left,
        //   top: rect.top,
        //   lastAction: 'drag'
        // };
      }, 50)
    }
  }

  private startDrag(evt: MouseEvent) {
    evt.preventDefault()
    this.setMousePosition(evt)
    this.draggableZone.addEventListener('mousemove', this.boundDragElement)
    this.draggableZone.addEventListener('mouseup', this.boundEndDrag)
    this.draggableZone.addEventListener('mouseleave', this.boundEndDrag)
  }

  private setMousePosition(evt: MouseEvent) {
    this.mouse = { x: evt.clientX, y: evt.clientY }
  }

  private maxTop() {
    const parentElt = this.draggableContent
    const baseElt = this.draggableZone

    return Math.min(
      baseElt.offsetHeight - parentElt.offsetHeight,
      window.innerHeight - this.draggableElt.offsetHeight,
    )
  }

  private moveElement(evt: MouseEvent) {
    this.isDragging = true
    requestAnimationFrame(() => {
      const { x, y } = this.mouse
      const draggableContent = this.draggableContent
      const draggableZone = this.draggableZone
      this.deltaMouse = { x: evt.clientX - x, y: evt.clientY - y }

      const newTop = Math.max(
        0,
        Math.min(draggableContent.offsetTop + this.deltaMouse.y, this.maxTop()),
      )

      const minLeft = draggableContent.offsetWidth - 60
      const maxLeft = draggableZone.offsetWidth - 60

      const newLeft = Math.max(
        -minLeft,
        Math.min(maxLeft, draggableContent.offsetLeft + this.deltaMouse.x),
      )

      draggableContent.style.top = `${newTop}px`
      draggableContent.style.left = `${newLeft}px`

      this.mouse = { x: evt.clientX, y: evt.clientY }
    })
  }

  public destroy() {
    this.resizeObserver?.disconnect()
    window.removeEventListener('resize', this.handleResize)
    this.stopResize()
    this.endDrag()
  }

  private setDraggableContentPosition(state: Partial<CSSStyleDeclaration | ElementState>) {
    this.ignoreNextObserverCallback = true

    // If no state is provided, use originalDragContState but convert numbers to px strings

    Object.keys(state).forEach((key) => {
      const value = state[key as keyof Partial<CSSStyleDeclaration | ElementState>]
      if (value === undefined) return
      
      (this.draggableContent.style as any)[key] = typeof value === 'number' ? `${value}px` : value
    })
  }

  public expandOrRestore(): string {
    // Si on n'est pas déjà en mode "expand"
    if (this.originalDragContState.lastAction !== 'expand') {
      // Sauvegarde l'état courant avant d'expand
      this.saveDraggableState({ lastAction: 'expand' })

      // Met l'élément en plein écran
      this.setDraggableContentPosition({
        width: '100%',
        height: '100%',
        left: '0px',
        top: '0px',
      })

      return 'expand'
    }

    // Sinon, restore l'état initial
    return this.restore()
  }

  public minimizeOrRestore(): string {
    // Si on n'est pas déjà en mode "minimize"
    if (this.originalDragContState.lastAction !== 'minimize') {
      // Sauvegarde l'état courant avant de minimize
      this.saveDraggableState({ lastAction: 'minimize' })

      // Met l'élément en mode réduit
      this.setDraggableContentPosition({
        top: `${this.maxTop()}px`,
        // height: this.draggableElt.offsetHeight + 'px',
        width: '250px',
        left: this.originalDragContState.left + 'px',
      })

      return 'minimize'
    }

    // Sinon, restore l'état initial
    return this.restore()
  }

  private restore(): string {
    // Restaure l'état sauvegardé avant minimize/expand
    const { width, height, left, top } = this.originalDragContState
    this.setDraggableContentPosition({
      width,
      height,
      left,
      top,
    })
    this.saveDraggableState({ lastAction: 'restore' })
    return 'restore'
  }
}
