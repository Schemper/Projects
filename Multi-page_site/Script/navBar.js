export function navBar() {
  const html = `
    <img src="images/bg-sidebar-mobile.svg" alt="">

    <div class="page_number">
      <a href="Step_1.html">
        <button>1</button>
      </a>
      <a href="Step_2.html">
        <button>2</button>
      </a>
      <a href="Step_3.html">
        <button>3</button>
      </a>
      <button>4</button>
    </div>
  `

  document.querySelector('.nav_bar')
  .innerHTML = html;

 activePage();
}

export function activePage() {
  document.addEventListener('DOMContentLoaded', () => {
    const pageNumberButtons = document.querySelectorAll('.page_number button');
    const currentPage = window.location.pathname.split('/').pop();


    pageNumberButtons.forEach(button => {
      const link = button.parentElement.getAttribute('href'); // Get href from parent <a> tag

      if (link === currentPage) {
        button.classList.add('active');
      }
    });
  });
}
