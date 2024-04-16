const search = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");

async function fetchData() {
  try {
    const usersDisplay = document.querySelector("#result");

    if (search.value === "") {
      alert("Please enter a username");
      return;
    }

    const response = await fetch(
      `https://api.github.com/users/${search.value}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const userData = await response.json();
    usersDisplay.innerHTML += createUserCard(userData);
  } catch (error) {
    console.error("User not exist:", error);
  }
}

function createUserCard(userData) {
  return `
      <div class="user-card">
        <img src="${userData.avatar_url}" alt="${userData.login}'s avatar">
        <h1>${userData.name || userData.login}</h1>
        <i class="fa-solid fa-link"></i>
        <span><a href="${userData.html_url}" target="_blank">${
    userData.login
  }</a></span>
        <p class="joined">Joined ${new Date(
          userData.created_at
        ).toLocaleDateString("en-US")}</p>
        <i class="fas fa-fw fa-map-marked-alt"></i>
        <span>${userData.location ? userData.location : "-"}</span>
        <p>Repositories: ${userData.public_repos}</p>
        <span class="close-button" onclick="this.parentNode.remove()">X</span>
      </div>
    `;
}


searchBtn.addEventListener("click", fetchData);

search.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    fetchData();
  }
});