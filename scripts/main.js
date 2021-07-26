let c, ctx;

let perc = 0;
let stars = []

const endTime = new Date('8/31/2021');
const startTime = new Date('7/17/2021');
const total = endTime.getTime() - startTime.getTime();

function load() {
    c = document.getElementById("canvaBg");
    ctx = c.getContext("2d");

    console.log(stars)

    setInterval(function() {
        const curTime = Date.now()

        perc = (1 - (endTime.getTime() - curTime)/total) * 100

        document.getElementById('perc').innerHTML = perc.toFixed(6).slice(0, perc.toFixed(7).length - 3)
        
        let smallPerc = perc.toFixed(6).toString()
        smallPerc = perc.toFixed(6).toString().slice(smallPerc.length - 2,smallPerc.length)
        
        document.getElementById('smallPerc').innerHTML = smallPerc
        document.getElementById('smallPerc').style.color = `hsl(${(perc.toString().slice(6,8)/100)*145}, 100%, 60%)`

        document.getElementById('barDone').style.width = `calc(50vw*${1 - (endTime.getTime() - curTime)/total})`
        document.getElementById('barLeft').style.width = `calc(50vw*${(endTime.getTime() - curTime)/total})`

        document.getElementById('barDone').style.backgroundColor = `hsl(${(perc/100)*145}, 100%, 60%)`

        if (stars.length < Math.floor((perc/100) * 1000)) genStars(1)

        loadCanvas()
        nextMilestone()

    }, 1);
}

function nextMilestone() {
    const every = 5;

    let next = (Math.floor(perc / every) + 1) * every 
    // console.log(next)

    let eta = (next * total)/100 - total + endTime.getTime()
    let left = eta - Date.now()

    let hours = Math.floor(left/1000/60/60)
    left -= hours * 3600000;
    let mins = Math.floor(left/1000/60)
    left -= mins * 60000;
    let secs = Math.floor(left/1000)

    document.getElementById('milestoneTime').innerHTML = `${hours}:${mins.toString().length == 1 ? '0' + mins : mins}:${secs.toString().length == 1 ? '0' + secs : secs}`
    document.getElementById('milestonePerc').innerHTML = `${next}%`
    document.getElementById('milestonePerc').style.color = `hsl(${((next/100)*145)}, 100%, 60%)`

}

function loadCanvas() {
    ctx.clearRect(0, 0, c.width, c.height);

    c.style.width ='100%';
    c.style.height='100%';
    // ...then set the internal size to match
    c.width  = c.offsetWidth;
    c.height = c.offsetHeight;

    

    for (i = 0; i < stars.length; i++) {
        let star = stars[i]
        // console.log(stars.length)
        ctx.beginPath();
        ctx.arc(c.width * star.x, c.width * star.y, (star.size * 1.5) + 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255,255,255,0.5)'
        ctx.stroke()
        ctx.fill()

        star.y += (0.00003 * star.speed + 0.00002) * (perc/100);

        if (star.y >= 1) star.y = 0
    }

}

function genStars(num) {
    for (i = 0; i < num; i++) {
        stars.push({
            x: Math.random(),
            y: Math.random(),
            size: Math.random(),
            speed: Math.random()
        })
    }
}

function formatNumber(x) {
    // convert it to a string
    var s = "" + x;
    // if x is integer, the point is missing, so add it
    if (s.indexOf(".") == -1) {
        s += ".";
    }
    // make sure if we have at least 2 decimals
    s += "00";
    // get the first 2 decimals
    return s.substring(0, s.indexOf(".") + 3);
}