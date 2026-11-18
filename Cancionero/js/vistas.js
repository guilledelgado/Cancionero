const header = document.querySelector('header');
async function cargarHeader() {
    const respuesta = await fetch('/sesion');
const datos = await respuesta.json();
if(datos.logueado){
    header.innerHTML = `<div class="logo">
                    <a href="/home.html"><img src="../multimedia/cancionero-logo-dorado.png" alt="Logo del sitio"></a>
                </div>
                <div class="buscador-navegacion">
                    <nav class="links-navegacion">
                        <a href="/artistas.html">Artistas</a>
                        <a href="/canciones.html">Canciones</a>
                        <p>${datos.usuario}</p>
                        <a class="boton-destacado-claro cerrar-sesion">Cerrar sesión</a>
                    </nav>

                </div>`;
    let botonCerrarSesion = document.querySelector(".cerrar-sesion");
botonCerrarSesion.addEventListener("click", async()=>{
    const respuesta = await fetch('/cerrar-sesion', {method: 'POST'});
    window.location.href = '/';
});
} else {
    header.innerHTML = `<div class="logo">
                    <a href="/home.html"><img src="../multimedia/cancionero-logo-dorado.png" alt="Logo del sitio"></a>
                </div>
                <div class="buscador-navegacion">
                    <nav class="links-navegacion">
                        <a href="/artistas.html">Artistas</a>
                        <a href="/canciones.html">Canciones</a>
                        <a class="boton-destacado-claro" href="/inicio-sesion.html">Iniciar sesión</a>
                    </nav>

                </div>`
}
}
cargarHeader();

const footer = document.querySelector('footer');
footer.innerHTML = `        <div class="footer-columnas">
            <div class="columna-footer">
                <h4>Sobre Cancionero</h4>
                <p>Cancionero es un proyecto con acordes de guitarra de bandas argentinas</p>
            </div>

            <div class="columna-footer">
                <h4>Contacto</h4>
                <a href="https://github.com/guilledelgado" target="_blank" rel="noopener noreferrer">Chicho</a>
                <a href="https://github.com/LucasZunigaG" target="_blank" rel="noopener noreferrer">Lucas</a>
                <a href="https://github.com/farielmunoz" target="_blank" rel="noopener noreferrer">Facu</a>
            </div>
        </div>
        <p class="copyright">© 2026 Cancionero</p>`
