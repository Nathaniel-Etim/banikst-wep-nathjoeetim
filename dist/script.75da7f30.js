// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

if (module.hot) {
  module.hot.accept();
} ///////////////////////////////////////
// Modal window
// normalize storing each item in a variable
// understand event deligation


var modal = document.querySelector('.modal');
var overlay = document.querySelector('.overlay');
var btnCloseModal = document.querySelector('.btn--close-modal');
var btnsOpenModal = document.querySelectorAll('.btn--show-modal');
var header = document.querySelector(".header");
var nav = document.querySelector(".nav");
var tabs = document.querySelectorAll(".operations__tab");
var tabs_container = document.querySelector(".operations__tab-container");
var content_areas = document.querySelectorAll(".operations__content");
var btnScrollTo = document.querySelector(".btn--scroll-to");
var section1 = document.querySelector("#section--1");

var openModal = function openModal(i) {
  i.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

var closeModal = function closeModal(i) {
  // i.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (current, i) {
  return current.addEventListener("click", openModal);
});
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
}); // when you have a parent element carrying more than one child or an attribute has the same href, then it is recomended that we add an event listiner to the parent and then loop over the item with the same
// in order to get the effect on a particular item we use the target method to mark the item

var nav_link = document.querySelectorAll(".nav__link");
document.querySelector(".nav__links").addEventListener("click", function (e) {
  // we have to determine were the event actually happened ... and this is stured in e.target
  e.preventDefault(); //this will prevent default movement
  // matching strategy

  if (e.target.classList.contains("nav__link")) {
    var id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth"
    });
  }
}); // the tabbed component
// the oporation area ....

tabs_container.addEventListener('click', function (e) {
  e.preventDefault();
  var clicked = e.target.closest(".operations__tab"); // guard clause ....

  if (!clicked) return;
  tabs.forEach(function (tab) {
    tab.classList.remove("operations__tab--active");
  });
  var data_number = clicked.dataset.tab; // to remove the content from the content area

  content_areas.forEach(function (el) {
    el.classList.remove("operations__content--active");
  }); // active tabs

  clicked.classList.add("operations__tab--active"); // content tab

  document.querySelector(".operations__content--".concat(data_number)).classList.add("operations__content--active");
}); // havor effect on the nav_bar

var hover_effect = function hover_effect(e, opacity) {
  e.preventDefault();
  var target = e.target;

  if (target.classList.contains("nav__link")) {
    var siblings = target.closest(".nav").querySelectorAll(".nav__link");
    var logo = target.closest(".nav").querySelector("img");
    siblings.forEach(function (el) {
      if (target !== el) {
        // this other items that has the nav__link that and is not havor on will have the  effect
        return el.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
}; // passing an argument into an handeler


nav.addEventListener("mouseover", function (e) {
  hover_effect(e, 0.5);
});
nav.addEventListener("mouseout", function (e) {
  hover_effect(e, 1);
});
var bounding = nav.getBoundingClientRect(); // sticky navigation
// sticky note using the intersectional server API

var fixed_nav = function fixed_nav() {
  var sticky_nav = function sticky_nav(entries) {
    // whenever the target(section1) intersect the viewportby 10% (as stated in the object_options.threshold)
    var entry = entries[0]; // console.log(entry);

    if (!entry.isIntersecting) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  };

  var nav_head = nav.getBoundingClientRect().height;
  var observer = new IntersectionObserver(sticky_nav, {
    root: null,
    threshold: 0.1,
    rootMargin: "-".concat(nav_head, "px")
  }).observe(header);
};

fixed_nav(); // reveal sections

var section_animation = function section_animation() {
  var allsection = document.querySelectorAll(".section");

  var revealsection = function revealsection(entries, observer) {
    var _entries = _slicedToArray(entries, 1),
        entry = _entries[0]; // console.log(entry);


    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  };

  var sectionobserver = new IntersectionObserver(revealsection, {
    root: null,
    threshold: 0.4
  });
  allsection.forEach(function (section) {
    sectionobserver.observe(section);
    section.classList.add("section--hidden");
  });
  var btnScrollTo = document.querySelector(".btn--scroll-to");
  var section1 = document.querySelector("#section--1");
  var cords = section1.getBoundingClientRect();
};

section_animation();

var lazy_loader = function lazy_loader() {
  // the lazy loading images
  var load_img = function load_img(entries, observer) {
    var _entries2 = _slicedToArray(entries, 1),
        entry = _entries2[0];

    if (!entry.isIntersecting) return; // replace src with data src

    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function (e) {
      entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
  };

  var img_target = document.querySelectorAll("img[data-src]");
  var img_observer = new IntersectionObserver(load_img, {
    root: null,
    threshold: 0.1,
    rootMargin: "-200px"
  });
  img_target.forEach(function (target) {
    img_observer.observe(target);
  });
};

lazy_loader(); // the slide effect event

var all_slides = function all_slides() {
  var slides = document.querySelectorAll(".slide");
  var slider = document.querySelector(".slider");
  var btnleft = document.querySelector(".slider__btn--left");
  var btnright = document.querySelector(".slider__btn--right");
  var dot_container = document.querySelector(".dots");
  var current_slide = 0;
  var max_slide = slides.length; // the dot in the picture element

  var create_dot = function create_dot() {
    slides.forEach(function (_, i) {
      dot_container.insertAdjacentHTML("beforeend", "<button class=\"dots__dot\" data-slide=\"".concat(i, "\"></button>"));
    });
  };

  create_dot();

  var activate_dot = function activate_dot(slide) {
    document.querySelectorAll(".dots__dot").forEach(function (el, i) {
      el.classList.remove("dots__dot--active");
    });
    document.querySelector(".dots__dot[data-slide=\"".concat(slide, "\"]")).classList.add("dots__dot--active");
  };

  var go_to_slide = function go_to_slide(slide) {
    slides.forEach(function (el, i) {
      el.style.transform = "translateX(".concat(100 * (i - slide), "%)"); // current slide is one then as we loop over it will be 0 at the first index and then zero - 1 will be - i *100 0%,100%,300%,400%
    });
  };

  go_to_slide(0);
  activate_dot(0); // next slide

  var nextslide = function nextslide() {
    // setInterval(function () {
    if (current_slide === max_slide - 1) {
      current_slide = 0;
    } else {
      current_slide++;
    }

    go_to_slide(current_slide);
    activate_dot(current_slide); // }, 3000);
  };

  btnright.addEventListener("click", nextslide); // previous slide

  var previousslide = function previousslide() {
    if (current_slide === 0) {
      current_slide = max_slide - 0;
    }

    current_slide--;
    go_to_slide(current_slide);
    activate_dot(current_slide);
  };

  btnleft.addEventListener("click", previousslide);
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      nextslide();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      previousslide();
    }
  });
  dot_container.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      var slid = e.target.dataset.slide;
      activate_dot(slid);
      go_to_slide(slid);
    }
  });
};

all_slides(); // dot_container.prepend(message); //prepending here will add the element as the first  child of the header element
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
  section1.scrollIntoView({
    behavior: "smooth"
  }); // the getBoundingClientRect() method of doing things
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
}); // this_btm.addEventListener('click', function (i) {
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
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56770" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map