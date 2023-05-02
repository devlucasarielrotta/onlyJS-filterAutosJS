// variables

const marca = document.querySelector('#marca');

const buscador = document.querySelector('#buscador');
const max = new Date().getFullYear();
const min = max - 10;
const resultado = document.querySelector('#resultado')

// generar objeto de busqueda
const datosBusqueda = {
    marca:'',
    year: '',
    minimo:'',
    maximo:'',
    puertas:'',
    transmision:'',
    color:''
}
document.addEventListener('DOMContentLoaded', () => {

    //eventos
    mostrarAutos( autos );
    llenarSelect();
   
})

// events para los select

buscador.addEventListener('change', (e) => {

    datosBusqueda[e.target.id] = e.target.value;
    filtrarAuto( autos )

})

//funciones
function mostrarAutos( autos ){

    limpiarHTML()

    const fragment = document.createDocumentFragment(); 
    autos.forEach(auto => {
        
        const autoHTML = document.createElement('p');
        const {marca,modelo,year,precio,puertas,color,transmision} = auto;
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - Color: ${color} 
        `
        fragment.appendChild(autoHTML)
    }) 

    // inserta en el html
    resultado.appendChild(fragment)
}

// limpiar HTML
function limpiarHTML(){
    while( resultado.firstChild ){
        resultado.removeChild( resultado.firstChild )
    }
}


function llenarSelect(){
    const fragment = document.createDocumentFragment();

    for (let i = max; i>= min;i--){

        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        fragment.appendChild(opcion);
    }   

    year.appendChild(fragment);
}


// filtrar autos

function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor )

    if( resultado.length === 0 ) {
        noResultado();
        return ;
    }

    mostrarAutos( resultado );

}

function noResultado(){

    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta','error');
    noResultado.textContent = 'No hay resultados para la búsqueda indicada';
    resultado.appendChild(noResultado)
}

function filtrarMarca( auto ) {
    const {marca} = datosBusqueda;
    
    if( marca ){
        return auto.marca === marca
    }

    return auto;
}

function filtrarYear( auto ) {
    const { year } = datosBusqueda;
    if( year ){
        return auto.year === Number(year)
    }

    return auto;
}


function filtrarMinimo( auto ) {

    const { minimo } = datosBusqueda;
 
    if( minimo ){
        return auto.precio >= minimo;
    }

    return auto;
}

function filtrarMaximo( auto ) {

    const { maximo } = datosBusqueda;
 
    if( maximo ){
        return auto.precio <= maximo;
    }

    return auto;
}

function filtrarPuertas ( auto ) {
    const { puertas } = datosBusqueda;
    
    if( puertas ){
        return auto.puertas === Number(puertas);
    }

    return auto;
}

function filtrarTransmision ( auto ) {
    const { transmision } = datosBusqueda;
    
    if( transmision ){
        return auto.transmision === transmision;
    }

    return auto;
}


function filtrarColor ( auto ) {
    const { color } = datosBusqueda;
    
    if( color ){
        return auto.color == color;
    }

    return auto;
}
