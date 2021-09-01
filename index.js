import 'normalize.css';
import '@assets/styles.scss';
import '@assets/mcKenZee-icons-v1.0/style.css';
import {clickOutside} from "@assets/utils";

if (window.matchMedia("(max-width: 767px)").matches) {
    /**
     * @type {HTMLButtonElement}
     */
    const showNavBarButton = document.querySelector('.mkz-burger') || document.querySelector('.mkz-burger-white');
    const navbarList = document.querySelector('.nav__items');
    /**
     * @type {HTMLButtonElement}
     */
    const hideNavBarButton = document.querySelector('.nav__close-button');
    showNavBarButton.onclick = () => {
        navbarList.classList.add('active');
    }

    hideNavBarButton.onclick = () => {
        navbarList.classList.remove('active');
    }

    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            navbarList.style.transition = '0.2s ease-in'
        }, 300)
    }, false);

    const select_lang = document.querySelector('.select-lang_mobile>span');

    if (select_lang) {
        select_lang.onclick = (e) => {
            select_lang.classList.toggle('active');
        }
    }
} else {
    /**
     * @type {HTMLDivElement}
     */
    const select_lang = document.querySelector('.select-lang>span');
    const lang_ul = document.querySelector('.lang-list');
    if (select_lang) {
        select_lang.onclick = (e) => {
            setTimeout(() => {
                if (e.target.classList.contains('nav__link')) {
                    select_lang.classList.toggle('active');
                }
            })
        }
    }
    document.addEventListener('click', (event) => {
        if (select_lang.classList.contains('active')) {
            clickOutside(event, lang_ul, () => {
                setTimeout(() => {
                    select_lang.classList.remove('active');
                });
            })
        }
    })
}
