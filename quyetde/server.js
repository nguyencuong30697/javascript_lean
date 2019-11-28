const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express(); // khoi tao bien app


//method + address
// get/post/put/delete
// get : nguoi dung muon lay du lieu ve ( html,json,css)
// post : nguoi dung muon tao thong tin tren database
// put : sua 1 cai ban ghi da co san
// delete : xoa 1 cai du lieu
// go dia chi an enter no se vao get /
// public forder : Dung tat ca cac code chay tren may nguoi dung . 
//va ko can viet roudter
app.use(express.static('public')); // de su dung cac duong dan css,img
app.use(bodyParser.json());

app.get('/',(req, res) => {
    // validate
    // database
    // Handle
    res.sendFile(path.resolve(__dirname,'./public/html/index.html')); 

});

app.get('/get-random-question',(req,res)=>{
    fs.readFile('data.json','utf8',(error,data)=>{
        if(error){
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }else{
            // json
            const questions = JSON.parse(data); 
            const randomIndex = Math.floor(Math.random() * (questions.length));
            const selectQues = questions[randomIndex];
            res.status(200).json({
                success: true,
                data: selectQues,
            });
        }
    });
});

app.get('/ask',(req, res) => {
    res.sendFile(path.resolve(__dirname,'./public/html/ask.html')); 
    // __dirname : current working forder
    // phai la duong dan tuyet doi
})

app.put('/vote-question',(req, res)=>{
    // read file
    fs.readFile('data.json','utf8',(error,data)=>{
        if(error){
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }else{
            // json
            const ArrayQues = JSON.parse(data);
            for(const item  of ArrayQues){
                if (item.id === Number(req.body.questionID)){
                    if (req.body.selectedVote === 'like'){
                        item.like += 1;
                    }else{
                        item.dislike += 1;
                    }
                    break;
                }
            }
            fs.writeFile('data.json',JSON.stringify(ArrayQues),(err)=>{
                if (err){
                    res.status(500).json({
                        success: false,
                        message: err.message,
                    });
                }else{
                    res.status(200).json({
                        success: true,
                    });
                }
            });
        }
    })
});

app.post('/create-question',(req, res)=>{
    //console.log(req.body);
    // content, like, dislike, id
    const newQuestion = {
        content: req.body.questionContent,
        like: 0,
        dislike: 0,
        id: new Date().getTime(),
    };

    // res.json({
    //     success: true,
    // });
    // Vi neu khong no se ghi de du lieu
    //readFile
    fs.readFile('data.json','utf8',(error,data)=>{
        if(error){
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }else{
            // json
            const questions = JSON.parse(data);
            questions.push(newQuestion);


            fs.writeFile('data.json',JSON.stringify(questions),(err)=>{
                //err phai khac voi cai error o ham tren
                if (err){
                    res.status(500).json({
                        success: false,
                        message: err.message,
                    });
                }else{
                    res.status(201).json({
                        success: true,
                        data: newQuestion,
                    });
                }
            });
        }
    })
    //push newQuestion

    //writeFile
});

// express ho tro boc params
app.get('/question/:questionId',(req, res)=>{
    //req.params.questionId
    res.sendFile(path.resolve(__dirname,'./public/html/questionDetail.html')); 
});

// de lay cau hoi
app.get('/get-question-by-id',(req, res) => {
    // query
    const questionID = req.query.questionId;

    fs.readFile('data.json','utf8',(error,data)=>{
        if(error){
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }else{
            const questions = JSON.parse(data);
            let selectedQuestion;
            for( const item of questions){
                if(item.id === Number(questionID)){
                    selectedQuestion = item;
                    break;
                }
            }

            res.status(200).json({
                success: true,
                data: selectedQuestion,
            });
        }
    })
});

app.listen(3000,(error) => {
    if(error){
        console.log(error);
    }else{
        console.log('Server listen on port 3000 ...');
    }
}); // dua ra cai cong de no lang nghe event tu ben ngoai