const slides = document.querySelectorAll(".bg-slide");

let currentSlide = 0;

function changeSlide() {
  if (slides.length === 0) return;

  slides[currentSlide].classList.remove("active");

  currentSlide = (currentSlide + 1) % slides.length;

  slides[currentSlide].classList.add("active");
}

if (slides.length > 0) {
  setInterval(changeSlide, 7000);
}

const layoutToggle = document.querySelector(".layout-toggle");
const photoGrid = document.querySelector(".photo-grid");
const loadMoreBtn = document.querySelector(".load-more-btn");
const photoCards = Array.from(document.querySelectorAll(".photo-card"));
const extraPhotos = Array.from(document.querySelectorAll(".extra-photo"));

let photosExpanded = false;

function getPhotoLimit() {
  const isMobile = window.matchMedia("(max-width: 760px)").matches;
  const isSmallLayout = photoGrid && photoGrid.classList.contains("grid-view");

  if (isMobile && isSmallLayout) return 8;
  if (isMobile) return 4;

  return photoCards.length - extraPhotos.length;
}

function updatePhotoVisibility() {
  const limit = getPhotoLimit();
  const remaining = Math.max(photoCards.length - limit, 0);

  photoCards.forEach((card, index) => {
    const shouldShow = photosExpanded || index < limit;

    card.classList.toggle("photo-mobile-hidden", !shouldShow);

    if (card.classList.contains("extra-photo")) {
      card.classList.toggle("is-visible", shouldShow);
    }
  });

  if (loadMoreBtn) {
    if (remaining <= 0) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "inline-block";
      loadMoreBtn.innerHTML = photosExpanded
  ? "LOAD LESS <span>↑</span>"
  : "LOAD MORE <span>↓</span>";
    }
  }
}

if (layoutToggle && photoGrid) {
  layoutToggle.addEventListener("click", () => {
    photoGrid.classList.toggle("grid-view");
    layoutToggle.classList.toggle("is-active");

    photosExpanded = false;
    updatePhotoVisibility();
  });
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    photosExpanded = !photosExpanded;
    updatePhotoVisibility();
  });
}

window.addEventListener("resize", () => {
  photosExpanded = false;
  updatePhotoVisibility();
});

updatePhotoVisibility();


const writingCards = document.querySelectorAll(".writing-card");

writingCards.forEach((card) => {
  card.addEventListener("click", () => {
    const link = card.getAttribute("data-link");

    if (link) {
      window.location.href = link;
    }
  });
});

const projectLoadBtn = document.querySelector(".project-load-btn");
const extraProjects = document.querySelectorAll(".extra-project");

let projectsExpanded = false;

if (projectLoadBtn && extraProjects.length > 0) {
  const projectsToLoad = Array.from(extraProjects).slice(0, 2);

  projectLoadBtn.addEventListener("click", () => {
    projectsExpanded = !projectsExpanded;

    projectsToLoad.forEach((project) => {
      project.classList.toggle("is-visible", projectsExpanded);
    });

    projectLoadBtn.innerHTML = projectsExpanded
      ? "LOAD LESS <span>↑</span>"
      : "LOAD MORE <span>+2</span>";
  });
}

const projectImages = document.querySelectorAll(".project-image");

projectImages.forEach((projectImage) => {
  const img = projectImage.querySelector("img");
  const prevBtn = projectImage.querySelector(".project-prev");
  const nextBtn = projectImage.querySelector(".project-next");
  const dots = projectImage.querySelectorAll(".project-dots button");

  if (!img || !prevBtn || !nextBtn || dots.length === 0) return;

  const images = img.dataset.images.split("|");
  let currentIndex = 0;

  function updateProjectImage(index) {
    currentIndex = index;
    img.src = images[currentIndex];

    dots.forEach((dot) => dot.classList.remove("is-active"));
    dots[currentIndex].classList.add("is-active");
  }

  prevBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const nextIndex = (currentIndex - 1 + images.length) % images.length;
    updateProjectImage(nextIndex);
  });

  nextBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const nextIndex = (currentIndex + 1) % images.length;
    updateProjectImage(nextIndex);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", (event) => {
      event.stopPropagation();
      updateProjectImage(index);
    });
  });
});

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const link = card.getAttribute("data-link");

    if (link && link !== "#") {
      window.location.href = link;
    }
  });
});

const publicationRows = document.querySelectorAll(".publication-row");

