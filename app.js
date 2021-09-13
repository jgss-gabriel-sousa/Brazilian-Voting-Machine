const yourVoteTitle = document.querySelector(".d-1-1 span");
const office = document.querySelector(".d-1-2 span");
const description = document.querySelector(".d-1-4");
const help = document.querySelector(".d-2");
const screenAside = document.querySelector(".d-1-right");
const numbers = document.querySelector(".d-1-3");
const restartButton = document.querySelector(".restart");
const endText = document.querySelector(".end");

let currentState = 0;
let currentNumber = '';
let blankVote = false;
let nullVote = false;
let endState = false;
let votes = [];


function startState() {
    let state = states[currentState];

    let numberHTML = "";
    currentNumber = "";
    blankVote = false;

    for(let i = 0; i < state.digits; i++){
        if(i === 0){
            numberHTML += '<div class="number blink"></div>';
        }
        else{
            numberHTML += '<div class="number"></div>';
        }
    }
    
    yourVoteTitle.style.display = "none";
    office.innerHTML = state.title.toUpperCase();
    description.innerHTML = "";
    help.style.display = "none";
    screenAside.innerHTML = "";
    restartButton.style.display = "none";
    numbers.innerHTML = numberHTML;
}


function interfaceUpdate() {
    const state = states[currentState];
    let candidate = state.candidates.filter((item) => {
        if(item.number === currentNumber){
            return true;
        }
        else{
            return false;
        }
    });

    if(candidate.length > 0){
        candidate = candidate[0];
        yourVoteTitle.style.display = "block";
        help.style.display = "block";

        if(candidate.vice === undefined){
            description.innerHTML = `
                Nome: ${candidate.name}<br/>
                Partido: ${candidate.party}
            `;
        }
        else{
            description.innerHTML = `
                Nome: ${candidate.name}<br/>
                Partido: ${candidate.party}<br/><br/>
                ${state.viceTitle}: ${candidate.vice}<br/>
            `;
        }
        
        let photosHTML = "";

        for(let i in candidate.photos){
            if(candidate.photos[i].small){
                photosHTML += `<div class="d-1-image small"><img src="img/${candidate.photos[i].url}" alt=""/>${state.viceTitle}</div>`;
            }
            else{
                photosHTML += `<div class="d-1-image"><img src="img/${candidate.photos[i].url}" alt=""/>${state.title}</div>`;
            }
        }

        screenAside.innerHTML = photosHTML;
    }
    else{
        yourVoteTitle.style.display = "block";
        help.style.display = "block";
        description.innerHTML = `
            <div>NUMERO ERRADO</div>
            <div class="big-warning blink">VOTO NULO</div>
        `;
    }
}


function endScreen() {
    endState = true;

    endText.style.display = "flex";

    yourVoteTitle.style.display = "none";
    restartButton.style.display = "none";
    help.style.display = "none";
    office.innerHTML = "";
    description.innerHTML = "";
    screenAside.innerHTML = "";
    numbers.innerHTML = "";

    execAudio("end");

    restartButton.style.display = "block";
}


function restart(){
    currentState = 0;
    currentNumber = '';
    blankVote = false;
    nullVote = false;
    endState = false;
    votes = [];

    endText.style.display = "none";

    startState();
}


function keyClick(n) {
    if(endState){
        alert("Votação encerrada, aperte no botão REINICIAR para uma nova simulação.");
        return;
    }

    execAudio("buttonClick");

    const elNumber = document.querySelector(".number.blink");

    if(elNumber !== null){
        elNumber.innerHTML = n;
        currentNumber += `${n}`;
        
        elNumber.classList.remove("blink");
        
        if(elNumber.nextElementSibling !== null){
            elNumber.nextElementSibling.classList.add("blink");
        }
        else{
            interfaceUpdate();
        }
    }
}


function blankClick() {
    if(currentNumber === "" && endState == false){
        execAudio("buttonClick");

        blankVote = true;

        yourVoteTitle.style.display = "block";
        help.style.display = "block";
        numbers.innerHTML = "";
        description.innerHTML = `
            <div class="big-warning blink">VOTO EM BRANCO</div>
        `;
    }
    else if(endState){
        alert("Votação encerrada, aperte no botão REINICIAR para uma nova simulação.");
    }
    else{
        alert("Para votar em BRANCO o campo de voto deve estar vazio. Aperte CORRIGE para apagar o campo de voto.");
    }
}

function correctClick() {
    if(endState){
        alert("Votação encerrada, aperte no botão REINICIAR para uma nova simulação.");
        return;
    }

    execAudio("buttonClick");

    startState();
}


function confirmClick() {
    if(endState){
        alert("Votação encerrada, aperte no botão REINICIAR para uma nova simulação.");
        return;
    }
    
    execAudio("buttonClick");

    const state = states[currentState];

    let confirmedVote = false;

    if(blankVote === true){
        confirmedVote = true;
        votes.push({
            state: states[currentState].title,
            vote: "branco"
        });
    }
    else if(currentNumber.length === state.digits){
        confirmedVote = true;
        votes.push({
            state: states[currentState].title,
            vote: currentNumber
        });
    }

    if(confirmedVote){
        currentState++;
        if(states[currentState] != undefined){
            startState();
        }
        else{
            endScreen();
            console.log(votes);
        }
    }
}


function execAudio(file){
    const music = new Audio("audio/"+file+".mp3");
    music.play();
}


startState();