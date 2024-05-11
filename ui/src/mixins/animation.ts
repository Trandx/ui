/**
 * 
 * @param elt HtmlElement
 * @param time in ms
 */
export function slideDown(elt: any, time =  500) {
    const t = time/1000
    const classList = elt.classList

    classList?.add(`animate-[slide-down_${t}s]`)

    setTimeout(() => {
            classList?.remove(`animate-[slide-down_${t}s]`)
            //classList.add('hidden')
        },
        time
    );
}

/**
 * 
 * @param elt HtmlElement
 * @param time in ms
 */
export function slideUp(elt: any, time =  500) {
    const t = time/1000
    const classList = elt.classList

    classList?.add(`animate-[slide-up_${t}s]`)

    setTimeout(() => {
            classList?.remove(`animate-[slide-up_${t}s]`)
            classList.add('hidden')
        },
        time
    );
}

/**
 * 
 * @param elt HtmlElement
 * @param time in ms
 */
export function slideLeft(elt: any, time =  500) {
    const t = time/1000
    const classList = elt.classList

    classList?.add(`animate-[slide-left_${t}s]`)

    setTimeout(() => {
            classList?.remove(`animate-[slide-left_${t}s]`)
            classList.add('hidden')
        },
        time
    );
}

/**
 * 
 * @param elt HtmlElement
 * @param time in ms
 */
export function slideRight(elt: any, time =  500) {
    const t = time/1000
    const classList = elt.classList

    classList?.add(`animate-[slide-right_${t}s]`)

    setTimeout(() => {
            classList?.remove(`animate-[slide-right_${t}s]`)
            classList.add('hidden')
        },
        time
    );
}
/**
 * 
 * @param elt HtmlElement
 * @param time in ms
 */
export function slideOutUp(elt: any, time =  500) {
    const t = time/1000
    const classList = elt.classList

    classList?.add(`animate-[slide-out-up_${t}s]`)

    setTimeout(() => {
            classList?.remove(`animate-[slide-out-up_${t}s]`)
            //classList.add('hidden')
        },
        time
    );
}

/**
 * 
 * @param elt HtmlElement
 * @param time in ms
 */
export function slideOutDown(elt: any, time =  500) {
    const t = time/1000
    const classList = elt.classList

    classList?.add(`animate-[slide-out-down_${t}s]`)

    setTimeout(() => {
            classList.remove(`animate-[slide-out-down_${t}s]`)
            classList.add('hidden')
        },
        time
    );
}

/**
 * 
 * @param elt HtmlElement
 * @param time in ms
 */
export function slideOutLeft(elt: any, time =  500) {
    const t = time/1000
    const classList = elt.classList

    classList?.add(`animate-[slide-out-left_${t}s]`)

    setTimeout(() => {
            classList?.remove(`animate-[slide-out-left_${t}s]`)
            classList.add('hidden')
        },
        time
    );
}

/**
 * 
 * @param elt HtmlElement
 * @param time in ms
 */
export function slideOutRight(elt: any, time =  500) {
    const t = time/1000
    const classList = elt.classList

    classList?.add(`animate-[slide-out-right_${t}s]`)

    setTimeout(() => {
            classList?.remove(`animate-[slide-out-right_${t}s]`)
            classList.add('hidden')
        },
        time
    );
}

/**
 * 
 * @param elt HtmlElement
 * @param time in ms
 */
export function slideInUp(elt: any, time =  500) {
    const t = time/1000
    const classList = elt.classList

    classList.remove('hidden')
    classList?.add(`animate-[slide-in-up_${t}s]`)

}

/**
 * 
 * @param elt HtmlElement
 * @param time in ms
 */
export function slideInDown(elt: any, time =  500) {
    const t = time/1000
    const classList = elt.classList

    classList.remove('hidden')
    classList?.add(`animate-[slide-in-down_${t}s]`)

     setTimeout(() => {
            classList?.remove(`animate-[slide-in-down_${t}s]`)
        },
        time+500
    );
}

/**
 * 
 * @param elt HtmlElement
 * @param time in ms
 */
export function slideInRight(elt: any, time =  500) {
    const t = time/1000
    const classList = elt.classList

    classList.remove('hidden')
    classList?.add(`animate-[slide-in-right_${t}s]`)

}

/**
 * 
 * @param elt HtmlElement
 * @param time in ms
 */
export function slideInLeft(elt: any, time =  500) {
    const t = time/1000
    const classList = elt.classList

    classList.remove('hidden')
    classList?.add(`animate-[slide-in-left_${t}s]`)

}

/**
 * 
 * @param elt HtmlElement
 * @param time in ms
 */
export function fadeOut(elt: any, time =  500) {
    const t = time/1000
    const classList = elt.classList

    classList?.add(`animate-[fade-out_${t}s]`)

    // setTimeout(() => {
    //         classList?.remove(`animate-[fade-out_${t}s]`)
    //         classList.add('hidden')
    //     },
    //     time
    // );
}

/**
 * 
 * @param elt HtmlElement
 * @param time in ms
 */
export function fadeIn(elt: any, time =  500) {
    const t = time/1000
    const classList = elt.classList

    classList.remove('hidden')
    classList.add(`animate-[fade-in_${t}s]`)
}