publicationRows.forEach((row) => {
  row.addEventListener("click", () => {
    const link = row.getAttribute("data-link");

    if (link && link !== "#") {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  });
});

const readingTiles = document.querySelectorAll(".reading-tile");

readingTiles.forEach((tile) => {
  const audio = tile.querySelector("audio");

  tile.addEventListener("mouseenter", () => {
    if (!audio) return;

    audio.currentTime = 0;
    audio.volume = 0.45;

    audio.play().catch(() => {
      // Browser may block hover audio until the user clicks once.
    });
  });

  tile.addEventListener("mouseleave", () => {
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  });

  tile.addEventListener("click", () => {
    const link = tile.getAttribute("data-link");

    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  });
});

const footerThanks = document.querySelector(".footer-thanks");

if (footerThanks) {
  const thanksObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footerThanks.classList.add("is-sparkling");

          setTimeout(() => {
            footerThanks.classList.remove("is-sparkling");
          }, 10000);

          thanksObserver.disconnect();
        }
      });
    },
    { threshold: 0.6 }
  );

  thanksObserver.observe(footerThanks);
}

/* PROJECT DETAIL CAROUSELS */

const projectCarousels = document.querySelectorAll(".project-carousel");

projectCarousels.forEach((carousel) => {
  const image = carousel.querySelector(".project-carousel-image");
  const prevBtn = carousel.querySelector(".project-carousel-prev");
  const nextBtn = carousel.querySelector(".project-carousel-next");
  const dotsWrap = carousel.querySelector(".project-carousel-dots");
  const count = carousel.querySelector(".project-carousel-count");
  const currentText = carousel.querySelector(".project-carousel-current");
  const totalText = carousel.querySelector(".project-carousel-total");
  const caption = carousel.querySelector(".project-carousel-caption");

  if (!image || !prevBtn || !nextBtn || !dotsWrap) return;

  const imageData =
    carousel.dataset.images ||
    image.dataset.images ||
    image.getAttribute("src") ||
    "";

  const images = imageData
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  if (images.length === 0) return;

  const captionData =
    carousel.dataset.captions ||
    image.dataset.captions ||
    "";

  const captions = captionData
    .split("|")
    .map((item) => item.trim());

  const fitData =
    carousel.dataset.fit ||
    image.dataset.fit ||
    "";

  const fitModes = fitData
    .split("|")
    .map((item) => item.trim());

  let currentIndex = 0;

  dotsWrap.innerHTML = "";

  images.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to image ${index + 1}`);

    dot.addEventListener("click", () => {
      updateCarousel(index);
    });

    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll("button");

  function updateCarousel(index) {
    currentIndex = index;

    image.src = images[currentIndex];

    image.classList.toggle(
      "is-contain",
      fitModes[currentIndex] === "contain"
    );

    dots.forEach((dot) => dot.classList.remove("is-active"));

    if (dots[currentIndex]) {
      dots[currentIndex].classList.add("is-active");
    }

    const currentNumber = String(currentIndex + 1).padStart(2, "0");
    const totalNumber = String(images.length).padStart(2, "0");

    if (currentText && totalText) {
      currentText.textContent = currentNumber;
      totalText.textContent = totalNumber;
    } else if (count) {
      count.textContent = `${currentNumber} / ${totalNumber}`;
    }

    if (caption) {
      const captionText = captions[currentIndex] || "";
      caption.textContent = captionText;
      caption.style.display = captionText ? "block" : "none";
    }
  }

  prevBtn.addEventListener("click", () => {
    const nextIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel(nextIndex);
  });

  nextBtn.addEventListener("click", () => {
    const nextIndex = (currentIndex + 1) % images.length;
    updateCarousel(nextIndex);
  });

  updateCarousel(0);
});

/* PROJECT DETAIL NEXT PROJECT LINK */

const normalProjectSequence = [
  "assistive-mobility.html",
  "aura-mist.html",
  "retro-walk.html",
  "reviving-culture.html",
  "hfd-iitb.html",
  "connectEd.html"
];

const hciApplicationProjectSequence = [
  "assistive-mobility.html",
  "aura-mist.html",
  "retro-walk.html",
  "hfd-iitb.html"
];

const isHciApplication =
  document.referrer.includes("hci-application.html") ||
  window.location.search.includes("hci=true");

const projectSequence = isHciApplication
  ? hciApplicationProjectSequence
  : normalProjectSequence;

const nextProjectLink = document.querySelector(".project-next-link");

if (nextProjectLink) {
  const currentPage = window.location.pathname.split("/").pop();
  const currentIndex = projectSequence.indexOf(currentPage);

  if (currentIndex !== -1) {
    const nextIndex = (currentIndex + 1) % projectSequence.length;
    nextProjectLink.href = projectSequence[nextIndex];
  }
}

/* ---- IMAGE LOADING ---- */

document.querySelectorAll("img").forEach((img) => {
  img.setAttribute("loading", "lazy");
  img.setAttribute("decoding", "async");
});