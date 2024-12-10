import GameCardFetcher from './display.js';
import detailsCard from './details.js';
import uiDe from './ui.js';
let myUI=new uiDe();
myUI.displayUI();
const myDetails=new detailsCard();
const myGame = new GameCardFetcher();

myGame.getCards("mmorpg");
myGame.initLinkEvents();

setTimeout(() => {
    myDetails.detailsCardEventListeners();
    myDetails.addCloseButtonEvent();
    }, 1000);

    