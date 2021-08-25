/**
 * @param {HTMLElement} elem
 * @return {boolean}
 */
export function isInViewPort(elem) {
    const bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        (bounding.bottom - 10) <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

/**
 * @param {NodeListOf<HTMLElement>} lazyBlocks
 * @return {void}
 */
export function lazyLoading(lazyBlocks) {
    lazyBlocks.forEach(item => {
        if (!item.dataset.loaded && isInViewPort(item)) {
            item.dataset.loaded = String('ok');
            item.setAttribute('src', item.dataset.src);
        }
    });
}

/**
 * @return {void}
 */
export function hoverToImage() {
    const hoverBlock = document.querySelectorAll('[hover]');
    document.onscroll = () => {
        hoverBlock.forEach(item => {
            if (!item.dataset.hover && isInViewPort(item)) {
                item.setAttribute('src', item.dataset.src);
                item.dataset.hover = 'ok';
            }
        })
    }
}

/**
 * @param {Element} elem
 * @param {Function} cb
 * @param {MouseEvent} event
 */
export function clickOutside(event, elem, cb) {
    const rect = elem.getBoundingClientRect();
    const xStart = rect.left;
    const xEnd = rect.right;
    const yStart = rect.top;
    const yEnd = rect.bottom;
    const xCondition = event.clientX >= xStart && event.clientX <= xEnd;
    const yCondition = event.clientY >= yStart && event.clientY <= yEnd;
    if (!(xCondition && yCondition)) {
        cb();
    }
}

function onClickPlay({id, containerSelector, button, videoTextContainer}) {
    /**
     * @type {HTMLVideoElement}
     */
    const video = document.getElementById(id);
    const container = document.querySelector(containerSelector);
    container.style.backgroundColor = '#000';
    document.querySelector('.video__bi')?.remove();
    document.querySelector(videoTextContainer)?.remove();
    if (video) {
        video.style.display = 'block';
        video.play().then();
        container.style.height = video.offsetHeight + 'px';
    }

    button.remove();
}

export function videoJs({playButtonSelector, id, containerSelector, videoTextContainer}) {
    const button = document.querySelector(playButtonSelector);
    if (button) {
        button.onclick = onClickPlay.bind(this, {id, containerSelector, button, videoTextContainer});
    }
}

