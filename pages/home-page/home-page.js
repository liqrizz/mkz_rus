import {hoverToImage, isInViewPort, lazyLoading} from "@assets/utils";
import  './home-page.scss';
import '@assets/cities.scss';

let count = 0;
/**
 * @type {NodeListOf<HTMLElement>}
 **/
const lazyBlock = document.querySelectorAll('[lazy]');
hoverToImage();


let scrollTop = 0;

const sas = document.querySelector('.audit__decor_big');

window.onscroll = () => {
    if (count % 2 === 0) {
        scrollTop = document.documentElement.scrollTop;
        lazyLoading(lazyBlock);
        sas.style.transform = `translateY(${-scrollTop / 40}%)`;
    }
    count++;
};

/**
 * @type {HTMLVideoElement}
 */
const video = document.querySelector('#mainVideo');

video.onended = () => {
    if (!video.dataset.changed) {
        video.dataset.changed = String('ok');
        video.setAttribute('src', video.dataset.src);
        video.setAttribute('loop', '');
    }
};
