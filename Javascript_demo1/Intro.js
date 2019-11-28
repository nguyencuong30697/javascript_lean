// var
// let
// const


// const myString = 'ABC';
// const my = "ABC1";
// const myNew = `abc ${my}`;

// const number = 4;


// const myFunction = (a, b, c) => {
      
// };

// const myArray = [1,2,3,4];

// const firstItem = myArray[0];
// const lengthArray = myArray.length;

// const Aobject = {
//     name : `abc`,
//     age : 21,
//     adress : {
//         city :`HN`,
//         country :`VN`
//     },
// };

// console.log(Aobject.name);

// console.log(window.innerHeight, window.innerWidth);
// console.log(window.location);

// get button element
   const btnRegister = document.getElementById("btnRegister");  
   const txtName = document.getElementById('txtName');
   //querySelector(".btnRegister") class
   console.log(btnRegister);
 
   // callback
   btnRegister.addEventListener('click',() => {
    if (!txtName.value){
        // show message
        const error = document.querySelector('.errorMessage');
        error.textContent = 'ABC Error';
    }
   });
   
// add event listener
