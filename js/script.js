// toggles
// color mode switch
let pbody = document.querySelector("body");
let toggl = document.querySelector(".togler");

toggl.addEventListener("click", function () {
  pbody.classList.toggle("light");
  toggl.classList.toggle("active");
});

// menu bar
let menubar = document.querySelector(".menu-bar");
let showcontent = document.querySelector(".fixed-pop");
let closecontent = document.querySelectorAll(".fixed-pop li");
let overlay = document.querySelector(".overlay");

menubar.addEventListener("click", function () {
  showcontent.classList.toggle("active");
  overlay.classList.toggle("active");
  menubar.classList.toggle("active");
});

overlay.addEventListener("click", function () {
  showcontent.classList.remove("active");
  overlay.classList.remove("active");
  menubar.classList.remove("active");
});
for (let i = 0; i < closecontent.length; i++) {
  closecontent[i].addEventListener("click", function () {
    showcontent.classList.remove("active");
    overlay.classList.remove("active");
    menubar.classList.remove("active");
  });
}
// form validation
let inps = document.querySelectorAll(".fname1");
let subtn = document.querySelector(".sub-btn button");
subtn.onclick = function () {
  for (let o = 0; o < inps.length; o++) {
    if (inps[o].value !== "") {
      inps[o].classList.add("active");
    } else {
      inps[o].classList.remove("active");
    }
  }
};
//  load animation
let body = document.querySelector("body");
let header = document.querySelector(".header-fade");
let title = document.querySelector(".title-tran");
let para = document.querySelector(".para-tran");
let btn = document.querySelector(".btn-tran");
let img = document.querySelector(".img-tran");
window.addEventListener("load", function () {
  header.style.marginTop = "1vh";
  // title
  title.style.transform = "translateX(0px)";
  title.style.opacity = "1";
  title.style.transition = "1s";
  // para
  para.style.transform = "translateX(0px)";
  para.style.opacity = "1";
  para.style.transition = "1s .2s";
  // button
  btn.style.transform = "translateX(0px)";
  btn.style.opacity = "1";
  btn.style.transition = "1s .4s";
  // image
  img.style.transform = "translateX(0px)";
  img.style.opacity = "1";
  img.style.transition = "1s .6s";
});

// scroll animation
let titletop = document.querySelector(".title-top");
let parabot = document.querySelector(".para-bottom");
let titletopp = document.querySelector(".title-top1");
let parabott = document.querySelector(".para-bottom1");
let titletoppp = document.querySelector(".title-top2");
let parabottt = document.querySelector(".para-bottom2");
let titletopppp = document.querySelector(".title-top3");
let atop = document.querySelector(".topd");
atop.onclick = function () {
  atop.style.animation = "ani 1s ease";
};
window.onscroll = function () {
  // home toggle
  if (document.documentElement.scrollTop < 700) {
    // atop.style.opacity = "0";
    // atop.style.transform = "rotateZ(-90deg) translateX(-80px)";
    atop.classList.remove("active");
    atop.style.animation = "none";
  } else {
    atop.classList.add("active");
    // atop.style.opacity = "1";
    // atop.style.transform = "rotateZ(-90deg) translateX(0px)";
  }
  // function call
  let scrollT = function (scroller, scroller1) {
    scroller.style.transform = "translateY(0px)";
    scroller.style.opacity = "1";
    scroller1.style.transform = "translateY(0px)";
    scroller1.style.opacity = "1";
  };
  let scrollB = function (scroller, scroller1) {
    scroller.style.transform = "translateY(-30px)";
    scroller.style.opacity = "0";
    scroller1.style.transform = "translateY(30px)";
    scroller1.style.opacity = "0";
  };
  // desktop size
  if (body.offsetWidth > 500) {
    if (
      document.documentElement.scrollTop > 250 &&
      document.documentElement.scrollTop < 800
    ) {
      scrollT(titletop, parabot);
    } else {
      scrollB(titletop, parabot);
    }
    if (
      document.documentElement.scrollTop > 2200 &&
      document.documentElement.scrollTop < 2750
    ) {
      scrollT(titletopp, parabott);
    } else {
      scrollB(titletopp, parabott);
    }
    if (
      document.documentElement.scrollTop > 3000 &&
      document.documentElement.scrollTop < 3550
    ) {
      scrollT(titletoppp, parabottt);
    } else {
      scrollB(titletoppp, parabottt);
    }
    if (
      document.documentElement.scrollTop > 3900 &&
      document.documentElement.scrollTop < 4450
    ) {
      scrollT(titletopppp);
    } else {
      scrollB(titletopppp);
    }
  } else {
    // mobile size
    if (
      document.documentElement.scrollTop > 400 &&
      document.documentElement.scrollTop < 1300
    ) {
      scrollT(titletop, parabot);
    } else {
      scrollB(titletop, parabot);
    }
    if (
      document.documentElement.scrollTop > 3600 &&
      document.documentElement.scrollTop < 4300
    ) {
      scrollT(titletopp, parabott);
    } else {
      scrollB(titletopp, parabott);
    }
    if (
      document.documentElement.scrollTop > 5000 &&
      document.documentElement.scrollTop < 5800
    ) {
      scrollT(titletoppp, parabottt);
    } else {
      scrollB(titletoppp, parabottt);
    }
    if (
      document.documentElement.scrollTop > 6600 &&
      document.documentElement.scrollTop < 7200
    ) {
      scrollT(titletopppp);
    } else {
      scrollB(titletopppp);
    }
  }
};
window.addEventListener("scroll", function () {
  let scrollV = window.scrollY;
  if (scrollV < 500) {
    title.style.transform = "translateX(" + scrollV * -0.5 + "px)";
    title.style.transition = "0.8s";
    para.style.transform = "translateX(" + scrollV * -0.4 + "px)";
    para.style.transition = "0.6s";
    btn.style.transform = "translateX(" + scrollV * -0.3 + "px)";
    btn.style.transition = "0.5s";
  }

  if (body.offsetWidth < 500) {
    // small screen
    if (300 < scrollV && 1000 > scrollV) {
      img.style.transform = "translateX(" + (scrollV * 0.3 - 90) + "px)";
      img.style.transition = "all 0.2s";
    } else {
      img.style.transform = "translateX(0px)";
    }
  } else {
    if (scrollV < 600) {
      img.style.transform = "translateX(" + scrollV * 0.6 + "px)";
      img.style.transition = "all 0.5s 0s";
    }
  }
});

if (window.innerWidth < 1050) {
  showcontent.classList.add("con-til");
} else {
  showcontent.classList.remove("con-til");
}
