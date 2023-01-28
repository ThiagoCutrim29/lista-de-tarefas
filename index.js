/*const tempLista = {
    data: "20/01/2023",
    hora: "10:46",
    tarefa: "estudar até as 4 da tarde"
}
*/

const getlocalStorage = () => JSON.parse(localStorage.getItem('db_lista')) ?? []
const setlocalStorage = (db_lista) => localStorage.setItem('db_lista', JSON.stringify(db_lista));

const createLista = (lista) => {
    const db_lista = getlocalStorage()
    db_lista.push(lista);
    setlocalStorage(db_lista)
}
const readLista = () => getlocalStorage()

const updateLista = (index, lista) => {
    const dbLista = readLista()
    dbLista[index] = lista
    setlocalStorage(dbLista)
}
const deleteLista = (index) => {
    const dbLista = readLista()
    dbLista.splice(index, 1)
    setlocalStorage(dbLista)
}

const Validado = () => {
    return document.getElementById('formtf').reportValidity()
}
const saveLista = () => {
    if (Validado()) {
        const lista = {
            calendario: document.getElementById('calendario').value,
            hora: document.getElementById('hora').value,
            tarefa: document.getElementById('tarefa').value,

        }
        const index=document.getElementById('calendario').dataset.index
        if(index=='new'){
            createLista(lista)
        updateTable()
        }else{
            updateLista(index, lista)
            updateTable()
        }

        
    }
}


const creatRow = (lista, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
                <td>${lista.calendario}</td>
                <td>${lista.hora}</td>
                <td>${lista.tarefa}</td>
                <td>
                    <button type ="button" class="buttons" id='editar-${index}'>EDITAR</button>
                    <button type ="button" class="buttons" id='excluir-${index}'>EXCLUIR</button>  
                </td> 
        `
    document.querySelector('#tbtarefa>tbody').appendChild(newRow)
}


const clearTable = () => {
    const rows = document.querySelectorAll('#tbtarefa>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const db_lista = readLista()
    clearTable()
    db_lista.forEach(creatRow)
}
updateTable()






const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')
        if (action == 'editar') {
            editLista(index)
           
        } else {
            deleteLista(index)
            
            updateTable()
           
        }
    }

}
const editLista=(index)=>{
    const lista=readLista()[index]
    lista.index=index
    preencherCampos(lista)
}

const preencherCampos=(lista)=>{
    document.getElementById('calendario').value=lista.calendario
    document.getElementById('hora').value=lista.hora
    document.getElementById('tarefa').value=lista.tarefa
    document.getElementById('calendario').dataset.index=lista.index
}





document.getElementById('enviar')
    .addEventListener('click', saveLista)

document.querySelector('#tbtarefa>tbody')
    .addEventListener('click', editDelete)

