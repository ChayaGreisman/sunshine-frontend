const studentsUrl = "http://localhost:3000/children"


document.addEventListener("DOMContentLoaded",()=>{
    loadExistingChildren()
    clickEventListeners()
    
})



    function clickEventListeners(){
        document.addEventListener("click", e=>{
            
            if(e.target.className==="login-btn"){
                const email = document.querySelector(".login-form").email.value
                const password = document.querySelector(".login-form").password.value
                if(email === "" || password ===""){
                alert("Please fill out all fields in form.")
                }else{
                document.querySelector("div.login-container").classList.toggle("d-none")
                document.querySelector("main").classList.toggle("d-none")
                e.target.closest("form").reset()
                }
            } 
            
            if(e.target.className==="logout-btn"){
            document.querySelector("div.login-container").classList.toggle("d-none")
            document.querySelector("main").classList.toggle("d-none")
            }
        })
    }


    function loadExistingChildren(){
        fetch(studentsUrl)
        .then(resp => resp.json())
        .then(children => {
            renderChildCards(children)
        })
        .catch(err => console.log(err))
    }

    function renderChildCards(children){
        children.forEach(child =>{
          renderChildCard(child)
        })
    }

    function renderChildCard(child){
        const cardContainer = document.querySelector("#child-cards-container")
        const card = 
        `<div class="child-card" data-child-id=${child.id}>
            <img class="child-image" src="${child.img_url}" alt="${child.name}">
            <h2 class="child-name">${child.name}</h2>
            <h4 style="color:#da9d03;">${child.birthday}</h4><br>
            ${isPottyTrained(child.potty_trained)}
            <h4 class="secondary-title">Allergies:</h4>
            <div class="allergy-list">
                ${renderExistingAllergies(child.allergies,child.id)}
                <button type="button" class="add-allergy" data-child-id=${child.id}>+</button>
            </div>
            <br>
            <h4 class="secondary-title">Toys:</h4>
            <div class="toys">
                ${renderExistingToys(child.toys, child.id)}
                <button type="button" class="add-toy" data-child-id=${child.id}>+</button>
            </div>
            <form action="mailto:${child.parent_email}?subject=Daily Sunshine Report for ${child.name}!" method="post" enctype="text/plain">
            <input type="submit" class="open-report-form-btn" value="Send Sunshine Note" data-child-id=${child.id} data-email=${child.parent_email}>
            </form>
        </div>`
        cardContainer.insertAdjacentHTML("beforeend", card)
    }

    function isPottyTrained(trained){
        if(trained){
            return `<img class="potty-trained-image" src="./assets/potty.png" alt="trained">`
        } else {
            return `<img class="potty-trained-image" src="./assets/diaper.png" alt="not-trained">`
        }
    }

    function renderExistingAllergies(allergies, childId){
        let allergyPTags="";
        if(!!allergies){
            allergies.forEach(allergy=>{
                const allergyP = `<p class="allergy" data-child-id=${childId}>❗️${allergy.name}</p>`
                allergyPTags += allergyP
            })
        }
        return allergyPTags
    }

    function renderExistingToys(toys, childId){
        let toyImages="";
        if(!!toys){
            toys.forEach(toy=>{
                const toyImg = `<img class="toy-image" src="${toy.img_url}" alt="${toy.name}" data-child-id=${childId}>`
                toyImages += toyImg
            })
        }
        return toyImages
    }


    
