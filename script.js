let $start = document.querySelector('#start'),
    $game = document.querySelector('#game'),
    $time = document.querySelector('#time'),
    $timeHeader = document.querySelector('#time-header'),
    $resultHeader = document.querySelector('#result-header'),
    $result = document.querySelector('#result'),
    $gameTime = document.querySelector('#game-time'),
    score = 0,
    colors = ['red', 'blue', 'pink', 'purple', 'yellow'],
    isGameStarted = false;


$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) { 
    $el.classList.remove('hide')
 }
function hide($el) { 
    $el.classList.add('hide')  }


function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', true)
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    hide($start)

    let interval = setInterval(() =>{
        let time = parseFloat($time.textContent)

        if( time <= 0 ){
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)
    renderBox()
}

function setGameScore() { 
    $result.textContent = score.toString()
 }

function setGameTime() {
    let time = +$gameTime.value 
    $time.textContent = time.toFixed(1) 
    show($timeHeader)
    hide($resultHeader)
 }
function endGame() { 
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
 }

function handleBoxClick(event) { 
    if(!isGameStarted){
        return
    }
    if (event.target.dataset.box){
        score++
        renderBox()
    }    
}

function renderBox() { 
    $game.innerHTML = '';
    let box = document.createElement('div'),
        boxSize = getRandom (30, 100),
        gameSize = $game.getBoundingClientRect(),
        maxTop = gameSize.height - boxSize,
        maxLeft = gameSize.width - boxSize,
        randomIndex = getRandom(0, colors.length); 


    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.style.borderRadius = '50%'
    box.style.backgroundColor = colors[randomIndex]
    box.setAttribute('data-box', true)

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) { 
return Math.floor(Math.random() * (max - min) + min)
}