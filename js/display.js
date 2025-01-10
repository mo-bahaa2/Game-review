import detailsCard from './details.js';

export default class GameCardFetcher {
    constructor() {
        this.allCards = [];
        this.loaderElement = document.querySelector(".loader");
        this.rowElement = document.querySelector(".row");
        this.cardRowElement = document.querySelector(".carRow");
        this.linkElements = Array.from(document.querySelectorAll(".myLink"));
    }

    async getCards(category) {
        try {
            this.showLoader();
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '1534a02b72mshcec8bb3ff6f2cafp15ece4jsn17ab5a6b6802',
                    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                }
            };

            const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
            this.allCards = await response.json();
            this.displayCards();
        } catch (error) {
            this.showError("No games found for the selected category.");
        } finally {
            this.hideLoader();
        }
    }

    displayCards() {
        let cartona = '';
        for (let card of this.allCards) {
            cartona += `
            <div class="col-lg-3 col-sm-6">
                <div class="card cardDetails" data-id="${card.id}">
                    <div class="p-3">
                        <img src="${card.thumbnail}" class="card-img-top w-100" alt="..."/>
                        <div class="card-body">
                            <div class="inner-card d-flex justify-content-between align-items-center font-family">
                                <h3 class="card-title text-white h6">${card.title}</h3>
                                <span class="text-capitalize text-white px-2 rounded-2 free">free</span>
                            </div>
                            <p class="card-text text-center text-white-50 small">${card.short_description.slice(" ",20)}</p>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <span class="badge badge-color">${card.genre}</span>
                        <span class="badge badge-color">${card.platform}</span>
                    </div>
                </div>
            </div>
            `;
        }
        this.cardRowElement.innerHTML = cartona;

        // FIX: Reattach event listeners after card rendering
        const myDetails = new detailsCard();
        myDetails.detailsCardEventListeners();
    }

    showLoader() {
        this.loaderElement.classList.remove("d-none");
    }

    hideLoader() {
        this.loaderElement.classList.add("d-none");
    }

    showError(message) {
        this.rowElement.innerHTML = `<div class="alert alert-danger">${message}</div>`;
    }

    setActiveLink(e) {
        this.linkElements.forEach(link => link.classList.remove("active"));
        e.target.classList.add("active");
    }

    initLinkEvents() {
        this.linkElements.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const category = e.target.textContent.trim().toLowerCase();
                this.getCards(category);
                this.setActiveLink(e);
            });
        });
    }
}
