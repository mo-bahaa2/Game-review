export default class detailsCard{
    constructor(){
        
    this.detailsSection = document.querySelector(".details"); // The details section
    this.detailsContent = document.querySelector("#detailsContent");
    this.secCard = document.querySelector(".secCard");
    this.btnClose = document.getElementById("btnClose");
    }

    addCloseButtonEvent() {
        if (this.btnClose) {
          this.btnClose.addEventListener('click', () => {
            this.detailsSection.classList.add('d-none'); // Hide details
            this.secCard.classList.remove('d-none');  // Show secCard
          });
        }
      }

      async fetchGameDetails(id) {
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '1534a02b72mshcec8bb3ff6f2cafp15ece4jsn17ab5a6b6802',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
          }
        };
    
        const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
        const gameDetails = await response.json();
    
        // Update the details content with the fetched game details
        this.detailsContent.innerHTML = `
          <div class="col-md-4">
            <img src="${gameDetails.thumbnail}" class="w-100" alt="image-details" />
          </div>
          <div class="col-md-8 text-white">
            <h3 class="text-capitalize">${gameDetails.title}</h3>
            <p class="text-capitalize">
              Category:
              <span class="ms-2 badge text-bg-info px-2 text-capitalize">${gameDetails.genre}</span>
            </p>
            <p class="text-capitalize">
              Platform:
              <span class="ms-2 badge text-bg-info px-2 text-capitalize">${gameDetails.platform}</span>
            </p>
            <p class="text-capitalize">
              Status:
              <span class="ms-2 badge text-bg-info px-2 text-capitalize">${gameDetails.status}</span>
            </p>
            <p class="text-capitalize">
              ${gameDetails.description}
            </p>
            <a href="${gameDetails.game_url}" target="_blank" class="btn btn-outline-warning text-white text-capitalize">Show game</a>
          </div>
        `;
      }

      showDetails(e) {
        // const cardId = e.currentTarget.dataset.id;
        this.secCard.classList.add('d-none');
        this.detailsSection.classList.remove('d-none');
    
        // Fetch the specific game details by ID
        this.fetchGameDetails(e);
      }


      detailsCardEventListeners() {
        const cardElements = document.querySelectorAll('.cardDetails');
        for (let i = 0; i < cardElements.length; i++) {
            cardElements[i].addEventListener('click', (e) => {
                const cardId = cardElements[i].dataset.id; // Get game ID
                this.showDetails(cardId); // Show details for this ID
            });
        }
    }
}