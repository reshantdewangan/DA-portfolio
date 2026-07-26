// ==========================================================================
// Portfolio Interactivity Logic (Reshant Dewangan)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  let currentFilter = "all";
  let activeProjectIndex = 0;

  const projectsList = document.getElementById("projectsList");
  const filterTabs = document.querySelectorAll(".tab-btn");

  // Modal Elements
  const modal = document.getElementById("caseStudyModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalPrevBtn = document.getElementById("modalPrevBtn");
  const modalNextBtn = document.getElementById("modalNextBtn");

  const modalIconBadge = document.getElementById("modalIconBadge");
  const modalTitle = document.getElementById("modalTitle");
  const modalSummary = document.getElementById("modalSummary");
  const modalExternalLink = document.getElementById("modalExternalLink");
  const modalMetaClient = document.getElementById("modalMetaClient");
  const modalMetaTools = document.getElementById("modalMetaTools");
  const modalMetaType = document.getElementById("modalMetaType");
  const modalMetaDate = document.getElementById("modalMetaDate");

  const modalProblem = document.getElementById("modalProblem");
  const modalApproach = document.getElementById("modalApproach");
  const modalInsights = document.getElementById("modalInsights");
  const modalImpact = document.getElementById("modalImpact");

  // Toast Notification
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");

  // Email Copy Button
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const userEmail = "work.reshantde@gmail.com";

  // Contact Form
  const contactForm = document.getElementById("contactForm");

  // --------------------------------------------------------------------------
  // 1. Render Projects
  // --------------------------------------------------------------------------
  function renderProjects() {
    if (!projectsList) return;

    const filtered = PROJECTS_DATA.filter((proj) => {
      if (currentFilter === "all") return true;
      return proj.category === currentFilter;
    });

    projectsList.innerHTML = "";

    filtered.forEach((proj, idx) => {
      const card = document.createElement("div");
      card.className = "project-item-card";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");

      card.innerHTML = `
        <div class="project-left-content">
          <div class="project-icon-badge" style="background: ${proj.iconBg};">
            ${proj.iconText}
          </div>
          <div class="project-meta-info">
            <h3 class="project-title">${proj.title}</h3>
            <span class="project-tags">${proj.tools.join(" • ")}</span>
          </div>
        </div>
        <div class="project-chevron">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      `;

      card.addEventListener("click", () => {
        openCaseStudy(proj.id);
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openCaseStudy(proj.id);
        }
      });

      projectsList.appendChild(card);
    });
  }

  // Filter tab listeners
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentFilter = tab.getAttribute("data-filter");
      renderProjects();
    });
  });

  // --------------------------------------------------------------------------
  // 2. Case Study Modal Logic
  // --------------------------------------------------------------------------
  function openCaseStudy(projId) {
    const index = PROJECTS_DATA.findIndex((p) => p.id === projId);
    if (index === -1) return;

    activeProjectIndex = index;
    const proj = PROJECTS_DATA[index];

    modalIconBadge.style.background = proj.iconBg;
    modalIconBadge.textContent = proj.iconText;
    modalTitle.textContent = proj.title;
    modalSummary.textContent = proj.summary;
    modalExternalLink.href = proj.externalLink || "#";

    modalMetaClient.textContent = proj.client;
    modalMetaTools.textContent = proj.tools.join(", ");
    modalMetaType.textContent = proj.type;
    modalMetaDate.textContent = proj.date;

    modalProblem.textContent = proj.problem;
    modalApproach.textContent = proj.approach;

    modalInsights.innerHTML = "";
    proj.insights.forEach((ins) => {
      const li = document.createElement("li");
      li.textContent = ins;
      modalInsights.appendChild(li);
    });

    modalImpact.textContent = proj.impact;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  if (modalPrevBtn) {
    modalPrevBtn.addEventListener("click", () => {
      activeProjectIndex =
        (activeProjectIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
      openCaseStudy(PROJECTS_DATA[activeProjectIndex].id);
    });
  }

  if (modalNextBtn) {
    modalNextBtn.addEventListener("click", () => {
      activeProjectIndex = (activeProjectIndex + 1) % PROJECTS_DATA.length;
      openCaseStudy(PROJECTS_DATA[activeProjectIndex].id);
    });
  }

  // --------------------------------------------------------------------------
  // 3. Copy Email Toast Notification
  // --------------------------------------------------------------------------
  function showToast(message) {
    toastMsg.textContent = message;
    toast.classList.add("active");
    setTimeout(() => {
      toast.classList.remove("active");
    }, 3000);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(userEmail).then(
        () => {
          showToast("Email work.reshantde@gmail.com copied!");
        },
        () => {
          showToast("Copied: work.reshantde@gmail.com");
        }
      );
    });
  }

  // --------------------------------------------------------------------------
  // 4. Contact Form Handler
  // --------------------------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("nameInput").value;
      showToast(`Thank you, ${name}! Your inquiry has been sent.`);
      contactForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // 5. Navigation Scroll Spy
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll(".card-section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("data-section") === current) {
        link.classList.add("active");
      }
    });
  });

  // Initial render
  renderProjects();
});
