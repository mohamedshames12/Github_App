let userNameEl = document.querySelector("#username");
let btnEl = document.querySelector(".btn");
let languagesEl = document.querySelector(".program");
let searchTermEl = document.querySelector("#search-term");
let reposEl = document.querySelector("#repos");


btnEl.addEventListener("click", (e) => {
    e.preventDefault();
    let user = userNameEl.value.trim();
    if(user){
        // logic
        reposEl.innerHTML = "";
        getUserRepos(user);
    }else{
        alert("Please enter user!")
    }
})

function getUserRepos(user){
    let apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl)
    .then(res => res.json())
    .then(data => dispalyRepos(data , user))
    .catch(err => alert("something went wrong!"))
}

function dispalyRepos(repos, searchTerm){
    if(repos.length == 0){
        reposEl.innerHTML = "No users Found!";
    }
    searchTermEl.innerHTML = searchTerm;
    searchTermEl.style.display = "block";
    reposEl.style.display = "block";
    repos.forEach(repo => {
        reposEl.innerHTML += `
            <a href="#" >
                <span>${repo.owner.login} / ${repo.name}</span>
                <span>${repo.open_issues_count > 0 ? '<i class="fas fa-light fa-xmark"></i>' : '<i class="fas fa-sharp fa-solid fa-check"></i>'}</span>
            </a>
        `
        userNameEl.value = "";
    })
}

languagesEl.addEventListener("click", (e) => {
    let len = e.target.getAttribute("data-lan");
    if(len){
        reposEl.innerHTML = "";
        getLangPepos(len);
    }
})


function getLangPepos(len){
    let apiUrl = "https://api.github.com/search/repositories?q=" + len;
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => dispalyRepos(data.items , len))
    .catch(err => alert("something went wrong!"))
}