const slides = document.querySelectorAll(".bg-slide");

let currentSlide = 0;

function changeSlide() {
  slides[currentSlide].classList.remove("active");

  currentSlide = (currentSlide + 1) % slides.length;

  slides[currentSlide].classList.add("active");
}

setInterval(changeSlide, 7000);

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
        : `LOAD MORE <span>+${remaining}</span>`;
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
      window.open(link, "_blank", "noopener,noreferrer");
    }
  });
});

const projectLoadBtn = document.querySelector(".project-load-btn");
const extraProjects = document.querySelectorAll(".extra-project");

let projectsExpanded = false;

if (projectLoadBtn && extraProjects.length > 0) {
  projectLoadBtn.addEventListener("click", () => {
    projectsExpanded = !projectsExpanded;

    extraProjects.forEach((project) => {
      project.classList.toggle("is-visible", projectsExpanded);
    });

    projectLoadBtn.innerHTML = projectsExpanded
      ? "LOAD LESS <span>↑</span>"
      : "LOAD MORE <span>+4</span>";
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