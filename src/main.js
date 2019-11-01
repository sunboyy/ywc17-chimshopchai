import axios from 'axios';

function renderNavList(navbarItems) {
  return navbarItems.map(({ href, label }) =>
    /*html*/`
      <li class="nav-item">
        <a href="${href}">${label}</a>
      </li>
    `
  ).reduce((prev, curr) => prev + curr);
};

import(/* webpackChunkName: "sanitize-html" */ 'sanitize-html').then(({ default: sanitizeHtml }) => {
  axios.get('https://panjs.com/ywc.json').then(({ data }) => {
    const navLists = document.getElementsByClassName('nav-list');
    for (const list of navLists) {
      list.innerHTML = renderNavList(data.navbarItems);
    }
    document.getElementById('data-duration').innerHTML = sanitizeHtml(data.duration);
    document.getElementById('data-detail').innerHTML = sanitizeHtml(data.detail);
    document.getElementById('data-condition').innerHTML = sanitizeHtml(data.condition);
  });
});

window.toggleMenu = () => {
  document.getElementById('menu-button').classList.toggle('on');
  document.getElementById('mobile-nav-list').classList.toggle('on');
  console.log('Yay');
}
