
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function buildNav() {
   
    const sections = document.querySelectorAll('section');
    const navList = document.getElementById('navbar__list');

    sections.forEach((section, index) => {
   
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        const sectionName = section.getAttribute('data-nav');
        const sectionNameAttribute = sectionName.replace(/\s/g, '').toLowerCase();

        anchor.innerText = sectionName;
        anchor.setAttribute('href', `#${sectionNameAttribute}`);
        anchor.setAttribute('id', `link_no${index + 1}`);
        listItem.appendChild(anchor);
        navList.appendChild(listItem);

      
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            scrollEvent(index + 1);
            sectionActivate(index + 1);
            navActivate(index + 1);
        });
    });
}


function scrollEvent(index) {
    const section = document.getElementById(`section${index}`);
    const position = section.offsetTop;

    window.scrollTo({
        left: 0,
        top: position,
        behavior: 'smooth'
    });
}


function sectionActivate(index) {
    const activeClass = 'your-active-class';
    const activeSection = document.querySelector(`.${activeClass}`);
    const newActiveSection = document.getElementById(`section${index}`);

    if (activeSection) {
        activeSection.classList.remove(activeClass);
    }
    newActiveSection.classList.add(activeClass);
}


function navActivate(index) {

    const activeNav = document.getElementById(`link_no${index}`);
    const otherNavs = document.querySelectorAll('a');

    otherNavs.forEach(nav => {
        nav.classList.remove('active-nav');
    });
    activeNav.classList.add('active-nav');
}


document.addEventListener('DOMContentLoaded', function() {
    buildNav();
});

document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        if (isInViewport(section)) {
            sectionActivate(index + 1);
            navActivate(index + 1);
        }
    });
});
