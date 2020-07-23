const dice = document.querySelector('.dice');
const PCdice = document.querySelector('.pc');
const RollButton = document.getElementById('rollBtn');
const PlayerPoints = document.querySelector('.Ppoints');
const ComputerPoints = document.querySelector('.Cpoints');
const msg = document.querySelector('#messageTxt');
const clearBtn = document.querySelector('#clearBtn');
const startBtn = document.getElementById('startBtn');


const exitOpt = document.getElementById('exitOpt');
const exitGame = document.getElementById('exitGame');

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
    if(intro.classList.contains('fadeIn')){
        intro.classList.remove('fadeIn');
    }
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
    header.classList.remove('moveheader');
    intro.classList.add('fadeIn');
    Ppoints = 0;
    Cpoints = 0;
    PlayerPoints.textContent = 0;
    ComputerPoints.textContent = 0;
    msg.textContent = '';
    RollButton.disabled = false;
    dice.removeChild(dice.firstChild);
    PCdice.removeChild(PCdice.firstChild);
});

exitOpt.addEventListener('click', ()=>{
    gameopt.classList.remove('fadeIn');
    gameopt.classList.add('fadeOut');
    header.classList.remove('moveheader');
    intro.classList.add('fadeIn');
});

RollButton.addEventListener('click', () => {
    RollButton.disabled = true;
    throwdice(dice);
    throwdice(PCdice);
    msg.textContent = 'Rolling..'
    dice.classList.remove('shake');
    PCdice.classList.remove('shake');
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
        const el = document.createElement('i');
        el.classList = 'fas fa-dice-one fa-7x'; 
        kocka.appendChild(el);
        return 1;
    }
    else if(RandomNumber === 2){
        if (kocka.firstChild) {
            kocka.removeChild(kocka.firstChild);
        }
        const el = document.createElement('i');
        el.classList = 'fas fa-dice-two fa-7x'; 
        kocka.appendChild(el);
        return 2;
    }
    else if(RandomNumber === 3){
        if (kocka.firstChild) {
            kocka.removeChild(kocka.firstChild);
        }
        const el = document.createElement('i');
        el.classList = 'fas fa-dice-three fa-7x'; 
        kocka.appendChild(el);
        return 3;
    }
    else if(RandomNumber === 4){
        if (kocka.firstChild) {
            kocka.removeChild(kocka.firstChild);
        }
        const el = document.createElement('i');
        el.classList = 'fas fa-dice-four fa-7x'; 
        kocka.appendChild(el);
        return 4;
    }
    else if(RandomNumber === 5){
        if (kocka.firstChild) {
            kocka.removeChild(kocka.firstChild);
        }
        const el = document.createElement('i');
        el.classList = 'fas fa-dice-five fa-7x'; 
        kocka.appendChild(el);
        return 5;
    }
    else{
        if (kocka.firstChild) {
            kocka.removeChild(kocka.firstChild);
        }
        const el = document.createElement('i');
        el.classList = 'fas fa-dice-six fa-7x'; 
        kocka.appendChild(el);
        return 6;
    } 
}

