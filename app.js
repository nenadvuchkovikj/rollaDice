const dice = document.querySelector('.dice');
const PCdice = document.querySelector('.pc');
const RollButton = document.getElementById('rollBtn');
const PlayerPoints = document.querySelector('.Ppoints');
const ComputerPoints = document.querySelector('.Cpoints');
const msg = document.querySelector('#messageTxt');
const clearBtn = document.querySelector('#clearBtn');
const startBtn = document.getElementById('startBtn');

const intro = document.querySelector('.intro');
const game = document.querySelector('.game');
const header = document.querySelector('.header');
const gameopt = document.querySelector('.game-options');

const optionBtn = document.querySelectorAll('.btn-opt');
const playUpTo = document.querySelector('#playUpTo');

const winnerMsg = document.querySelector('.winnerMessage');
const newGame = document.querySelector('#newGame');
const end = document.querySelector('.end-game');

let lives = 0;
let Ppoints = 0;
let Cpoints = 0;

clearBtn.addEventListener('click',() =>{
    if(confirm('Are you sure you want to reset the score?')){
        PlayerPoints.textContent = 0;
        ComputerPoints.textContent = 0;
        msg.textContent = 'Score reset'
        Ppoints = 0;
        Cpoints = 0;
        checkReset();
    }
});

startBtn.addEventListener('click', () =>{
    intro.classList.add('fadeOut');
    gameopt.classList.add('fadeIn');
    header.classList.add('moveheader');
});

optionBtn.forEach(btn => {
    btn.addEventListener('click', () =>{
        gameopt.classList.remove('fadeIn');
        gameopt.classList.add('fadeOut');
        game.classList.add('fadeIn');
        lives = parseInt(btn.id);
        playUpTo.textContent = `Play up to ${lives}`
    });
});

newGame.addEventListener('click', () =>{
    end.classList.remove('fadeIn');
    end.classList.add('fadeOut');
    gameopt.classList.add('fadeIn');
    Ppoints = 0;
    Cpoints = 0;
    PlayerPoints.textContent = 0;
    ComputerPoints.textContent = 0;
    msg.textContent = '';
    RollButton.disabled = false;
})


RollButton.addEventListener('click', () => {
    RollButton.disabled = true;
    throwdice(dice);
    throwdice(PCdice);
    setTimeout(()=>{
        let Pdice = roll(dice);
        let Cdice = roll(PCdice);
        checkWinner(Pdice, Cdice);
        RollButton.disabled = false;
        PlayerPoints.textContent = Ppoints;
        ComputerPoints.textContent = Cpoints;
        checkReset();
        if(checkWhoWon()){
            setTimeout(()=> {
                game.classList.remove('fadeIn');
                game.classList.add('fadeOut');
                end.classList.add('fadeIn');
                playUpTo.textContent = '';
            }, 1500); 
        };
    }, 3100);
});

getNumber = () => {
    const number = (Math.floor(Math.random() * 6) + 1);
    return number;
}

roll = (kocka) =>{
    // rolldice();
    const  RandomNumber = getNumber();

    if(RandomNumber === 1){
        if (kocka.firstChild) {
            kocka.removeChild(kocka.firstChild);
        }
        const el = document.createElement('img');
        el.src = "./img/inverted-dice-1.png";
        kocka.appendChild(el);
        return 1;
    }
    else if(RandomNumber === 2){
        if (kocka.firstChild) {
            kocka.removeChild(kocka.firstChild);
        }
        const el = document.createElement('img');
        el.src = "./img/inverted-dice-2.png";
        kocka.appendChild(el);
        return 2;
    }
    else if(RandomNumber === 3){
        if (kocka.firstChild) {
            kocka.removeChild(kocka.firstChild);
        }
        const el = document.createElement('img');
        el.src = "./img/inverted-dice-3.png";
        kocka.appendChild(el);
        return 3;
    }
    else if(RandomNumber === 4){
        if (kocka.firstChild) {
            kocka.removeChild(kocka.firstChild);
        }
        const el = document.createElement('img');
        el.src = "./img/inverted-dice-4.png";
        kocka.appendChild(el);
        return 4;
    }
    else if(RandomNumber === 5){
        if (kocka.firstChild) {
            kocka.removeChild(kocka.firstChild);
        }
        const el = document.createElement('img');
        el.src = "./img/inverted-dice-5.png";
        kocka.appendChild(el);
        return 5;
    }
    else{
        if (kocka.firstChild) {
            kocka.removeChild(kocka.firstChild);
        }
        const el = document.createElement('img');
        el.src = "./img/inverted-dice-6.png";
        kocka.appendChild(el);
        return 6;
    } 
}

throwdice = (kocka) => {
        let i = 1;
        msg.textContent = 'Rolling..    '
        let rolling = setInterval(() => {
            if( i > 6 ){
                i = 1;
            }
            if (kocka.firstChild) {
                kocka.removeChild(kocka.firstChild);
            }
            const el = document.createElement('img');
            el.src = `./img/inverted-dice-${i}.png`;
            kocka.appendChild(el);
            i++;
        }, 100);
        setTimeout(()=>{
            clearInterval(rolling);
        }, 3000);
}

checkWinner = (player, pc) => {
    if(player > pc){
        Ppoints++;
        msg.textContent = 'You won!'
    } else if( pc > player){
        Cpoints++;
        msg.textContent = 'You lost!'
    } else{
        msg.textContent = 'Its a draw!'
    }
}

checkReset = () => {
    if(Ppoints === 0 && Cpoints === 0){
        clearBtn.disabled = true;
    } else{
        clearBtn.disabled = false;
    }
}

checkWhoWon = () => {
    if(Ppoints === lives){
        clearBtn.disabled = true;
        RollButton.disabled = true;
        winnerMsg.textContent = 'Congratulations, You Won!';
        return true;
    } else if(Cpoints === lives){
        clearBtn.disabled = true;
        RollButton.disabled = true;
        winnerMsg.textContent = 'You Lost.. Better luck next time!';
        return true;
    }
}