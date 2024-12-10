export default  class uiDe{
    constructor(){
        this.uiDE=document.querySelector(".ui")
    }
    displayUI(){
        this.uiDE.innerHTML=`
        <header class="">
        <img src="./img/wraper.png" class="w-100" alt="" />
      </header>
      <nav
        class="navbar navbar-expand-lg w-75 m-auto rounded rounded-4 position-sticky position-absolute top-0 z-3"
      >
        <div class="container-fluid px-3">
          <a class="navbar-brand text-white fs-3" href="#"
            ><img src="./img/logo-sm.png" alt="logo" /> Game Reviews
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  class="myLink nav-link text-uppercase text-white active"
                  aria-current="page"
                  href="#"
                  >mmorpg</a
                >
              </li>
              <li class="nav-item">
                <a class="myLink nav-link text-uppercase text-white" href="#"
                  >shooter</a
                >
              </li>
              <li class="nav-item">
                <a class="myLink nav-link text-uppercase text-white" href="#"
                  >sailing</a
                >
              </li>
              <li class="nav-item">
                <a class="myLink nav-link text-uppercase text-white" href="#"
                  >permadeath</a
                >
              </li>
              <li class="nav-item">
                <a class="myLink nav-link text-uppercase text-white" href="#"
                  >superhero</a
                >
              </li>
              <li class="nav-item">
                <a class="myLink nav-link text-uppercase text-white" href="#">pixel</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        `
    }
}