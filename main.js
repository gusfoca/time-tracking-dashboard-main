const timeframes = {
    daily: "day",
    weekly: "week",
    monthly: "month",
};

function getTaskClassName(from) {
    return from.toLowerCase().replace(" ", "-");
}

const tasks = document.querySelector(".tasks-container");

function updateTask(index, timeframe, taskData) {
    const el = tasks.children[index];

    el.classList.add( `${getTaskClassName(taskData.title)}-task` );
    el.querySelector(".task-item-title > div").textContent = taskData.title;
    el.querySelector(".task-item-time").textContent = 
        taskData.timeframes[timeframe].current + "hrs";
    el.querySelector(".task-item-prev").textContent = 
        `Last ${timeframes[timeframe]} - ${taskData.timeframes[timeframe].previous}hrs`;
}

function updateTasks(timeframe, data) {
    data.forEach( (task, i) => updateTask(i, timeframe, task) );
}

let data;
const request = new XMLHttpRequest();
request.onload = () => {
    data = request.response;
    if(data) {
        updateTasks("weekly", data);
    } else {
        console.log("Couldn't load task data");
    }
};
request.open("GET", "./data.json");
request.responseType = "json";
request.send();

document.querySelectorAll("a").forEach( el =>
    el.addEventListener('click', e => {
        e.preventDefault();

        //Only for timeframe links
        if(e.target.getAttribute("data-frame")) {
            document.querySelector(".active-link").classList.toggle("active-link");
            e.target.classList.toggle("active-link");
            updateTasks(e.target.getAttribute("data-frame"), data);
        }
    })
);