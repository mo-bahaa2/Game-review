export default class detailsCard {
  constructor() {
      this.detailsSection = document.querySelector(".details");
      this.detailsContent = document.querySelector("#detailsContent");
      this.secCard = document.querySelector(".secCard");
      this.btnClose = document.getElementById("btnClose");
  }

  addCloseButtonEvent() {
      if (this.btnClose) {
          this.btnClose.addEventListener('click', () => {
              this.detailsSection.classList.add('d-none'); 
              this.secCard.classList.remove('d-none');  
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

      this.detailsContent.innerHTML = `
      <div class="col-md-4">
          <img src="${gameDetails.thumbnail}" class="w-100" alt="image-details" />
      </div>
      <div class="col-md-8 text-white">
          <h3 class="text-capitalize">${gameDetails.title}</h3>
          <p>Category: <span class="badge text-bg-info">${gameDetails.genre}</span></p>
          <p>Platform: <span class="badge text-bg-info">${gameDetails.platform}</span></p>
          <p>Status: <span class="badge text-bg-info">${gameDetails.status}</span></p>
          <p>${gameDetails.description}</p>
          <a href="${gameDetails.game_url}" target="_blank" class="btn btn-outline-warning">Show Game</a>
      </div>
      `;
  }

  detailsCardEventListeners() {
      const cardElements = document.querySelectorAll('.cardDetails');
      cardElements.forEach(card => {
          card.addEventListener('click', (e) => {
              const cardId = card.dataset.id;
              this.fetchGameDetails(cardId);
              this.detailsSection.classList.remove('d-none');
              this.secCard.classList.add('d-none');
          });
      });
  }
}
