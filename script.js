'use strict';

if (module.hot) {
  module.hot.accept();
}
///////////////////////////////////////
// Modal window
// normalize storing each item in a variable
// understand event deligation

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector(`.header`);
const nav = document.querySelector(`.nav`);
const tabs = document.querySelectorAll(`.operations__tab`);
const tabs_container = document.querySelector(`.operations__tab-container`);
const content_areas = document.querySelectorAll(`.operations__content`);
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);

const openModal = function (i) {
  i.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (i) {
  // i.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (current, i) {
  return current.addEventListener(`click`, openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// when you have a parent element carrying more than one child or an attribute has the same href, then it is recomended that we add an event listiner to the parent and then loop over the item with the same
// in order to get the effect on a particular item we use the target method to mark the item

const nav_link = document.querySelectorAll(`.nav__link`);

document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  // we have to determine were the event actually happened ... and this is stured in e.target
  e.preventDefault(); //this will prevent default movement

  // matching strategy
  if (e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
});

// the tabbed component
// the oporation area ....

tabs_container.addEventListener('click', function (e) {
  e.preventDefault();

  const clicked = e.target.closest(`.operations__tab`);

  // guard clause ....
  if (!clicked) return;

  tabs.forEach(function (tab) {
    tab.classList.remove(`operations__tab--active`);
  });

  const data_number = clicked.dataset.tab;

  // to remove the content from the content area
  content_areas.forEach(function (el) {
    el.classList.remove(`operations__content--active`);
  });

  // active tabs
  clicked.classList.add(`operations__tab--active`);
  // content tab
  document
    .querySelector(`.operations__content--${data_number}`)
    .classList.add(`operations__content--active`);
});

// havor effect on the nav_bar
const hover_effect = function (e, opacity) {
  e.preventDefault();

  const target = e.target;

  if (target.classList.contains(`nav__link`)) {
    const siblings = target.closest(`.nav`).querySelectorAll(`.nav__link`);
    const logo = target.closest(`.nav`).querySelector(`img`);

    siblings.forEach(function (el) {
      if (target !== el) {
        // this other items that has the nav__link that and is not havor on will have the  effect
        return (el.style.opacity = opacity);
      }
    });
    logo.style.opacity = opacity;
  }
};

// passing an argument into an handeler
nav.addEventListener(`mouseover`, function (e) {
  hover_effect(e, 0.5);
});

nav.addEventListener(`mouseout`, function (e) {
  hover_effect(e, 1);
});
const bounding = nav.getBoundingClientRect();

// sticky navigation
// sticky note using the intersectional server API

const fixed_nav = function () {
  const sticky_nav = function (entries) {
    // whenever the target(section1) intersect the viewportby 10% (as stated in the object_options.threshold)

    const entry = entries[0];
    // console.log(entry);

    if (!entry.isIntersecting) {
      nav.classList.add(`sticky`);
    } else {
      nav.classList.remove(`sticky`);
    }
  };
  const nav_head = nav.getBoundingClientRect().height;

  const observer = new IntersectionObserver(sticky_nav, {
    root: null,
    threshold: 0.1,
    rootMargin: `-${nav_head}px`,
  }).observe(header);
};
fixed_nav();

// reveal sections

const section_animation = function () {
  const allsection = document.querySelectorAll(`.section`);

  const revealsection = function (entries, observer) {
    const [entry] = entries;
    // console.log(entry);

    if (!entry.isIntersecting) return;

    entry.target.classList.remove(`section--hidden`);
    observer.unobserve(entry.target);
  };

  const sectionobserver = new IntersectionObserver(revealsection, {
    root: null,
    threshold: 0.4,
  });

  allsection.forEach(function (section) {
    sectionobserver.observe(section);
    section.classList.add(`section--hidden`);
  });

  const btnScrollTo = document.querySelector(`.btn--scroll-to`);
  const section1 = document.querySelector(`#section--1`);
  const cords = section1.getBoundingClientRect();
};
section_animation();

const lazy_loader = function () {
  // the lazy loading images

  const load_img = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    // replace src with data src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener(`load`, function (e) {
      entry.target.classList.remove(`lazy-img`);
    });
    observer.unobserve(entry.target);
  };

  const img_target = document.querySelectorAll(`img[data-src]`);

  const img_observer = new IntersectionObserver(load_img, {
    root: null,
    threshold: 0.1,
    rootMargin: `-200px`,
  });

  img_target.forEach(function (target) {
    img_observer.observe(target);
  });
};
lazy_loader();

