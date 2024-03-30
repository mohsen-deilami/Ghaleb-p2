const toggleIcon = document.querySelector(".nav__toggle-icon");
const menu = document.querySelector(".menu");
const cover = document.querySelector(".cover");
const resumeItems = document.querySelectorAll(".resume-list__item ");
const portfolioItems = document.querySelectorAll(".portfolio-list__item");
const menuItems = document.querySelectorAll(".menu__item");
const changeThemeBtn=document.querySelector(".change-theme");
const sections = document.querySelectorAll("main > section");
const lightModeIcon=`<svg viewBox="0 0 24 24"><path d="M7 12c0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5S7 9.2 7 12zM12 9c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3S10.3 9 12 9zM13 5V3c0-.6-.4-1-1-1s-1 .4-1 1v2c0 .6.4 1 1 1S13 5.6 13 5zM19.1 4.9c-.4-.4-1-.4-1.4 0l-1.4 1.4c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4C19.5 6 19.5 5.3 19.1 4.9zM21 11h-2c-.6 0-1 .4-1 1s.4 1 1 1h2c.6 0 1-.4 1-1S21.6 11 21 11zM17.7 16.2c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L17.7 16.2zM11 19v2c0 .6.4 1 1 1s1-.4 1-1v-2c0-.6-.4-1-1-1S11 18.4 11 19zM4.9 19.1c.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-1.4 1.4C4.5 18 4.5 18.7 4.9 19.1zM2 12c0 .6.4 1 1 1h2c.6 0 1-.4 1-1s-.4-1-1-1H3C2.4 11 2 11.4 2 12zM6.3 4.9c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4C6.5 8 6.8 8.1 7.1 8.1S7.6 8 7.8 7.8c.4-.4.4-1 0-1.4L6.3 4.9z"/></svg>`;
const darkModeIcon=  this.innerHTML=`<svg  viewBox="0 0 24 24"><path d="M12.3,4.9c0.4-0.2,0.6-0.7,0.5-1.1S12.2,3,11.7,3C6.8,3.1,3,7.1,3,12c0,5,4,9,9,9c3.8,0,7.1-2.4,8.4-5.9c0.2-0.4,0-0.9-0.4-1.2c-0.4-0.3-0.9-0.2-1.2,0.1c-1,0.9-2.3,1.4-3.7,1.4c-3.1,0-5.7-2.5-5.7-5.7C9.4,7.8,10.5,5.9,12.3,4.9zM15.1,17.4c0.5,0,1,0,1.4-0.1C15.3,18.4,13.7,19,12,19c-3.9,0-7-3.1-7-7c0-2.5,1.4-4.8,3.5-6c-0.7,1.1-1,2.4-1,3.8C7.4,14,10.9,17.4,15.1,17.4z"/></svg>`;


if(window.localStorage.getItem("theme")==="dark-mode"){  
  changeThemeBtn.innerHTML = lightModeIcon;
document.documentElement.classList.add('dark-mode'); 
}

toggleIcon.addEventListener("click", () => {
  toggleIcon.classList.toggle("nav__toggle-icon-open");
  menu.classList.toggle("menu--open");
  cover.classList.toggle("cover--show");
});

resumeItems.forEach((resumeitem) => {
  resumeitem.addEventListener("click", function () {
    document
      .querySelector(".resume-list__item--active")
      .classList.remove("resume-list__item--active");
    document
      .querySelector(".resume-content--show")
      .classList.remove("resume-content--show");
    //ابتدا آن ردیفی که فعال هست رو غیر فعال میکنه و در خط بعدی ردیف کلیک شده را فعال میکنه
    this.classList.add("resume-list__item--active");

    let contentId = this.getAttribute("data-content-id");
    let resumeContent = document.querySelector(contentId);
    console.log(resumeContent);
    resumeContent.classList.add("resume-content--show");
  });
});

portfolioItems.forEach((portfolioItem) => {
  portfolioItem.addEventListener("click", function () {
    document
      .querySelector(".portfolio-list__item--active")
      .classList.remove("portfolio-list__item--active");
    document
      .querySelector(".portfolio-content--show")
      .classList.remove("portfolio-content--show");

    this.classList.add("portfolio-list__item--active");

    let swiperId = this.getAttribute("data-portfolio-id");
    let swiperContent = document.querySelector(swiperId);
    swiperContent.classList.add("portfolio-content--show");
    console.log(swiperId);
    console.log(swiperContent);
  });
});


const observer = new IntersectionObserver(observerHandler,{
  threshold: 0.50
});

function observerHandler(allSection) {

  allSection.map(section => {
      let sectionClassName = section.target.className;
     
      let sectionMenuItem = document.querySelector(`.menu__item[data-section=${sectionClassName}]`);
      
      if (section.isIntersecting){
          sectionMenuItem.classList.add("menu__item--active");
      } else {
          sectionMenuItem.classList.remove("menu__item--active");
      }
  })
}


sections.forEach(section => {
  observer.observe(section);
})
////////////////////////////////activing header

menuItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
   document.querySelector(".menu__item--active").classList.remove("menu__item--active");
   item.classList.add("menu__item--active");
    let sectionId = item.getAttribute("data-section");

    let sectionOffsetTop = document.querySelector(`.${sectionId}`).offsetTop;
    //آفست تاپ هر سکشن را بدست می آورد
    
    window.scrollTo({
     top: sectionOffsetTop - 120,
      //عدد آفست را از اندازه ارتفاع هدر کم میکنیم
    });
  });
});

changeThemeBtn.addEventListener('click',function(){
  document.documentElement.classList.toggle('dark-mode');
   if(document.documentElement.classList.contains("dark-mode")){
this.innerHTML=lightModeIcon;
window.localStorage.setItem("theme","dark-mode")
}
else{
  this.innerHTML=darkModeIcon;
  window.localStorage.setItem("theme","light-mode")
  } 
  
})

