
async function myfunc(){
    let obj={
        name: document.getElementById('name').value,
        batch: document.getElementById('batch').value,
        section: document.getElementById('section').value,
        score: +document.getElementById('eval_score').value,
        image: document.getElementById('image').value
    }
    console.log(obj)
    try{
        let data = await fetch(`https://online-49e8.onrender.com/masai`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj)
                });
        data = await data.json();
        console.log(data)
    }catch(err){
        console.log(err)
    }
}

async function getData () {
    try{
        let data = await fetch(`https://online-49e8.onrender.com/masai`,{
            method:"GET"
        });
        data = await data.json();
        console.log(data)
        displayData(data)
    }catch(err){
        console.log(err)
    }
}
getData();

let inputEnabled = false; 
function displayData(data){
    let con = document.getElementById("container");
    con.innerHTML = null;
    data.forEach((e,i)=>{
        let div = document.createElement("div");
        div.style.borderRadius="10px";
        div.setAttribute("class","student")

        let name = document.createElement("h3");
        name.textContent = e.name;

        let score = document.createElement("p");
        score.textContent = e.score;
        score.setAttribute("class","student_score")

        let batch = document.createElement("p");
        batch.textContent = `Batch: ${e.batch}`;

        let section = document.createElement("p");
        section.textContent = e.section;

        let buttons = document.createElement("div");

        let update = document.createElement("button");
        update.textContent = 'Update'
        update.setAttribute("class","update_score")
        update.addEventListener("click",async function(){
            if (inputEnabled) {
                obj={score:inputElement.value};
                try{
                    await fetch(`https://online-49e8.onrender.com/masai/${e.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(obj)
                        }).then((res)=>res.json())
                        .then((res)=>getData())
                        .catch((err)=>console.log(err))
                }catch(err){
                    console.log(err)
                }
            } else {
                enableInput();
            }
        })

        let remove = document.createElement("button");
        remove.textContent = 'Remove'
        remove.setAttribute("class","remove_student")
        remove.addEventListener("click",async function(){
                await fetch (`https://online-49e8.onrender.com/masai/${e.id}`,{
                    method:"DELETE",
                }).then((res)=>res.json())
                .then((res)=>getData())
                .catch((err)=>console.log(err))
        })

        buttons.append(remove, update);

        div.append(name,score,batch,section,buttons);
        con.append(div);
    });
}

const inputElement = document.getElementById('new_score');
function enableInput() {
    inputElement.removeAttribute('disabled');
    inputEnabled = true;
}

async function lowtoHigh(){
    try{
        let data = await fetch(`https://online-49e8.onrender.com/masai/?_sort=score&_order=asc`,{
            method:"GET"
        });
        data = await data.json();
        console.log(data)
        displayData(data)
    }catch(err){
        console.log(err)
    }
}

async function hightolow(){
    try{
        let data = await fetch(`https://online-49e8.onrender.com/masai/?_sort=score&_order=desc`,{
            method:"GET"
        });
        data = await data.json();
        console.log(data)
        displayData(data)
    }catch(err){
        console.log(err)
    }
}

async function greater(){
    try{
        let data = await fetch(`https://online-49e8.onrender.com/masai/?score_gte=5`,{
            method:"GET"
        });
        data = await data.json();
        console.log(data)
        displayData(data)
    }catch(err){
        console.log(err)
    }
}

async function less(){
    try{
        let data = await fetch(`https://online-49e8.onrender.com/masai/?score_lte=5`,{
            method:"GET"
        });
        data = await data.json();
        console.log(data)
        displayData(data)
    }catch(err){
        console.log(err)
    }
}