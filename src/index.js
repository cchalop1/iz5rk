import { days, months, NavBar } from "./utlis";

const root = document.getElementById("root");
const app = document.getElementById("app");

const setFocusOnNavBar = (nb) => {
    root.childNodes[1].childNodes.forEach((el, idx) => {
        if (nb === idx) {
            el.style.color = "#fff";
        } else {
            el.style.color = "#a0a0a0";
        }
        return el;
    });
};

const renderHome = () => {
    setFocusOnNavBar(NavBar["Home"]);
    app.innerHTML = `<div class="time-box">
            <div id="time"></div>
            <div id="date"></div>
        </div>`;

    const time = document.getElementById("time");
    const date = document.getElementById("date");

    const currentDate = new Date();
    date.innerText = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;

    const hours = currentDate.getHours() < 10 ? `0${currentDate.getHours()}` : currentDate.getHours();
    const minutes = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes();
    time.innerText = `${hours}:${minutes}`;

    setInterval(() => {
        const hours = new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours();
        const minutes = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes();
        time.innerText = `${hours}:${minutes}`;
    }, 1000);
};

const renderNote = () => {
    setFocusOnNavBar(NavBar["Note"]);
    app.innerHTML = `<div class="note" contenteditable="true">${localStorage.getItem("note") ? localStorage.getItem("note") : ""}</div>`;

    const note = document.getElementsByClassName("note")[0];
    note.focus();
    note.addEventListener("input", ev => {
        localStorage.setItem("note", note.innerHTML);
    });
};

const renderRss = () => {
    setFocusOnNavBar(NavBar["Rss"]);
    app.innerHTML = `<div class="rss"><div><input id="input-url" type="text" placeholder="Enter rss url..." /><button id="btn-rss">Click to add</button></div><div id="list-rss"></div></div>`;
    const saveRss = localStorage.getItem("rss");
    let listUrl = saveRss ? JSON.parse(saveRss) : [];

    listUrl.forEach(async url => {
        const res = await fetch(url);
        console.log(res);
    })

    document.getElementById("btn-rss").addEventListener("click", async () => {
        const inputUrl = document.getElementById("input-url");
        const url = inputUrl.value;

        if (url === "") {
            return;
        }
        const regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);
        if (!url.match(regex)) {
            alert("URL not valid");
            return;
        }
        for (const oldUrl of listUrl) {
            if (oldUrl === url) {
                alert("You can't add tow time the same url");
                return;
            }
        }
        listUrl.push(url);
        localStorage.setItem("rss", JSON.stringify(listUrl));
        inputUrl.value = "";
        renderRss();
    });
};

// https://lobste.rs/t/programming.rss

root.childNodes[1].addEventListener("click", (ev) => {
    if (ev.target.innerText === "Home") {
        renderHome();
        return;
    }
    if (ev.target.innerText === "Note") {
        renderNote();
        return;
    }
    if (ev.target.innerText === "Rss") {
        renderRss();
        return;
    }
});

renderHome();