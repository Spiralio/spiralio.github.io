const startTime = new Date('2022-01-06T20:00:00.000-08:00');
const endTime = new Date('2022-01-18T15:00:00.000-08:00');
const total = endTime.getTime() - startTime.getTime();

/**
 * Styles
 * 
 * 0 = Night
 */

let styles = {}
let style = 'night'

let milestone = 0;

let c, ctx;   // Canvas
let perc = 0; // Total Percentage

let cursorX, cursorY;

/**
 * Runs once when the body loads
 */
function load() {
    document.onmousemove = getCursorXY;

    c = document.getElementById("canvaBg");
    ctx = c.getContext("2d");

    document.getElementById('nextMilestone').onmouseover = () => {
        togglePreview(true, milestone)
    }

    document.getElementById('nextMilestone').onmouseout = () => {
        togglePreview(false)
    }

    // Run this every frame
    setInterval(() => frame(), 1);
}

/**
 * Runs every frame
 */
function frame() {
    const curTime = Date.now()
    const timeLeft = endTime.getTime() - curTime


    // Set the percentages
    perc = (1 - (timeLeft)/total) * 100
    document.getElementById('perc').innerHTML = perc.toFixed(6).slice(0, perc.toFixed(7).length - 3)
    
    let smallPerc = perc.toFixed(6).toString()
    smallPerc = perc.toFixed(6).toString().slice(smallPerc.length - 2,smallPerc.length)
    
    document.getElementById('smallPerc').innerHTML = smallPerc
    document.getElementById('smallPerc').style.color = color(smallPerc/100)


    // Set the time left
    let tLeft = timeLeft

    let days = Math.floor(tLeft/86400000)
    tLeft -= days*86400000

    let hours = Math.floor(tLeft/3600000)
    tLeft -= hours*3600000

    let minutes = Math.floor(tLeft/60000)
    tLeft -= minutes*60000

    let seconds = Math.floor(tLeft/1000)
    tLeft -= seconds*1000

    document.getElementById('days').innerHTML = days
    document.getElementById('hours').innerHTML = hours
    document.getElementById('minutes').innerHTML = minutes
    document.getElementById('seconds').innerHTML = seconds

    document.getElementById('days').style.color = color(1 - days/(Math.floor(total/86400000)))
    document.getElementById('hours').style.color = color(1 - hours/59)
    document.getElementById('minutes').style.color = color(1 - minutes/59)
    document.getElementById('seconds').style.color = color(1 - seconds/59)


    // Set the bar
    document.getElementById('barDone').style.width = `calc(50vw*${1 - (endTime.getTime() - curTime)/total})`

    document.getElementById('barDone').style.backgroundColor = color(perc/100)

    nextMilestone()


    // Set up the canvas
    ctx.clearRect(0, 0, c.width, c.height);

    c.style.width ='100%';
    c.style.height='100%';
    c.width  = c.clientWidth*2;
    c.height = c.clientHeight*2;


    // Load the style every frame
    styles[style].frame()
}

/**
 * Set a style to a newStyle
 */
 function setStyle(newStyle) {
    if (style == newStyle) return;

    document.getElementById('styleCont').childNodes.forEach((x) => {
        if (!x.id) return;

        if (x.id.endsWith(newStyle))
            x.childNodes[1].src = x.childNodes[1].src.replace('Off', 'On')
        else
            x.childNodes[1].src = x.childNodes[1].src.replace('On', 'Off')

        let body = document.getElementById('body')
        body.style.transition = 'background 0.5s'

        styles[style].unload()
        styles[newStyle].load()

        style = newStyle
    })
}

function togglePreview(toggle, perc) {
    if (!toggle) return document.getElementById('barPreview').style.width = 0

    document.getElementById('barPreview').style.left = `calc(${document.getElementById('barDone').style.width})`
    document.getElementById('barPreview').style.width = `calc(50vw*${perc/100} - ${document.getElementById('barDone').style.width})`
}

/**
 * Sets up the next milestone information
 */
function nextMilestone() {
    const every = 5; // How often the milestone should be

    let next = (Math.floor(perc / every) + 1) * every 
    let eta = (next * total)/100 - total + endTime.getTime()
    let left = eta - Date.now()

    let hours = Math.floor(left/1000/60/60)
    left -= hours * 3600000;
    let mins = Math.floor(left/1000/60)
    left -= mins * 60000;
    let secs = Math.floor(left/1000)

    milestone = next;

    document.getElementById('milestoneTime').innerHTML = `${hours}:${mins.toString().length == 1 ? '0' + mins : mins}:${secs.toString().length == 1 ? '0' + secs : secs}`
    document.getElementById('milestonePerc').innerHTML = `${next}%`
    document.getElementById('milestonePerc').style.color = color(next/100)
}

/**
 * Makes sure a number has two digits
 * 
 * @param {int} x 
 * @returns The formatted number
 */
function formatNumber(x) {
    return x.toString().length == 1 ? '0' + x : x
}

/**
 * Get a color from a percentage
 */
function color(perc) {
    return `hsl(${(perc)*130}, 100%, 60%)`
}

/**
 * Get the cursor location
 */
function getCursorXY(e) {
	let newCursorX = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	let newCursorY = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

    if (cursorX != undefined) moveX += newCursorX - cursorX
    if (cursorY != undefined) moveY += newCursorY - cursorY

    cursorX = newCursorX
    cursorY = newCursorY
}