throwdice = (kocka) => {
        let Wordnumber;
        let i = 1;
        let rolling = setInterval(() => {
            if(i === 1){
                Wordnumber = 'one';
            }else if(i === 2){
                Wordnumber = 'two';
            }else if(i === 3){
                Wordnumber = 'three';
            }else if(i === 4){
                Wordnumber = 'four';
            }else if(i === 5){
                Wordnumber = 'five';
            }else { 
                Wordnumber = 'six'};

            if( i > 6 ){
                i = 1;
                Wordnumber = 'one';
            }
            if (kocka.firstChild) {
                kocka.removeChild(kocka.firstChild);
            }
            const el = document.createElement('i');
            el.classList = `fas fa-dice-${Wordnumber} fa-7x`;
            kocka.classList.add('shake');
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


// YAMB

const yambBtn = document.querySelector('#yambBtn');
const yambGame = document.querySelector('.yamb-game');
const rollYambBtn = document.querySelector('#rollYamb');
const kocki = document.querySelectorAll('.yamb span');
const resetYamb = document.querySelector('#resetYamb');
const extraRolls = document.querySelector('#extraYamb');
const extraMSG = document.querySelector('#extramsg');

const exitYamb = document.querySelector('#exitYamb');

const Rleft = document.querySelector('#rLeft');

let rollsLeft = 3;
let extraTwo = 2;

Rleft.textContent = `${rollsLeft} rolls left`;
Rleft.style.color = "rgb(58, 197, 58)";
extraMSG.textContent = `${extraTwo} extra rolls left`;

exitYamb.addEventListener('click', () => {
    yambGame.classList.remove('fadeIn');
    yambGame.classList.add('fadeOut');
    header.classList.remove('moveheader');
    intro.classList.add('fadeIn');
    kocki.forEach(kocka =>{
        kocka.style.color = 'white';
        if(kocka.firstChild){
            kocka.removeChild(kocka.firstChild);
        }
        rollsLeft = 3;
        extraTwo = 2;
        Rleft.textContent = `${rollsLeft} rolls left`;
        extraMSG.textContent = `${extraTwo} extra rolls left`;
        rollYambBtn.disabled = false;
        extraRolls.disabled = true;
        Rleft.style.color = "rgb(58, 197, 58)";
    });
});

yambBtn.addEventListener('click', () => {
    if(intro.classList.contains('fadeIn')){
        intro.classList.remove('fadeIn');
    }
    intro.classList.add('fadeOut');
    yambGame.classList.add('fadeIn');
    header.classList.add('moveheader');
});

rollYambBtn.addEventListener('click', () => {
        rollYambBtn.disabled = true;
        resetYamb.disabled = true;
        exitYamb.disabled = true;
        rollsLeft--;
        if(rollsLeft === 3 || rollsLeft === 2){
            Rleft.style.color = "rgb(58, 197, 58)";
        } else if(rollsLeft === 1){
            Rleft.style.color = "rgb(223, 223, 57)";
        } else if(rollsLeft === 0){
            Rleft.style.color = "rgb(218, 49, 49)";
        }
        Rleft.textContent = `${rollsLeft} rolls left`;
        kocki.forEach(kocka =>{
            if(kocka.style.color === 'rgb(44, 44, 119)'){

            }else{
                throwdice(kocka);
                kocka.classList.remove('shake');
                setTimeout(()=>{
                    roll(kocka);
                    if(rollsLeft !== 0){
                        rollYambBtn.disabled = false;
                    }
                    if(rollsLeft === 0){
                        rollYambBtn.disabled = true;
                        extraRolls.disabled = false;
                    }
                    resetYamb.disabled = false;
                    exitYamb.disabled = false;
                }, 3100);
            }
        });

});

extraRolls.addEventListener('click', () => {
    extraRolls.disabled = true;
    resetYamb.disabled = true;
    exitYamb.disabled = true;
    extraTwo--;
    extraMSG.textContent = `${extraTwo} extra roll left`;
    kocki.forEach(kocka =>{
        
        if(kocka.style.color === 'rgb(44, 44, 119)'){
        }else{
            throwdice(kocka);
            kocka.classList.remove('shake');
            setTimeout(()=>{
                roll(kocka);
                if(extraTwo !== 0){
                    extraRolls.disabled = false;
                }
                if(extraTwo === 0){
                    extraRolls.disabled = true;
                }
                resetYamb.disabled = false;
                exitYamb.disabled = false;
            }, 3100);
        }
    });
   
});


kocki.forEach(kocka => {
    kocka.style.color = 'white';
    kocka.addEventListener('click',()=>{
        if(kocka.style.color === 'white'){
            kocka.style.color = 'rgb(44, 44, 119)';
        }
        else kocka.style.color = 'white';
    });
});

resetYamb.addEventListener('click',() => {
    kocki.forEach(kocka =>{
        kocka.style.color = 'white';
        if(kocka.firstChild){
            kocka.removeChild(kocka.firstChild);
        }
        rollsLeft = 3;
        extraTwo = 2;
        Rleft.textContent = `${rollsLeft} rolls left`;
        extraMSG.textContent = `${extraTwo} extra rolls left`;
        rollYambBtn.disabled = false;
        extraRolls.disabled = true;
        Rleft.style.color = "rgb(58, 197, 58)";
    });

});