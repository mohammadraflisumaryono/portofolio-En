document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  let project = null;

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      project = data.projects.find((p) => p.id === projectId);

      const projectTitleElement = document.getElementById("title");
      const projectDescriptionElement = document.getElementById(
        "project-description"
      );
      const RoleElement = document.getElementById("role");
      const galleryElement = document.getElementById("gallery");

      if (project) {
        if (projectTitleElement) {
          projectTitleElement.innerText = project.title;
        }
        if (projectDescriptionElement) {
          projectDescriptionElement.innerHTML = project.description;
        }
        if (RoleElement) {
          RoleElement.innerHTML = project.role;
        }
        if (galleryElement) {
          project.images.forEach((image, index) => {
            const imgElement = document.createElement("img");
            imgElement.src = `assets/${image}`;
            imgElement.alt = project.title;
            imgElement.dataset.index = index;
            imgElement.addEventListener("click", openModal);
            galleryElement.appendChild(imgElement);
          });
        }
      } else {
        if (projectTitleElement) {
          projectTitleElement.innerText = "Project Not Found";
        }
        if (projectDescriptionElement) {
          projectDescriptionElement.innerText =
            "The project you are looking for does not exist.";
        }
      }
    })
    .catch((error) => console.error("Error loading JSON data:", error));

  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-image");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentIndex;

  function openModal(event) {
    modal.style.display = "block";
    currentIndex = parseInt(event.target.dataset.index, 10);
    modalImg.src = event.target.src;
  }

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  prevBtn.addEventListener("click", () => {
    if (project) {
      currentIndex =
        currentIndex === 0 ? project.images.length - 1 : currentIndex - 1;
      modalImg.src = `assets/${project.images[currentIndex]}`;
    }
  });

  nextBtn.addEventListener("click", () => {
    if (project) {
      currentIndex =
        currentIndex === project.images.length - 1 ? 0 : currentIndex + 1;
      modalImg.src = `assets/${project.images[currentIndex]}`;
    }
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
