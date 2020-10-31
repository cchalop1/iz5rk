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
    setFocusOnNavBar(NavBar["Home"]);
};

const renderNote = () => {
    app.innerHTML = `<div class="note" contenteditable="true">${localStorage.getItem("note") ? localStorage.getItem("note") : ""}</div>`;

    const note = document.getElementsByClassName("note")[0];
    note.focus();
    note.addEventListener("input", ev => {
        console.log(note.innerText);
        localStorage.setItem("note", note.innerHTML);
    });
    setFocusOnNavBar(NavBar["Note"]);
};

root.childNodes[1].addEventListener("click", (ev) => {
    if (ev.target.innerText === "Home") {
        renderHome();
        return;
    }
    if (ev.target.innerText === "Note") {
        renderNote();
        return;
    }
});

renderHome();