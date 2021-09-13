let states = [
    {
        title: "Vereador",
        digits: 5,
        candidates: [
            {
                number: "38111",
                name: "Obrahma",
                party: "Kgfgjmkhjlkkkghk",
                photos:[
                    {
                        url:"38111.jpg"
                    }
                ]
            },
            {
                number: "77222",
                name: "Bonoro Peixe",
                party: "CANALHAS",
                photos:[
                    {
                        url:"77222.jpg"
                    }
                ]
            },
            {
                number: "98765",
                name: "Freddie Mercury",
                party: "Prey2",
                photos:[
                    {
                        url:"98765.jpg"
                    }
                ]
            },
        ]
    },
    {
        title: "Prefeito",
        viceTitle: "Vice-Prefeito",
        digits: 2,
        candidates: [
            {   
                number: "15",
                name: "Griss Vascaíno",
                party: "Trollo Griss",
                vice: "Julius Coritibano",
                photos:[
                    {
                        url:"15.jpg"
                    },
                    {
                        url:"15_2.jpg",
                        small:true
                    }
                ]
            },
            {   
                number: "22",
                name: "Nego Ney",
                party: "Benevolência",
                vice: "Cirilo Cascudo",
                photos:[
                    {
                        url:"22.jpg"
                    },
                    {
                        url:"22_2.jpg",
                        small:true
                    }
                ]
            },
            {
                number: "84",
                name: "Lula Cachacinha",
                party: "POLÍTICA BRASILEIRA KKKKKKKK",
                vice: "Temer Coringa",
                photos:[
                    {
                        url:"84.jpg"
                    },
                    {
                        url:"84_2.jpg",
                        small:true
                    }
                ]
            },
        ]
    },
]

let candidatesList = document.querySelector(".list");

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

fillCandidatesList();