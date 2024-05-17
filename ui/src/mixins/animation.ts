/**
 * 
 * @param elt HTMLElement
 * @param animationClass string
 * @param delay number
 * @default
 * delay 500 in ms
 */
const animationOut = (elt: HTMLElement, animationClass: string, delay = 500,) => {
    const t = delay / 1000
    //const animationClass =  'slide-out-down'

    const classList = elt.classList
    //classList.add(..._class)

    elt.style.animation = `${animationClass} ${t}s`

    setTimeout(() => {
        elt.style.animation = 'none'
        classList.add('hidden')
    },
        delay
    );
}

/**
 * 
 * @param elt HTMLElement
 * @param animationClass string
 * @param delay number
 * @default
 * delay 500 in ms
 */
const animationIn = (elt: HTMLElement, animationClass: string, delay = 500,) => {
    const t = delay / 1000

    const classList = elt.classList

    classList.remove('hidden')
    elt.style.animation = `${animationClass} ${t}s`

    setTimeout(() => {
        elt.style.animation = 'none'
    },
        delay
    );
}

/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function animation(elt: HTMLElement, cssClass: string, time = 500) {
    const classList = elt.classList

    if (classList.contains('hidden')) {
        animationIn(elt, cssClass, time)
    } else {
        animationOut(elt, cssClass, time)
    }
}

/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function slideDown(elt: HTMLElement, time = 500) {
    const classList = elt.classList

    if (classList.contains('hidden')) {
        slideInDown(elt, time)
    } else {
        slideOutDown(elt, time)
    }
}

/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function slideUp(elt: HTMLElement, time = 500) {
    const classList = elt.classList

    if (classList.contains('hidden')) {
        slideInUp(elt, time)
    } else {
        slideOutUp(elt, time)
    }
}

/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function slideLeft(elt: HTMLElement, time = 500) {
    const classList = elt.classList

    if (classList.contains('hidden')) {
        slideInLeft(elt, time)
    } else {
        slideOutLeft(elt, time)
    }
}

/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function slideRight(elt: HTMLElement, time = 500) {
    const classList = elt.classList

    if (classList.contains('hidden')) {
        slideInRight(elt, time)
    } else {
        slideOutRight(elt, time)
    }
}
/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function slideOutUp(elt: HTMLElement, time = 500) {
    animationOut(elt, 'slide-out-up', time)
}

/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function slideOutDown(elt: HTMLElement, time = 600) {
    animationOut(elt, 'slide-out-down', time)
}

/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function slideOutLeft(elt: HTMLElement, time = 500) {
    animationOut(elt, 'slide-out-left', time)
}

/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function slideOutRight(elt: HTMLElement, time = 500) {
    animationOut(elt, 'slide-out-right', time)
}

/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function slideInUp(elt: HTMLElement, time = 500) {
    animationIn(elt, 'slide-in-up', time)
}

/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function slideInDown(elt: HTMLElement, time = 500) {
    animationIn(elt, 'slide-in-down', time)
}

/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function slideInRight(elt: HTMLElement, time = 500) {
    animationIn(elt, 'slide-in-right', time)
}

/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function slideInLeft(elt: HTMLElement, time = 500) {
    animationIn(elt, 'slide-in-left', time)
}

/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function fadeOut(elt: HTMLElement, time = 500) {
    animationOut(elt, 'fade-out', time)
}

/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function fadeIn(elt: HTMLElement, time = 500) {
    animationIn(elt, 'fade-in', time)
}

/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function zoomIn(elt: HTMLElement, time = 500) {
    animationIn(elt, 'zoom-in', time)
}

/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function zoomOut(elt: HTMLElement, time = 500) {
    animationOut(elt, 'zoom-out', time)
}

/**
 * 
 * @param elt HTMLElement
 * @param time in ms
 */
export function tada(elt: HTMLElement, time = 500) {
    animationOut(elt, 'show-up-clock', time)
}

