import '@assets/reported.scss';
import '@assets/video.scss';
import '@assets/cities.scss';
import './micro-regions.scss';
import {hoverToImage, videoJs} from "@assets/utils";

hoverToImage();

videoJs({
    containerSelector: '.video',
    playButtonSelector: '.video__play',
    id: 'regions',
    videoTextContainer: '.video__content'
});
