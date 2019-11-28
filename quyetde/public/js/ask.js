window.onload = () => {
     const btnSubmit = document.querySelector('.submitBTN');
     if(btnSubmit){
         btnSubmit.addEventListener('click',(event) => {
             event.preventDefault(); 
             // li do la vi khi ma submit cai btn trong cai form thi no
             // se tu dong gui request den dung cai current duong dan  

             const txtQues = document.querySelector('.txtArea').value;

            // send request to server
            // create new question
            // question content
            // thao tac bat dong bo ko biet khi nao xong
            fetch('/create-question',{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    questionContent: txtQues,
                }),
            })
                .then((response)=>{
                    //response.json() => only when server response with json
                    //response.text() => only when server response with string
                    return response.json(); // no se tra tiep ve cai then tiep theo
                }) // chay khi request nay thanh cong
                .then((data)=>{ // vi cai then o tren cung la bat dong bo
                    // handle response data
                    // redirect : chuyen huong nguoi dung
                    window.location.href = `/question/${data.data.id}`;
                })
                .catch((error)=>{
                    console.log(error);
                    window.alert(error.messagge);
                }); // chay khi request that bai
         });
     }
};