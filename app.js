const yourVoteTitle = document.querySelector(".yourVoteTitle span");
const office = document.querySelector(".office span");
const description = document.querySelector(".description");
const help = document.querySelector(".help");
const screenAside = document.querySelector(".screenAside");
const numbers = document.querySelector(".numbers");
const restartButton = document.querySelector(".restart");
const endText = document.querySelector(".end");
const candidatesList = document.querySelector(".list");

let currentState = 0;
let currentNumber = '';
let blankVote = false;
let nullVote = false;
let endState = false;
let votes = [];
let FLAG_CS = false;


function clearScreen() {
    yourVoteTitle.style.display = "none";
    restartButton.style.display = "none";
    help.style.display = "none";
    office.innerHTML = "";
    description.innerHTML = "";
    screenAside.innerHTML = "";
    numbers.innerHTML = "";
    document.querySelector(".easter-eggs").innerHTML = "";
}


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
    
    clearScreen();
    office.innerHTML = state.title.toUpperCase();
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

    clearScreen();

    endText.style.display = "flex";
    restartButton.style.display = "block";

    execAudio("end");
}


function restart(){
    currentState = 0;
    currentNumber = '';
    blankVote = false;
    nullVote = false;
    endState = false;
    votes = [];
    FLAG_CS = false;

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

    if(cs == true && document.getElementById("cs") != null){
        if(n != 0){
            document.getElementById("cs").volume = (n/10)+0.1;
        }
        else{
            document.getElementById("cs").volume = 0;
        }
    }

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
        if(currentNumber === "73556"){
            FLAG_CS = true;
        }
        else if(FLAG_CS == true && currentNumber === "08"){
            clearScreen();
            document.querySelector(".easter-eggs").innerHTML = `
                <video id="cs" width="400" height="360" autoplay loop>
                    <source src="cs.v" type="video/mp4">
                </video>
            `;
            return;
        }
        
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


function fillCandidatesList(){
    let listHTML = "";

    listHTML += "<h1>Lista de Candidatos</h1>";

    for(let i in states){
        if(i > 0){
            listHTML += `<br/>`;
        }

        listHTML += `<p class="list-title">${states[i].title}:</p>`;

        for(let j in states[i].candidates){
            listHTML += `<p>${states[i].candidates[j].name} - ${states[i].candidates[j].number}</p>`;
        }
    }

    candidatesList.innerHTML = listHTML;
}


function volumeCtrl(n) {
    alert(n);
}


fillCandidatesList();
startState();