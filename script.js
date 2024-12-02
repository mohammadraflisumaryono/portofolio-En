function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
  // Fungsi untuk memuat dan menampilkan proyek
  function loadProjects() {
    fetch("data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data.projects)) {
          throw new Error(
            "Data format is not as expected (projects array is missing)"
          );
        }

        const projectContainer = document.getElementById("project-container");

        data.projects.forEach((project) => {
          const detailsContainer = document.createElement("div");
          detailsContainer.classList.add(
            "details-container",
            "color-container"
          );

          const articleContainer = document.createElement("div");
          articleContainer.classList.add("article-container");

          const imgElement = document.createElement("img");
          imgElement.src = `./assets/${project.images[0]}`;
          imgElement.alt = project.title;
          imgElement.classList.add("project-img");

          articleContainer.appendChild(imgElement);
          detailsContainer.appendChild(articleContainer);

          const titleElement = document.createElement("h2");
          titleElement.classList.add("experience-sub-title", "project-title");
          titleElement.textContent = project.title;

          const roleElement = document.createElement("p");
          roleElement.textContent = project.role_title;

          const timelineElement = document.createElement("p");
          timelineElement.textContent = project.timeline;

          const buttonContainer = document.createElement("div");
          buttonContainer.classList.add("btn-container");

          const detailsButton = document.createElement("button");
          detailsButton.classList.add("btn", "btn-color-2", "project-btn");
          detailsButton.textContent = "Details";
          detailsButton.onclick = () => {
            location.href = `gallery.html?id=${project.id}`;
          };

          buttonContainer.appendChild(detailsButton);

          detailsContainer.appendChild(titleElement);
          detailsContainer.appendChild(roleElement);
          detailsContainer.appendChild(timelineElement);

          detailsContainer.appendChild(buttonContainer);

          projectContainer.appendChild(detailsContainer);
        });
      })
      .catch((error) => console.error("Error loading JSON data:", error));
  }

  loadProjects();
});
