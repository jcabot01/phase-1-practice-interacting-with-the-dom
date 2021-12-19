let counter = document.getElementById('counter') //define all of the variables to be used
let plus = document.getElementById('plus')
let minus = document.getElementById('minus')
let heart = document.getElementById("heart")
let pause = document.getElementById('pause')
let likes = document.querySelector('ul.likes')
let comment_form = document.querySelector('#comment-form')
let comments = document.querySelector('#list')
let submit = document.getElementById('submit')
let paused = false
let numberTracker = {} //a blank object that we can fill later
let interval = setInterval(incrementCounter, 1000)
plus.addEventListener('click', incrementCounter) //write out eventListeners to all of the buttons
minus.addEventListener('click', decrementCounter)
pause.addEventListener('click', togglePaused)
heart.addEventListener('click', liker)
comment_form.addEventListener('submit', submitHandler)

function incrementCounter() {
    counter.innerText = parseInt(counter.innerText) + 1 //take in counter and it's innerText, parse the counter, return its value and add 1 to it.
}

function decrementCounter() {
    counter.innerText = parseInt(counter.innerText) - 1 //take in counter and its innerText, parse the counter, return its value and subtract from it.
}

function togglePaused() {
    paused = !paused    // paused originally set to false, therefore !paused means it's true, therefore 'if' true; clearInterval and display 'resume'
    if (paused) {
        clearInterval(interval) //stop the timer
        pause.innerText = 'resume' //change innerText to 'resume'
    }else {
        interval = setInterval(incrementCounter, 1000) //otherwise, if paused is false, the setInterval should resume and display 'pause' as innerText
        pause.innerText = 'pause'
    }
}

function liker() { //this function grabs the innerText from the counter to display in the like statement
    let second = counter.innerText //store the second at which the button was pressed 
    numberTracker[second] = numberTracker[second] || 0 //numberTracker is a blank object that we fill with seconds and the number
    numberTracker[second] += 1 //now we are able to aggregate the amounts times a certain number is liked with the += operator
    return renderLikes() //call the function that will put this together
    }

function renderLikes() {
    likes.innerHTML = "" //our result will be a string
    for (let key in numberTracker) {
        const li = document.createElement("li") //create a new line for each click
        li.innerText = `${key} has been liked ${numberTracker[key]} times.` //displayed in this way
        likes.append(li) //append
    }
}

function submitHandler(event){ //this function handles the submission of comments
    event.preventDefault() //with all submissions you must prevent default
    const comment = event.target.querySelector("input").value //define comment and link it to where they exist in HTML
    const li = document.createElement("li") //for every new comment we need a new line
    li.innerText = comment //link the new line to the new comment input
    comments.append(li) //append the new line
    event.target.reset() //reset the input box to a blank form
  }
