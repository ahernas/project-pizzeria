import {templates, settings, select, classNames} from '../settings.js';

class Home {
  constructor(element) {
    const thisHome = this;

    thisHome.getData(element);
  }

  render(element, home) {
    const thisHome = this;

    const generatedHTML = templates.homePage({
      quotes: home.quotes,
      images: home.images
    });

    thisHome.dom = {};
    thisHome.dom.wrapper = element;

    thisHome.dom.wrapper.innerHTML = generatedHTML;

    thisHome.dom.buttonOrder = thisHome.dom.wrapper.querySelector(select.home.buttonOrder);
    thisHome.dom.buttonBooking = thisHome.dom.wrapper.querySelector(select.home.buttonBooking);

    thisHome.pages = document.querySelector(select.containerOf.pages).children;
    thisHome.navLinks = document.querySelectorAll(select.nav.links);

    thisHome.dom.buttonOrder.addEventListener('click', function () {
      thisHome.activatePage('order');
    });

    thisHome.dom.buttonBooking.addEventListener('click', function () {
      thisHome.activatePage('booking');
    });
  }

  activatePage(pageId) {
    const thisHome = this;

    for (let page of thisHome.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    for (let link of thisHome.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }

  }

  getData(element) {
    const thisHome = this;

    const urls = {
      home: settings.db.url + '/' + settings.db.home,
    };
    fetch(urls.home)
      .then(function (homeResponse) {
        return homeResponse.json();
      })
      .then(function (home) {
        thisHome.render(element, home);
        $('.carousel').carousel({
          interval: 2000
        });
      });

  }
}

export default Home;
