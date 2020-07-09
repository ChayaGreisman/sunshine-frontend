document.addEventListener("DOMContentLoaded",()=>{

    document.addEventListener("click", e=>{
        e.preventDefault()
        if(e.target.className==="login-btn"){
            const email = document.querySelector(".login-form").email.value
            const password = document.querySelector(".login-form").password.value
            if(email === "" || password ===""){
              alert("Please fill out both fields.")
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

   

})
