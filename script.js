var addBtn = document.getElementById('add')
    
    const notes= JSON.parse(localStorage.getItem('notes'))

    if(notes){
        notes.forEach(note => {
            addNewNotes(note)
        });
    }

    addBtn.addEventListener('click', () => {
        addNewNotes();
    })

    function addNewNotes(text=''){
        const noteBook = document.createElement('div')
        noteBook.className = 'note'
        noteBook.innerHTML = `
        
        <div class = 'tools'>
        
            <button class = 'edit'> <i class = 'fas fa-edit'></i> </button>
            <button class = 'delete'> <i class = 'fas fa-trash-alt'></i> </button>

        </div>

        <div class = 'main ${text ? "" : "hidden"}'></div>
        <textarea class = ${text ? "hidden" : ""}></textarea>
        
        `
        var editBtn = noteBook.querySelector('.edit');
        var deleteBtn = noteBook.querySelector('.delete');

        const main = noteBook.querySelector('.main');
        const textarea = noteBook.querySelector('textarea');

        textarea.value = text
        main.innerHTML = text

        editBtn.onclick = () =>{
            main.classList.toggle('hidden')
            textarea.classList.toggle('hidden')
        }

        deleteBtn.onclick = () => {
            noteBook.remove()
            updateList()
        }

        textarea.oninput = (e) => {

            //to get value of TextArea

            //1st Method

            //const value = e.target.value
            
            //2nd Method

            //{value} "This is destructuring mostly used in react.js"

            const {value} = e.target
            main.innerHTML = value
            updateList()
        }

        document.body.appendChild(noteBook);
    }

    function updateList(){
        const notesText = document.querySelectorAll('textarea')

        const notes = []

        notesText.forEach((note) => {
            notes.push(note.value)
        })

        localStorage.setItem('notes', JSON.stringify(notes))
    }
