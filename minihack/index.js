const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const body_parser = require('body-parser');
const GameModel = require("./public/module/games.model");


mongoose.connect(`mongodb://localhost:27017/minihack`,(error)=>{
    if(error){
        console.log(error);
    }else{
        const app = express();

        //middleware
        app.use(express.static('public'));
        app.use(body_parser.json());

        // static group 
        app.get('/',(_req,res)=>{
            res.sendFile(path.resolve(__dirname,'./public/html/index.html')); 
        });


        app.get('/games/:gameId',(_req,res)=>{
            res.sendFile(path.resolve(__dirname,'./public/html/game-detail.html')); 
        });

        //json router
        app.post('/create-game',(req,res)=>{
            const users = req.body.users;

            GameModel.create({
                user : users,
                score : [], 
            },(error,data)=>{
                if(error){
                    res.status(500).json({
                        success : false,
                        message : error.message,
                    });
                }else{
                    res.status(201).json({
                        success : true,
                        data : data,
                    });
                }
            });
        });

        app.get(`/get-game-by-id`,(req,res)=>{
            const gameId = req.query.gameId;

            GameModel.findById(gameId,(error,data)=>{
                if(error){
                    res.status(500).json({
                        success : false,
                        message : error.message,
                    });
                }else{
                    res.status(201).json({
                        success : true,
                        data : data,
                    });
                }                
            });
        }); 

        app.put('/update-score',(req,res)=>{
            const scorePosition = `score.${req.body.round}.${req.body.player}`;
            GameModel.findByIdAndUpdate(req.body.gameId, {$set : {
                [scorePosition] : Number(req.body.value),
            }},(error,_data)=>{
                if(error){
                    res.status(500).json({
                        success : false,
                        message : error.message,
                    });
                }else{
                    // console.log(data);
                    res.status(201).json({
                        success : true,
                        // data : data,
                    });
                }
            });
        });

        app.put('/add-round',(req,res)=>{
            GameModel.findByIdAndUpdate(req.body.gameId, {$push:{
                score: [0,0,0,0],
            }},(err)=>{
                if(error){
                    res.status(500).json({
                        success : false,
                        message : error.message,
                    });
                }else{
                    // console.log(data);
                    res.status(201).json({
                        success : true,
                        // data : data,
                    });
                }
            });
        });

        //start server
        app.listen(3000,(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log(`Server listen on port 3000 ....`)
            }
        });
    }
});