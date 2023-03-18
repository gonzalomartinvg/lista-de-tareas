//FUNCIONES

//1) Función agregar tarea

let inputPrincipal = document.querySelector("#inputPrincipal");
let botonPrincipal = document.querySelector("#botonPrincipal");
let selectTipoDeTarea = document.querySelector(".elegirTipoDeTarea");
let inputResponsable = document.querySelector(".inputResponsable");

botonPrincipal.addEventListener("click", agregarTarea);

function agregarTarea(e){

    e.preventDefault();
    
    const text = inputPrincipal.value; //Le damos a la const text, el valor que cargo el usuario.
    const responsable = " " + "(" + inputResponsable.value + ")";

    if (text == "" || responsable == ""){

        const contenedorModal = document.querySelector(".contenedor-modal")
        const modalClose = document.querySelector(".modal-close")

        contenedorModal.classList.add("contenedor-modal--show");

        modalClose.addEventListener('click', (e)=>{

            e.preventDefault();
            contenedorModal.classList.remove("contenedor-modal--show"); 

        });

    }

    if (text !== "" & responsable !== ""){

        let tipoDeTarea = `#` + selectTipoDeTarea.value;

        function filtrarTipoDeTarea(){

            let listaTareas = document.querySelector(tipoDeTarea);

            const pAutoGenerado = document.createElement("p");

            const contenidoAutoGenerado = //Las `` siguientes se utilizan para hacer un html literal
                `
                <div class="tareaAgregada">
                    <input class="checkBox" type="checkbox">
                    <p class="textoAgregado">${text}${responsable}</p>
                    <button class="botonBorrar">X</button>
                </div>

                `; 

            pAutoGenerado.innerHTML = contenidoAutoGenerado;

            listaTareas.appendChild(pAutoGenerado);

            let textoInicial = listaTareas.firstElementChild;

            textoInicial.style.display= "none";
        }

        filtrarTipoDeTarea();

//2) Función que tacha las tareas realizadas

        let todosLosBotonesCheck = document.querySelectorAll(".checkBox");

        todosLosBotonesCheck.forEach(botonCheck => {
            botonCheck.addEventListener("change", tacharTareaRealizada);
        });

        function tacharTareaRealizada(e){

            if (e.target.checked == true){
                e.target.nextElementSibling.classList.add("tachar")
            }

            else{
                e.target.nextElementSibling.classList.remove("tachar")
            }

        }

//3) Función borrar tarea

        let todosLosBotonesBorrar = document.querySelectorAll(".botonBorrar")

        todosLosBotonesBorrar.forEach(botonDelEvento => {
            botonDelEvento.addEventListener("click", borrarTarea);
        });

        function borrarTarea(e){

            const divDeTarea = e.target.parentElement;

            const divTodasLasTareas = divDeTarea.parentElement.parentElement;

            console.log(divTodasLasTareas);

            divDeTarea.remove();

            if (divTodasLasTareas.outerText == ""){
                divTodasLasTareas.firstElementChild.style.display= "block";
            }

        }
    }

}

//4) Función editar nombre de columnas

let todosLosBotonesEditar = document.querySelectorAll(".editar");

todosLosBotonesEditar.forEach(botonDelEvento => {
    botonDelEvento.addEventListener("click", editar);
});

function editar(e){

    let inputAEditar = e.target.previousElementSibling;

    inputAEditar.removeAttribute("disabled");

    inputAEditar.focus();

    inputAEditar.addEventListener("change", modificarInput);

    function modificarInput(e){

        inputAEditar.setAttribute('disabled', '');

        modificadorSelectTipoDeTarea = `#select-` + e.target.dataset.valor;

        let selectAModificar = document.querySelector(modificadorSelectTipoDeTarea);

        selectAModificar.textContent = inputAEditar.value;

    }

}