// the slide effect event

const all_slides = function () {
  const slides = document.querySelectorAll(`.slide`);
  const slider = document.querySelector(`.slider`);
  const btnleft = document.querySelector(`.slider__btn--left`);
  const btnright = document.querySelector(`.slider__btn--right`);
  const dot_container = document.querySelector(`.dots`);

  let current_slide = 0;
  const max_slide = slides.length;

  // the dot in the picture element

  const create_dot = function () {
    slides.forEach(function (_, i) {
      dot_container.insertAdjacentHTML(
        `beforeend`,
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  create_dot();

  const activate_dot = function (slide) {
    document.querySelectorAll(`.dots__dot`).forEach(function (el, i) {
      el.classList.remove(`dots__dot--active`);
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add(`dots__dot--active`);
  };

  const go_to_slide = function (slide) {
    slides.forEach(function (el, i) {
      el.style.transform = `translateX(${100 * (i - slide)}%)`;
      // current slide is one then as we loop over it will be 0 at the first index and then zero - 1 will be - i *100 0%,100%,300%,400%
    });
  };
  go_to_slide(0);
  activate_dot(0);

  // next slide

  const nextslide = function () {
    // setInterval(function () {
    if (current_slide === max_slide - 1) {
      current_slide = 0;
    } else {
      current_slide++;
    }
    go_to_slide(current_slide);
    activate_dot(current_slide);

    // }, 3000);
  };

  btnright.addEventListener(`click`, nextslide);

  // previous slide

  const previousslide = function () {
    if (current_slide === 0) {
      current_slide = max_slide - 0;
    }
    current_slide--;
    go_to_slide(current_slide);
    activate_dot(current_slide);
  };

  btnleft.addEventListener(`click`, previousslide);

  document.addEventListener(`keydown`, function (e) {
    if (e.key === `ArrowRight`) {
      nextslide();
    }
  });

  document.addEventListener(`keydown`, function (e) {
    if (e.key === `ArrowLeft`) {
      previousslide();
    }
  });

  dot_container.addEventListener(`click`, function (e) {
    if (e.target.classList.contains(`dots__dot`)) {
      const slid = e.target.dataset.slide;
      activate_dot(slid);
      go_to_slide(slid);
    }
  });
};
all_slides();
// dot_container.prepend(message); //prepending here will add the element as the first  child of the header element

// // header.append(message.cloneNode(true)); // this adds the element as the

// sticky navigation

// window.addEventListener(`scroll`, function (e) {
//   const windows = this.scrollY;

//   if (windows > cords.top) {
//     nav.classList.add(`sticky`);
//   } else {
//     nav.classList.remove(`sticky`);
//   }
// });

btnScrollTo.addEventListener('click', function (i) {
  section1.scrollIntoView({ behavior: `smooth` });
  // the getBoundingClientRect() method of doing things

  // const s1cords = section1.getBoundingClientRect();
  // getBoundingClientRect() this will give you the coordinate of the item that it will be scrolled to this corordinate will based on the top and buttom of the viewport not the parent container
  // console.log(s1cords);

  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: `smooth`,
  // });
  // WE THE pagex and Y position does not really matter ... anyone can come first here the respond will be based on the parent container
  //the mordern way of dong this is

  /*first you select the docuent class that it will be selected to that will be document.queryselector(`.section--1`)*/
});
// this_btm.addEventListener('click', function (i) {
//   i.preventDefault();
//   const strol = the_area_to_scroll_too.getBoundingClientRect();

//   window.scrollTo(strol.right +window.pageYOffset, strol.top + windows.pageXOffset)
// });
// // /////////////// lectures ///////////
////////////// lectures //////////

//understanding the intersectionObservation API

//the new intersectionObserver is used to observe the change in the intersetion of the target or the observed element .. inside it is the boundingclientRect() content of the tageted area

// const observer_callBack1 = function (entries, observer) {
//   // whenever the target(section1) intersect the viewportby 10% (as stated in the object_options.threshold)

//   entries.forEach(function (entry) {
//     // nav.classList.add(`sticky`);
//     console.log(entry);
//   });
// };

// const reminder = new IntersectionObserver(observer_callBack1, {
//   root: null,
//   threshold: 0, //this states that 10% of the observed area should popup on the screen before in calles the observer_callBack function
//   rootMargin: `-${bounding.height}px`,
// });
// reminder.observe(section1);
// how to pass argument into an event handeler function
// const hover_effect = function (e, opacity) {
//   e.preventDefault();
//   if (e.target.classList.contains(`nav__link`)) {
//     const target = e.target;
//     const siblings = target.closest(`.nav`).querySelectorAll(`.nav__link`);
//     const logo = target.closest(`.nav`).querySelector(`img`);

//     siblings.forEach(function (el) {
//       if (target !== el) {
//         // this other items that has the nav__link that and is not havor on will have the  effect
//         return (el.style.opacity = opacity);
//       }
//     });

//     logo.style.opacity = opacity;
//   }
// };

// // passing an argument into an handeler
// nav.addEventListener(`mouseover`, function (e) {
//   hover_effect(e, 0.5);
// });

// nav.addEventListener(`mouseout`, function (e) {
//   hover_effect(e, 1);
// });

// the tabbed component

// dom traversing

//this is walking through the dom meaaning that we can't select an element based on another element

// note querySelector finds the children while the closest find the parent elemenet

// const h1 = document.querySelector(`h1`);

// // going downwards to the child element
// console.log(h1.querySelectorAll(`.highlight`));

// // for direct children
// console.log(h1.children);

// // first and last element child
// console.log(h1.firstElementChild);

// // for going upwards
// console.log(h1.parentElement);

// // for parent element that is not a direct parent
// h1.closest(`.header`);
// h1.closest(`h1`);

// console.log(h1.closest(`.header`));

// // selecting the siblines

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// // geting all the siblines
// console.log(h1.parentElement.children);
// console.log([...h1.parentElement.children]);

// // event deligation we need two steps
// // first...1.) add the event listiner to the common parent element of all the element we are interested in ....

// .2.)determine what element originated the event

// document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
//   // we have to determine were the event actually happened ... and this is stured in e.target
//   e.preventDefault();
//   // console.log(e.target);
//   // matching strategy
//   if (e.target.classList.contains(`nav__link`)) {
//     const id = e.target.getAttribute(`href`);
//     document.querySelector(id).scrollIntoView({ behavior: `smooth` });
//     console.log(e.target);
//   }
// });

// sample on the event deligation
// document
//   .querySelector(`the imediate primary element `)
//   .addEventListener(`click`, function (e) {
//     e.target;
//     if (
//       e.target.classList.contains(
//         `the class name all the element have in common `
//       )
//     ) {
//       const id = e.target.getAttribute(`href`);
//       document.querySelector(id).scrollIntoView({ behavior: `smooth` });
//     }
//   });

// hot to select , create and delete element on javascript
// // selecting element
// console.log(document.documentElement); // this is used to select the entire element of the document
// console.log(document.head); //this is used to select the head in a document
// console.log(document.body); //this is used to select the body of the html document

// // other methods are
// // for sorting of element
// const all_button = document.getElementsByTagName(`button`);
// console.log(all_button); // this will select all the element that has the element of button as shown above
// const class_name = document.getElementsByClassName(`btn`);
// console.log(class_name); // this wil select all the element with a particular className

// // for creating and inserting element

// // .insertAdjacentHTML()

// const message = document.createElement(`div`);
// message.classList.add(`cookie-message`);
// // message.textContent= `we use cookies for improved functionality and analytics.`
// message.innerHTML = `we use cookies for improved functionality and analytics.<button class="btn btn--close-cookie">got it!</button> `;
// header.prepend(message); //prepending here will add the element as the first  child of the header element

// // header.append(message.cloneNode(true)); // this adds the element as the last child to the header element
// // header.prepend(massage);
// // header.before(message);
// // header.after(message);

// // to delete element
// document
//   .querySelector(`.btn--close-cookie`)
//   .addEventListener('click', function () {
//     message.remove();
//   });

// // styleing with javascript
// // we already know the
// message.style.backgroundColor = `darkBlue`;
// message.style.width = `120%`;
// message.style.padding = `10px`;

// // to get the style
// console.log(getComputedStyle(message).height);
// // message.style.height =
// // Number.parseFloat(getComputedStyle(message).height, 10) + 40 + `px`;

// // changing css values using javascript

// document.documentElement.style.setProperty(`--color-primary`, `orangered`);

// // looking into manipating the atribute form javascript
// // this will enable us view the attribute of a selected class
// const logo_atribute = document.querySelector(`.nav__logo`);
// console.log(logo_atribute.alt);
// console.log(logo_atribute.src);
// console.log(logo_atribute.className);

// // to set attribute we use the set attribute ... e.g shown below
// logo_atribute.setAttribute(`company_name`, `bankist`);

// // sometimes we do need the attribute of a particular item .. we can use the get attribute
// console.log(logo_atribute.getAttribute(`src`));

// data attribute
// console.log(typeof logo_atribute.dataset.versionNumber);

// // CLASSES
// logo_atribute.classList.add(`c`);
// logo_atribute.classList.remove(`f`);
// logo_atribute.classList.toggle(`c`);
// logo_atribute.classList.contains(`c`);//we use the contains here and not includes as we do in javascript

// an event : this is a signal that is generated by a certain DOM note ... this simply means that something has happened

// the mouse enter event ..... this represent the hover effect that is being used in css

// const h1 = document.querySelector(`h1`);

// const alerth1 = function (i) {
//   alert(`note!! this is a header`);

//   h1.removeEventListener(`mouseenter`, alerth1);
// };
// // the mouseenter event eventListiner
// h1.addEventListener(`mouseenter`, alerth1);
// // setTimeout(function () {
// //   h1.removeEventListener(`mouseenter`, alerth1);
// // }, 3000);

// bubbling event eventListiner
// const randomInit = function (min, max) {
//   return Math.floor(Math.random() * (min - max * 1) + min);
// };
// const random_color = () =>
//   `rgb(${randomInit(3, 225)},${randomInit(2, 255)},${randomInit(0, 255)})`;

// console.log(random_color());
// document.querySelector(`.nav__link`).addEventListener(`click`, function (e) {
//   this.style.backgroundColor = `${random_color()}`;
//   e.stopPropagation(); //this will prevent the child element from affecting the parent element in the dom
// });

// document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
//   this.style.backgroundColor = random_color();
// });

// document.querySelector(`.nav`).addEventListener(`click`, function (e) {
//   this.style.backgroundColor = random_color();
// });
/*
event that occure in a dom during the web page lifecycle this simply what happens in a wep page until the user leaves it 

1. DOM content loaded this event is fired by the document as soon as the html is completly passed this means it has been downloaded and converted to the dom tree */

// document.addEventListener(`DOMContentLoaded`, function (e) {
// console.log(`html passed and DOM tree bilt!`, e);
// });

// the load event: when  the compete page has loaded this event get fired

// window.addEventListener(`load`, function (e) {
// console.log(` this is the load event `, e);
// });

// this is used to display a popup

// window.addEventListener(`beforeunload`, function (e) {
//   e.preventDefault();
//   e.returnValue = ``;
// });
