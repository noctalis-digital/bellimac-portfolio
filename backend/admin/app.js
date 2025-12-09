/* global Quill */
(() => {
  const API_BASE = "";
  const STORAGE_KEY = "bellimac_admin_token";

  const toast = document.getElementById("toast");
  const authForm = document.getElementById("authForm");
  const tokenInput = document.getElementById("adminToken");
  const projectForm = document.getElementById("projectForm");
  const formTitle = document.getElementById("formTitle");
  const submitBtn = document.getElementById("submitBtn");
  const cancelEditBtn = document.getElementById("cancelEditBtn");
  const resetFormBtn = document.getElementById("resetFormBtn");
  const refreshBtn = document.getElementById("refreshBtn");
  const existingGallery = document.getElementById("existingGallery");
  const portfolioList = document.getElementById("portfolioList");

  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const linkInput = document.getElementById("link");
  const coverInput = document.getElementById("cover");
  const galleryInput = document.getElementById("gallery");
  const detailsInput = document.getElementById("detailsHtml");

  let quill;
  let portfolioItems = [];
  let editingId = null;

  const showToast = (message, variant = "") => {
    toast.textContent = message;
    toast.classList.remove("toast--danger", "toast--show");
    if (variant === "danger") {
      toast.classList.add("toast--danger");
    }
    requestAnimationFrame(() => toast.classList.add("toast--show"));
    setTimeout(() => toast.classList.remove("toast--show"), 3500);
  };

  const getToken = () => (tokenInput.value || localStorage.getItem(STORAGE_KEY) || "").trim();

  const saveTokenFromInput = () => {
    localStorage.setItem(STORAGE_KEY, tokenInput.value.trim());
    showToast("Jeton enregistré localement");
  };

  const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    return date.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
  };

  const resetForm = () => {
    editingId = null;
    formTitle.textContent = "Créer un projet";
    submitBtn.textContent = "Créer";
    cancelEditBtn.style.visibility = "visible";
    titleInput.value = "";
    descriptionInput.value = "";
    linkInput.value = "";
    coverInput.value = "";
    galleryInput.value = "";
    detailsInput.value = "";
    existingGallery.innerHTML = "<p class=\"hint\">Aucune galerie enregistrée.</p>";
    quill.setText("");
    coverInput.required = true;
  };

  const fillExistingGallery = (assets = []) => {
    if (!assets.length) {
      existingGallery.innerHTML = "<p class=\"hint\">Aucune image enregistrée pour ce projet.</p>";
      return;
    }
    existingGallery.innerHTML = assets
      .map(
        (asset, index) => `
      <label>
        <input type="checkbox" name="keepGallery" value="${asset.url}" checked>
        <img src="${asset.url}" alt="Galerie ${index + 1}">
        <span class="status">Conserver cette image</span>
      </label>
    `
      )
      .join("");
  };

  const populateFormForEdit = (item) => {
    editingId = item.id;
    formTitle.textContent = "Mettre à jour le projet";
    submitBtn.textContent = "Mettre à jour";
    titleInput.value = item.title || "";
    descriptionInput.value = item.description || "";
    linkInput.value = item.link || "";
    quill.root.innerHTML = item.detailsHtml || "";
    coverInput.required = false;
    galleryInput.value = "";
    fillExistingGallery(item.gallery || []);
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast(`Modification de "${item.title}"`);
  };

  const renderPortfolioList = () => {
    if (!portfolioItems.length) {
      portfolioList.innerHTML = `<p class="hint">Aucun projet pour le moment.</p>`;
      return;
    }

    portfolioList.innerHTML = portfolioItems
      .map(
        (item) => `
      <article class="portfolio-card">
        <div class="portfolio-card__meta">
          <span class="tag">${item.gallery?.length || 0} média(s)</span>
          <span>${formatDate(item.updatedAt || item.createdAt)}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.description || ""}</p>
        <div class="portfolio-card__actions">
          <button class="ghost-btn" data-action="edit" data-id="${item.id}">Éditer</button>
          <button class="ghost-btn" data-action="delete" data-id="${item.id}">Supprimer</button>
        </div>
      </article>
    `
      )
      .join("");
  };

  const fetchPortfolio = async () => {
    portfolioList.innerHTML = `<p class="status">Chargement...</p>`;
    try {
      const response = await fetch(`${API_BASE}/api/portfolio`);
      if (!response.ok) {
        throw new Error(`Lecture impossible (${response.status})`);
      }
      const data = await response.json();
      portfolioItems = data.items || [];
      renderPortfolioList();
    } catch (error) {
      portfolioList.innerHTML = `<p class="hint">Erreur : ${error.message}</p>`;
      showToast("Impossible de charger le portfolio", "danger");
    }
  };

  const submitProject = async (event) => {
    event.preventDefault();
    const isUpdate = Boolean(editingId);
    const token = getToken();
    if (!token) {
      showToast("Ajoutez un jeton ADMIN_API_KEY avant de continuer", "danger");
      return;
    }

    detailsInput.value = quill.root.innerHTML;
    const keepGallery = Array.from(
      existingGallery.querySelectorAll('input[type="checkbox"]:checked')
    ).map((input) => input.value);

    const formData = new FormData();
    formData.append("title", titleInput.value.trim());
    formData.append("description", descriptionInput.value.trim());
    formData.append("link", linkInput.value.trim());
    formData.append("detailsHtml", detailsInput.value);

    if (keepGallery.length) {
      formData.append("existingGallery", JSON.stringify(keepGallery));
    }

    if (coverInput.files[0]) {
      formData.append("cover", coverInput.files[0]);
    } else if (!editingId) {
      showToast("Une image de couverture est requise", "danger");
      return;
    }

    Array.from(galleryInput.files || []).forEach((file) => {
      formData.append("gallery", file);
    });

    const method = isUpdate ? "PUT" : "POST";
    const endpoint = isUpdate
      ? `${API_BASE}/api/portfolio/${editingId}`
      : `${API_BASE}/api/portfolio`;

    submitBtn.disabled = true;
    submitBtn.textContent = isUpdate ? "Enregistrement..." : "Création...";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "x-admin-token": token,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        throw new Error(errorPayload.message || `Erreur ${response.status}`);
      }

      resetForm();
      await fetchPortfolio();
      showToast(isUpdate ? "Projet mis à jour" : "Projet créé");
    } catch (error) {
      showToast(error.message, "danger");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = isUpdate ? "Mettre à jour" : "Créer";
    }
  };

  const deleteProject = async (id) => {
    const token = getToken();
    if (!token) {
      showToast("Jeton requis pour supprimer", "danger");
      return;
    }
    const target = portfolioItems.find((item) => item.id === id);
    const confirmDelete = window.confirm(
      `Supprimer définitivement "${target?.title || "ce projet"}" ? Les images stockées sur S3 seront supprimées.`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE}/api/portfolio/${id}`, {
        method: "DELETE",
        headers: { "x-admin-token": token },
      });
      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        throw new Error(errorPayload.message || `Erreur ${response.status}`);
      }
      await fetchPortfolio();
      resetForm();
      showToast("Projet supprimé");
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  const handleListClick = (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const id = button.getAttribute("data-id");
    if (button.getAttribute("data-action") === "edit") {
      const item = portfolioItems.find((entry) => entry.id === id);
      if (item) {
        populateFormForEdit(item);
      }
    } else if (button.getAttribute("data-action") === "delete") {
      deleteProject(id);
    }
  };

  const bootstrap = () => {
    quill = new Quill("#detailsEditor", {
      theme: "snow",
      placeholder: "Décrivez le projet, ajoutez des liens, du texte formaté...",
      modules: {
        toolbar: [
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
        ],
      },
    });

    const storedToken = localStorage.getItem(STORAGE_KEY);
    if (storedToken) {
      tokenInput.value = storedToken;
    }

    authForm.addEventListener("submit", (event) => {
      event.preventDefault();
      saveTokenFromInput();
    });
    projectForm.addEventListener("submit", submitProject);
    cancelEditBtn.addEventListener("click", resetForm);
    resetFormBtn.addEventListener("click", resetForm);
    refreshBtn.addEventListener("click", fetchPortfolio);
    portfolioList.addEventListener("click", handleListClick);

    resetForm();
    fetchPortfolio();
  };

  bootstrap();
})();
