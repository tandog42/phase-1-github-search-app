const gitForm = document.getElementById("github-form");
const butt = document.createElement("BUTTON");
gitForm.addEventListener("submit", e => {
  e.preventDefault();
  //e.target[0].value
  fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
    .then(r => r.json())
    .then(github => {
      github.items.map(item => {
        const h2 = document.createElement("h2");
        const user = document.getElementById("user-list");
        h2.textContent = item.login;
        const butt = document.createElement("BUTTON");
        butt.innerText = "Repos";
        butt.id = "repoButton";

        butt.addEventListener("click", e => showUserRepos(item.login, e));
        e.preventDefault();
        const img = document.createElement("img");
        img.src = item.avatar_url;
        const li = document.createElement("li");
        butt.innerText = "Repos";
        butt.id = "repoButton";

        h2.append(butt);
        li.append(h2, img);
        user.append(li);
      });
    });
});

function showUserRepos(username, e) {
  e.preventDefault();
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(r => r.json())
    .then(repos => {
      const li = document.createElement("li");
      repos.forEach(repo => {
        const repoList = document.getElementById("repos-list");

        const h1 = document.createElement("h4");
        h1.textContent = repo.name;
        li.append(h1);
        repoList.appendChild(li);
      });
    });
}
