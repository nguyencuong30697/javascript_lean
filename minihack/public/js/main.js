window.onload = () => {
    console.log(`ScoreKepper`);
    document.querySelector(`.create-game-form`).addEventListener('submit', (event) => {
        event.preventDefault();
        const player1 = document.querySelector(`.player1`).value;
        const player2 = document.querySelector(`.player2`).value;
        const player3 = document.querySelector(`.player3`).value;
        const player4 = document.querySelector(`.player4`).value;

        if (!player1 || !player2 || !player3 || !player4) {
            document.querySelector('.error').insertAdjacentHTML('beforeend', `
            <div class="alert alert-danger" role="alert">
            Please Input PlayerName
            </div>
            `);
        }else{
            document.querySelector('.error').innerHTML='';

            //ftech to serve
            fetch(`/create-game`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    users: [player1,player2,player3,player4],
                }),
            })
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    window.location.href = `/games/${data.data._id}`;
                })
                .catch((error)=>{
                    console.log(error);
                    document.querySelector('.error').insertAdjacentHTML('beforeend', `
                    <div class="alert alert-danger" role="alert">
                    ${error.message}
                    </div>
                    `);
                });
        }
    });
};