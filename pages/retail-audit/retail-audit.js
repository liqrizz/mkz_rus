import './retail-audit.scss';
import '@assets/reported.scss';
import '@assets/video.scss';
import {videoJs} from "@assets/utils";

/**
 * @type {NodeListOf<Element>}
 */

const collapsibleItems = document.querySelectorAll('[collapsible]');

/**
 * @type {HTMLDivElement}
 */
const scrollContainer = document.querySelector('.facts__scroll');

const scrollToBottom = () => {
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
}

const collapseBodies = document.querySelectorAll('.collapse__body');

let prevClickedIcon = null;

collapsibleItems.forEach(item => {
   const icon = item.querySelector('.mkz-plus');
   const body = item.querySelector('.collapse__body');

   if (icon && body) {
       icon.onclick = () => {
           const height = body.querySelector('.facts__subcategories')?.offsetHeight ?? 50;
           const isCollapsed = body && body.style?.maxHeight === '';

           collapseBodies.forEach(item => {
               item.style.marginBottom = '0';
               item.style.maxHeight = '';
           });

           if (prevClickedIcon?.style?.transform === 'rotate(45deg)') {
               prevClickedIcon.style.transform = '';
           }

           icon.style.transform = isCollapsed ? 'rotate(45deg)' : '';
           body.style.marginBottom = isCollapsed ? '2rem' : '';
           body.style.maxHeight = isCollapsed ? `${height}px` : '';

           if (isCollapsed && icon.classList.contains('lastItem')) {
               const interval = setInterval(scrollToBottom);
               setTimeout(() => {
                   clearInterval(interval);
               }, 250);
           }
           prevClickedIcon = icon;
       };
   }
});

const initSeeMoreHandler = ({listSelector, buttonId, showCount}) => {
    const geography__list = document.querySelector(listSelector);
    const children = Array.from(geography__list?.children || []).reverse();
    const seeMore = document.getElementById(buttonId);
    geography__list.innerHTML = '';

    const itemAppend = () => {
        for (let i = 0; (i < showCount && children.length); i++) {
            geography__list.append(children.pop())
        }

        if (children.length === 0) {
            seeMore.remove();
        }
    }
    itemAppend();

    if (seeMore) {
        seeMore.onclick = itemAppend;
    } else {
        console.error(`<button id="${buttonId}" ...> была не найдена`);
    }
}

if (window.matchMedia("(max-width: 767px)").matches) {
    const geographyListSettings = {
        listSelector: '.geography__list',
        buttonId: 'geo_see_more',
        showCount: 6
    }

    const auditCategoriesSettings = {
        listSelector: '.facts__scroll',
        buttonId: 'facts_see_more',
        showCount: 7
    }
    initSeeMoreHandler(geographyListSettings);
    initSeeMoreHandler(auditCategoriesSettings);
}

videoJs({
    containerSelector: '.video',
    playButtonSelector: '.video__play',
    id: 'retail',
    videoTextContainer: '.video__content'
});
