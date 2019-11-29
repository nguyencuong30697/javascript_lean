window.onload = ()=>{
    document.querySelector('.search').addEventListener('submit',(event)=>{
        event.preventDefault(); // bo cau tu submit form va no tu dong request nen phai lam ntn
        const searchText = document.querySelector('.search-result').value;
        //fetch to serve
        fetch(`/search-Question?keyword=${searchText}`)
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{

                console.log(data.data);
                const resultelement = document.querySelector('.search-result1');
                if(data.data.length === 0){
                    resultelement.innerHTML='';
                    resultelement.insertAdjacentHTML('beforeend',`
                        <div>
                        No Question Found
                        </div>
                    `);
                }else{
                    resultelement.innerHTML='';
                    for(const item of data.data){
                        resultelement.insertAdjacentHTML('beforeend',`
                        <div>
                        ${item.content}
                        </div>
                        <div>
                        ${item.like}
                        </div>
                        <div>
                        ${item.dislike}
                        </div>
                        <div>
                        ---------------------------------
                        </div>
                    `);
                    }
                }
            })
            .catch((error)=>{
                console.log(error);
                window.alert(error.message);
            });
    });
}