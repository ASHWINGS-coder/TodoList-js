//Select Elements

const clear = document.querySelector(".clear");
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById("text");

//classes names

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables 
let LIST = [], id = 0;

// Show todays date

const options = {weekday :"long" , month:"short" , day:"numeric"}
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US",options)

// add to do function

function addToDo(todo,id,done,trash){

    if(trash){
        return ;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `
                    <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}" ></i>
                    <p class ="text ${LINE}" > ${todo} </p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}">
                    </i>
                    </li>
                 `;
    const position = "beforeend"
    list.insertAdjacentHTML(position,item);

}

// add an item to the list user the enter key 

document.addEventListener("keydown",function(event){
    if(event.keyCode == 13){
        const toDo = input.value;
       // console.log(LIST)
        if(toDo){
            addToDo(toDo)
           LIST.push({
               name: toDo,
               id:id,
               done:false,
               trash:false
           })
           id++;
        }
        input.value = ""
    }
})

addToDo("coffe",0,false,true)


// complete to do 
function completeTODO(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false  : true;

}

// remove todo 

function removeToDO(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash  = true;
}

// target items created dynamically 

list.addEventListener("click",function(event){
        const element = event.target; 
        const elementJob = element.attributes.job.value;
        if(elementJob == "complete"){
            completeTODO(element);
        }else if(elementJob == "delete"){
            removeToDO(element)
        }
})