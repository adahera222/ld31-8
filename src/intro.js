var Q = require("q");
var QanimationFrame = require("qanimationframe");
var _ = require("lodash");
var Zanimo = require("zanimo");
var dom = require("./dom");
var waitNextClick = require("./waitNextClick");

var el = document.createElement("div");
el.className = "intro";

var title = document.createElement("h1");
title.className = 'title';
title.innerHTML = dom.$title.innerHTML;
el.appendChild(title);

var btns = document.createElement("div");
btns.className = "menu";
var easy = document.createElement('button');
easy.className = 'start easy';
easy.innerHTML = 'Easy';
btns.appendChild(easy);
var medium = document.createElement('button');
medium.className = 'start medium';
medium.innerHTML = 'Medium';
btns.appendChild(medium);
var hard = document.createElement('button');
hard.className = 'start hard';
hard.innerHTML = 'Hard';
btns.appendChild(hard);
el.appendChild(btns);

function intro () {
  dom.$help.innerHTML = "";
  dom.opacity(dom.$title, 0);
  dom.opacity(dom.$cancel, 0);
  dom.$game.innerHTML = "";
  dom.$game.appendChild(el);
  var mode;
  return Zanimo.transform(el, "translate(0, -100px) scale(0.5)")
    .then(Zanimo.transitionf("transform", "translate(0, 100px) scale(1)", 200, "ease-out"))
    .then(_.partial(waitNextClick, btns))
    .then(function (target) {
      mode = _.indexOf(btns.children, target);
    })
    .then(_.partial(dom.opacity, btns, 0))
    .thenResolve(el)
    .then(Zanimo.transitionf("transform", "translate(0, -100px) scale(0.5)", 500, "ease-out"))
    .then(_.partial(dom.opacity, dom.$title, 1))
    .then(_.partial(dom.opacity, dom.$cancel, 1))
    .then(_.partial(dom.hide, el))
    .then(function(){
      return mode;
    });

}

module.exports = intro;
