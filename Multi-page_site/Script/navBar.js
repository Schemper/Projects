export function navBar() {
  const html = `
    <ul class="steps__list">
      <li class="steps__item">
        <a class="steps__link js-steps__link" href="Step_1.html">1</a>
        <div class="step-info">
          <span class="step-text step-text--number">Step 1</span>
          <span class="step-text step-text--desc">Your Info</span>
        </div>
      </li>
      <li class="steps__item">
        <a class="steps__link js-steps__link" href="Step_2.html">2</a>
        <div class="step-info">
          <span class="step-text step-text--number">Step 2</span>
          <span class="step-text step-text--desc">Select Plan</span>
        </div>
      </li>
      <li class="steps__item">
        <a class="steps__link js-steps__link" href="Step_3.html">3</a>
        <div class="step-info">
          <span class="step-text step-text--number">Step 3</span>
          <span class="step-text step-text--desc">Add-Ons</span>
        </div>
      </li>
      <li class="steps__item">
        <a class="steps__link js-steps__link" href="Step_4.html">4</a>
        <div class="step-info">
          <span class="step-text step-text--number">Step 4</span>
          <span class="step-text step-text--desc">Summary</span>
        </div>
      </li>
    </ul>
  `

  document.querySelector('.js-steps')
  .innerHTML = html;

}

export function activePage() {
  const pageNumberLinks = document.querySelectorAll('.js-steps__link');
  const currentPage = window.location.pathname.split('/').pop();
  const footerNav = document.querySelector('.js-footer__link')


  pageNumberLinks.forEach( link => {
    const href = link.getAttribute('href');

    if (href === currentPage) {
      link.classList.add('active__page');
    }
  });

  if (currentPage !== 'Step_1.html' && footerNav) {
    footerNav.classList.add('footer__link--visible')
  }
}


function footerNav() {
  const html = `
    <nav class="footer__nav">
      <a class="footer__link js-footer__link" href="#">Go Back</a>
      <button class="footer__button" type="submit"  id="nextStepButton">
        Next Step
      </button>
    </nav>
  `;

  document.querySelector('.js-footer')
  .innerHTML = html;

  const steps = [
  'Step_1.html', 'Step_2.html', 'Step_3.html', 'Step_4.html'
  ];
  let currentPageIndex = steps.findIndex(
   step => step === window.location.pathname.split('/').pop()
  );
  const goBackLink = document.querySelector('.js-footer__link');

  if (goBackLink) {
    goBackLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPageIndex > 0) {
        currentPageIndex--;
        window.location.href = steps[currentPageIndex];
        getFromStorage();
      }
      
    });
  }
}

export function renderNavBars() {
  document.addEventListener('DOMContentLoaded', () => {
    navBar()
    footerNav()
    activePage();
  });
}