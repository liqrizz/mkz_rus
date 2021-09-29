import 'normalize.css';
import '@assets/styles.scss';
import '@assets/mcKenZee-icons-v1.0/style.css';
import {clickOutside} from "@assets/utils";
import whiteLogo from '@assets/logo-white.svg';
import mainLogo from '@assets/logo.svg';

const onLoadFunction = () => {
    const navbar = document.querySelector('#navbar');
    const headerLogo = document.querySelector('#logo');
    const navLinks = document.getElementsByClassName('nav__link');
    const mq = window.matchMedia("(max-width: 1100px)");
    let swppaedLogoFlag = false;
    window.onscroll = () => {
        if (window.scrollY > 200 && !swppaedLogoFlag) {
            swppaedLogoFlag = true;
            console.log('мы заменили логотип');
            headerLogo.setAttribute('src', whiteLogo);
            navbar.classList.add('nav_colored');
            if (mq.matches) {
                for (let i = 0; i < (navLinks.length - 1); i++) {
                    navLinks[i].style.color = "#fff";
                }
            }
        } else if (window.scrollY <= 200 && swppaedLogoFlag) {
            headerLogo.setAttribute('src', mainLogo);
            navbar.classList.remove('nav_colored');
            if (mq.matches) {
                for (let i = 0; i < (navLinks.length - 1); i++) {
                    navLinks[i].style.color = "#000";
                }
            }
            swppaedLogoFlag = false;
        }
    };
}

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
    document.addEventListener('DOMContentLoaded', onLoadFunction, false);
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
