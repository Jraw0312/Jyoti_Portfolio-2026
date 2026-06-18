const detailPages = document.querySelector(
  ".project-detail-page, .article-page, .privacy-page"
);

if (detailPages && !document.querySelector(".detail-footer")) {
  const isNestedPage =
    window.location.pathname.includes("/projects/") ||
    window.location.pathname.includes("/writing/");

  const privacyPath = isNestedPage ? "../privacy.html" : "privacy.html";

  const footer = document.createElement("footer");
  footer.className = "detail-footer";

  footer.innerHTML = `
    <p>© 2026 — J. Rautela</p>

    <p>
      built and coded by myself.
      <a href="${privacyPath}">privacy</a>
    </p>
  `;

  document.body.appendChild(footer);
}