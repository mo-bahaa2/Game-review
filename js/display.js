export default class GameCardFetcher {
  constructor() {
    this.allCards = [];
    this.loaderElement = document.querySelector(".loader");
    this.rowElement = document.querySelector(".row");
    this.cardRowElement = document.querySelector(".carRow");
    this.linkElements = Array.from(document.querySelectorAll(".myLink"));

    // this.detailsSection = document.querySelector(".details"); // The details section
    // this.detailsContent = document.querySelector("#detailsContent");
    // this.secCard = document.querySelector(".secCard");
    // this.btnClose = document.getElementById("btnClose");

    // Add event listener for close button
    // this.addCloseButtonEvent();
  }

  // Add event listener for close button
  // addCloseButtonEvent() {
  //   if (this.btnClose) {
  //     this.btnClose.addEventListener('click', () => {
  //       this.detailsSection.classList.add('d-none'); // Hide details
  //       this.secCard.classList.remove('d-none');  // Show secCard
  //     });
  //   }
  // }

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
      const finalResults = await response.json();
      this.allCards = finalResults;
      this.displayCards();
    } catch (error) {
      this.showError("No games found for the selected category.");
    } finally {
      this.hideLoader();
    }
  }

  displayCards() {
    let cartona = '';
    for (let i = 0; i < this.allCards.length; i++) {
      const card = this.allCards[i];
      cartona += `
        <div class="col-lg-3 col-sm-6">
          <div class="card cardDetails" data-id="${card.id}">
            <div class="p-3">
              <img
                src="${card.thumbnail}"
                class="card-img-top w-100"
                alt="..."
              />
              <div class="card-body">
                <div
                  class="inner-card d-flex justify-content-between align-items-center font-family"
                >
                  <h3 class="card-title text-white h6">${card.title.split(" ", 4).join(" ")}</h3>
                  <span
                    class="text-capitalize text-white px-2 rounded-2 free"
                  >free</span>
                </div>
                <p class="card-text text-center text-white-50 small">
                  ${card.short_description.split(" ", 4).join(" ")}
                </p>
              </div>
            </div>
            <div
              class="card-footer d-flex justify-content-between align-items-center"
            >
              <span class="badge badge-color">${card.genre}</span>
              <span class="badge badge-color">${card.platform}</span>
            </div>
          </div>
        </div>
      `;
    }
    this.cardRowElement.innerHTML = cartona;

    // Attach event listeners to cards for showing details
    // bind(this) ensures that this inside showDetails refers to the GameCardFetcher instance, not the .cardDetails element being clicked.
    const cardElements = document.querySelectorAll('.cardDetails');
    cardElements.forEach(card => {
      card.addEventListener('click', this.showDetails.bind(this));
    });
  }

  // showDetails(e) {
  //   const cardId = e.currentTarget.dataset.id;
  //   this.secCard.classList.add('d-none');
  //   this.detailsSection.classList.remove('d-none');

  //   // Fetch the specific game details by ID
  //   this.fetchGameDetails(cardId);
  // }

  // async fetchGameDetails(id) {
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'x-rapidapi-key': '1534a02b72mshcec8bb3ff6f2cafp15ece4jsn17ab5a6b6802',
  //       'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
  //     }
  //   };

  //   const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
  //   const gameDetails = await response.json();

  //   // Update the details content with the fetched game details
  //   this.detailsContent.innerHTML = `
  //     <div class="col-md-4">
  //       <img src="${gameDetails.thumbnail}" class="w-100" alt="image-details" />
  //     </div>
  //     <div class="col-md-8 text-white">
  //       <h3 class="text-capitalize">${gameDetails.title}</h3>
  //       <p class="text-capitalize">
  //         Category:
  //         <span class="ms-2 badge text-bg-info px-2 text-capitalize">${gameDetails.genre}</span>
  //       </p>
  //       <p class="text-capitalize">
  //         Platform:
  //         <span class="ms-2 badge text-bg-info px-2 text-capitalize">${gameDetails.platform}</span>
  //       </p>
  //       <p class="text-capitalize">
  //         Status:
  //         <span class="ms-2 badge text-bg-info px-2 text-capitalize">${gameDetails.status}</span>
  //       </p>
  //       <p class="text-capitalize">
  //         ${gameDetails.description}
  //       </p>
  //       <a href="${gameDetails.game_url}" class="btn btn-outline-warning text-white text-capitalize">Show game</a>
  //     </div>
  //   `;
  // }

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
