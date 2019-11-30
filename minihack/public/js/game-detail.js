//scores mang 2 chieu
let a = undefined;
const calculate = (scores)=>{
    let sos = [0,0,0,0];
    let total = 0;

    for(let i=0;i<scores.length;i+=1){
        for(let j=0;j<scores[i].length;j+=1){
            total += scores[i][j];
            sos[j] += scores[i][j];
        }
    }

    return{
        sos : sos,
        total : total,
    }
};

const updateScore= (gameID,round,player,newScore)=>{
    fetch('/update-score',{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            gameId : gameID,
            round: round,
            player: player,
            value: newScore,
        })
    })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
            window.alert(err.message);
        });  
};

const addRound = (gameId,roundIndex,roundScore)=>{
    const tablerow = document.createElement('tr');
    const tbdata = document.createElement('td');
    tbdata.innerText = `Round ${roundIndex + 1}`;
    const tbdata1 = document.createElement('td');
    tbdata1.innerHTML = ` <input class="form-control" type='number' value='${roundScore[0]}' id='${roundIndex}-${0}' />`;
    const tbdata2 = document.createElement('td');
    tbdata2.innerHTML = ` <input class="form-control" type='number' value='${roundScore[1]}' id='${roundIndex}-${1}' />`;
    const tbdata3 = document.createElement('td');
    tbdata3.innerHTML = ` <input class="form-control" type='number' value='${roundScore[2]}' id='${roundIndex}-${2}' />`;
    const tbdata4 = document.createElement('td');
    tbdata4.innerHTML = ` <input class="form-control" type='number' value='${roundScore[3]}' id='${roundIndex}-${3}' />`;

    tbdata1.addEventListener('input',(event)=>{
        //save database
        const newScore = event.target.value;
        updateScore(gameId,roundIndex,0,newScore);
        console.log(`----------------------`);
        console.log(a);
        a.score[roundIndex][0] = Number(newScore);
        const totalScore = calculate(a.score);
        document.querySelector('.tbhead').innerHTML = `
            <tr>
                <th scope="col"></th>
                <th scope="col">${a.user[0]}</th>
                <th scope="col">${a.user[1]}</th>
                <th scope="col">${a.user[2]}</th>
                <th scope="col">${a.user[3]}</th>
            </tr>
            <tr>
                <th scope="col ">Sum of Scores (${totalScore.total})</th>
                <th scope="col">${totalScore.sos[0]}</th>
                <th scope="col">${totalScore.sos[1]}</th>
                <th scope="col">${totalScore.sos[2]}</th>
                <th scope="col">${totalScore.sos[3]}</th>
            </tr>
        `;       
        // re-call sum of score 
    });
    tbdata2.addEventListener('input',(event)=>{
        //save database
        const newScore = event.target.value;
        updateScore(gameId,roundIndex,1,newScore);
        a.score[roundIndex][1] = Number(newScore);
        const totalScore = calculate(a.score);
        document.querySelector('.tbhead').innerHTML = `
            <tr>
                <th scope="col"></th>
                <th scope="col">${a.user[0]}</th>
                <th scope="col">${a.user[1]}</th>
                <th scope="col">${a.user[2]}</th>
                <th scope="col">${a.user[3]}</th>
            </tr>
            <tr>
                <th scope="col ">Sum of Scores (${totalScore.total})</th>
                <th scope="col">${totalScore.sos[0]}</th>
                <th scope="col">${totalScore.sos[1]}</th>
                <th scope="col">${totalScore.sos[2]}</th>
                <th scope="col">${totalScore.sos[3]}</th>
            </tr>
        `;       
        // re-call sum of score 
    });
    tbdata3.addEventListener('input',(event)=>{
        //save database
        const newScore = event.target.value;
        updateScore(gameId,roundIndex,2,newScore);
        a.score[roundIndex][2] = Number(newScore);
        const totalScore = calculate(a.score);
        document.querySelector('.tbhead').innerHTML = `
            <tr>
                <th scope="col"></th>
                <th scope="col">${a.user[0]}</th>
                <th scope="col">${a.user[1]}</th>
                <th scope="col">${a.user[2]}</th>
                <th scope="col">${a.user[3]}</th>
            </tr>
            <tr>
                <th scope="col ">Sum of Scores (${totalScore.total})</th>
                <th scope="col">${totalScore.sos[0]}</th>
                <th scope="col">${totalScore.sos[1]}</th>
                <th scope="col">${totalScore.sos[2]}</th>
                <th scope="col">${totalScore.sos[3]}</th>
            </tr>
        `;       
        // re-call sum of score 
    });
    tbdata4.addEventListener('input',(event)=>{
        //save database
        const newScore = event.target.value;
        updateScore(gameId,roundIndex,3,newScore);
        a.score[roundIndex][3] = Number(newScore);
        const totalScore = calculate(a.score);
        document.querySelector('.tbhead').innerHTML = `
            <tr>
                <th scope="col"></th>
                <th scope="col">${a.user[0]}</th>
                <th scope="col">${a.user[1]}</th>
                <th scope="col">${a.user[2]}</th>
                <th scope="col">${a.user[3]}</th>
            </tr>
            <tr>
                <th scope="col ">Sum of Scores (${totalScore.total})</th>
                <th scope="col">${totalScore.sos[0]}</th>
                <th scope="col">${totalScore.sos[1]}</th>
                <th scope="col">${totalScore.sos[2]}</th>
                <th scope="col">${totalScore.sos[3]}</th>
            </tr>
        `;       
        // re-call sum of score 
    });

    tablerow.appendChild(tbdata);
    tablerow.appendChild(tbdata1);
    tablerow.appendChild(tbdata2);
    tablerow.appendChild(tbdata3);
    tablerow.appendChild(tbdata4);



    document.querySelector('.tbbody').appendChild(tablerow);

};

window.onload = ()=>{
    const pathName = window.location.pathname.split('/');
    const gameId = pathName[pathName.length-1];

    fetch(`/get-game-by-id?gameId=${gameId}`)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            a = data.data;
            const totalScore = calculate(data.data.score);


            document.querySelector('.tbhead').insertAdjacentHTML('beforeend',`
                <tr>
                    <th scope="col"></th>
                    <th scope="col">${data.data.user[0]}</th>
                    <th scope="col">${data.data.user[1]}</th>
                    <th scope="col">${data.data.user[2]}</th>
                    <th scope="col">${data.data.user[3]}</th>
                </tr>
                <tr>
                    <th scope="col ">Sum of Scores (${totalScore.total})</th>
                    <th scope="col">${totalScore.sos[0]}</th>
                    <th scope="col">${totalScore.sos[1]}</th>
                    <th scope="col">${totalScore.sos[2]}</th>
                    <th scope="col">${totalScore.sos[3]}</th>
                </tr>
            `);

            for(let i=0;i<data.data.score.length;i+=1){
                addRound(gameId,i,data.data.score[i]);
            }

        })
        .catch((error)=>{
            console.log(error);
            window.alert(error.message);
        });

        document.querySelector('.btnAdd').addEventListener('click',(event)=>{
            event.preventDefault();
            // update database
            fetch('/add-round',{
                method:'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                   gameId : a._id, 
                }),
            })
                .then((res)=>{
                    return res.json;
                }) 
                .then((data)=>{
                    a.score.push([0,0,0,0]);
                    addRound(a._id,a.score.length-1,[0,0,0,0]);
                })
                .catch((err)=>{
                    console.log(err);
                    window.alert(err.message);
                });
            // render new round
        })
};

