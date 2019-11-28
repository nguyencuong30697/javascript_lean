window.onload = ()=>{
    const votequestion = (questionID,selectedVote) => {
        fetch(`/vote-question`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questionID: questionID,
                    selectedVote:selectedVote,
                }),
            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                window.location.href= `/question/${questionID}`;
            })
            .catch((error) => {
                console.log(error);
                window.alert(error.message);
            });
    }

    fetch('/get-random-question')
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            console.log(data)
            document.querySelector('.question-content').innerHTML = data.data.content;
            // document.querySelector('question-content').innerHTML = data.data.context;

            // listener
            document.querySelector('.btnlike').addEventListener('click',()=>{
                votequestion(data.data.id,'like');
            });
            document.querySelector('.btndislike').addEventListener('click',()=>{
                votequestion(data.data.id,'dislike');
            });
            document.querySelector('.result-button').addEventListener('click',()=>{
                window.location.href = `/question/${data.data.id}`;
            });
            document.querySelector('.other-button').addEventListener('click',()=>{
                window.location.reload();
            });
        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);
        });
};