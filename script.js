document.addEventListener("DOMContentLoaded", function (node, child){
    // create element


    const list = document.querySelector("#movie-list ul")
    const forms = document.forms
    const myInput = document.createElement('input')


    //delete movies
    list.addEventListener("click",function(e){


        if(e.target.className == 'delete'){
            const li = e.target.parentElement;
            li.parentNode.removeChild(li)
        }


    })


    list.addEventListener("click", function(e){
        if(e.target.className == 'edit'){
            const li = e.target.parentElement;
            const myText = li.firstElementChild.textContent;
            myInput.type = "text";
            myInput.value = myText;


            li.insertBefore(myInput, li.firstElementChild);
            li.removeChild(li.firstElementChild.nextSibling);


            const editButton = e.target;
            const deleteButton = li.querySelector('.delete');
            editButton.disabled = true;
            if(deleteButton){
                deleteButton.disabled = true;
            }


            myInput.addEventListener('keypress', enterKeyPress);
        }
    });


    const editWork = function(){
        const inputElement = myInput; // Use the myInput in the current scope
        const editLi = inputElement.parentElement;
        const myEditBtn = editLi.querySelector('.edit');
        const myDeleteBtn = editLi.querySelector('.delete');


        const myTextEdit = inputElement.value.trim();
        if(myTextEdit){
            const newSpan = document.createElement('span');
            newSpan.classList.add('name');
            newSpan.textContent = myTextEdit;
            editLi.insertBefore(newSpan, inputElement);
            editLi.removeChild(inputElement);
            myEditBtn.disabled = false;

            if(myDeleteBtn){
                myDeleteBtn.disabled = false;
            }
            inputElement.removeEventListener('keypress', enterKeyPress);
        } else {
            alert('Please enter movie name to continue');
        }
    };


    const enterKeyPress = function(event){
        if(event.key === 'Enter'){
            editWork();
        }
    };


    //add movie
    const addMovieForm = forms['add-movie']
    addMovieForm.addEventListener('submit',function(e){
        e.preventDefault();


        const userInput  = addMovieForm.querySelector('input[type="text"]').value;


        if(!userInput){
            alert('Please enter a movie name!')
            return;
        }


        // create element for each new movie
        const newLi = document.createElement('li');
        const movieName = document.createElement('span');
        const deleteBtn = document.createElement('span');
        const editBtn = document.createElement('span');


        //adding content
        movieName.textContent = userInput;
        deleteBtn.textContent = 'Delete';
        editBtn.textContent = 'Edit';


        //adding classes
        movieName.classList.add('name');
        deleteBtn.classList.add('delete');
        editBtn.classList.add('edit');


        //append to DOM
        newLi.appendChild(movieName);
        newLi.appendChild(deleteBtn);
        newLi.appendChild(editBtn);
        list.appendChild(newLi);


        //reset form
        addMovieForm.reset()


    })



})