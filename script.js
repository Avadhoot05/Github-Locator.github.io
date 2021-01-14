const APIURL = "https://api.github.com/users/";


let head = document.getElementsByTagName("Head")[0];
let bd = document.getElementById("bd");
let main = document.getElementById("main");
let form = document.getElementById("form");
let search = document.getElementById("search");
let title = document.getElementById("title");
let but = document.getElementById("But");
let darkModeSwitch = document.querySelector(".slider");



async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();
    console.log(respData);

    if (resp.ok){    //if user does not exist
        createUserCard(respData);
        getRepos(username);
    }
    else{
        const notFoundmsg = `

                <h2 class="nfm">Not Found</h2>

    `;

    main.innerHTML = notFoundmsg;
    }
}


async function getRepos(username) {
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();

    addReposToCard(respData);
}

function createUserCard(user) {
    
    let userN = user.name;
    let userB = user.bio;
    if(!userN) userN = "Unavailable"
    if(!userB) userB = "Unavailable"

    
    const cardHTML = `
        <div class="card">
            <div class="avatardiv">
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
                <a href=${user.html_url} class="button" target="_blank">Visit</a>
            </div>
            <div class="user-info">
                <h2>${userN}</h2>
                <p>${userB}</p>
                

                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>
        `
    ;



    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        title.style.top="30px";
        getUser(user);

        search.value = "";
    }
});

function Hellodarkness(){
    let isDark=false;
    darkModeSwitch.addEventListener("click",function (){
        if(isDark){ 
            console.log("make it Light");
            
            bd.style.background = "linear-gradient(to right, #b3ffab, #12fff7)";
            title.style.color = "white";
            search.style.color = " rgb(0, 0, 0)";
            search.style.background= "#4c288500";
            but.style.color = "white";
            but.style.border="1px solid white"
            head.removeChild(head.lastChild);
            console.log("Yo Light ");
            isDark=false;
        }
        else{
            console.log("make it Dark");
            bd.style.background = "rgb(54, 54, 54)";
            title.style.color="rgb(212, 100, 235)";
            search.style.color = "white";
            but.style.color = "white";
            search.style.background= "rgb(236, 142, 255)";
            but.style.border="1px solid rgb(212, 100, 235)"; 

            
            let link  = document.createElement('link');
            link.rel  = 'stylesheet';
            link.type = 'text/css';
            link.href = 'style-dark.css';
            head.appendChild(link);

            console.log("Yo dark ");
            isDark=true;
        }
    });
}

Hellodarkness();




