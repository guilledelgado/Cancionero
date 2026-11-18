let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".seccion-formulario");
let botonSesion = document.querySelector(".formulario-login .clkbtn");
let botonRegistro = document.querySelector(".formulario-registro .clkbtn");

signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});

botonSesion.addEventListener("click", async ()=>{
    
    const usuario = document.querySelector("#nombre-usuario").value;
    const contraseña = document.querySelector("#contraseña").value;

    const respuesta = await fetch('/inicio-sesion', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({usuario, contraseña})
        });
    const datos = await respuesta.json();
    
    if(datos.exito){
        window.location.href='/';
    } else {
        //Ventana que muestra error
    }
});

botonRegistro.addEventListener("click", async()=>{
    const usuario = document.querySelector("#reg-nombre-usuario").value;
    const email = document.querySelector("#email").value;
    const contraseña = document.querySelector("#reg-contraseña").value;
    const contraseñaConfirmada = document.querySelector("#confirmar-contraseña").value;
    if(contraseña===contraseñaConfirmada){
        const respuesta = await fetch('/registro', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({usuario, email, contraseña})
        });
        const datos = await respuesta.json();
        if(datos.exito){
            window.location.href='/';
        } else {
            //Algo para mostrar error
        }
    } else {
        //algo para mostrar error 2
    }
});