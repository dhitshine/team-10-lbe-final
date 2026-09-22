// Reveal sections on scroll; track the active section for nav state.
const reveal = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        reveal.unobserve(e.target);
      }
    }
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

const links = [...document.querySelectorAll(".nav-link")];
const byId = Object.fromEntries(links.map((l) => [l.hash, l]));
const spy = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      const link = byId[`#${e.target.id}`];
      if (!link) continue;
      if (e.isIntersecting) {
        links.forEach((l) => l.removeAttribute("aria-current"));
        link.setAttribute("aria-current", "true");
      }
    }
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
["work", "about", "contact"].forEach((id) => spy.observe(document.getElementById(id)));

document.getElementById("year").textContent = new Date().getFullYear();
