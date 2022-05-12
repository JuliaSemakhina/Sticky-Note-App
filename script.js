const notesContainer = document.querySelector("#app");
const addNoteButton = notesContainer.querySelector(".add-note");
const openModal = document.querySelector(".note");

getNotes().forEach(note => {
	const noteElement = createNoteElement(note.id, note.content);
	notesContainer.insertBefore(noteElement, addNoteButton);
})

addNoteButton.addEventListener('click', ()=> addNote());

function getNotes(){
	return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]")
}

function saveNotes(notes){
	localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content){
	const element = document.createElement("textarea");

	element.classList.add('note');
	element.value = content;
	element.placeholder = "Empty Sticky Note";

	element.addEventListener('change', ()=>{
		updateNote(id, element.value);
	});

	element.addEventListener('dblclick', ()=>{
		const doDelete = confirm("Are you seure to delete this sticky note?");

		if(doDelete){
			deleteNote(id, element);
		}
	})

	return element;
}

function addNote(){
	const existingNotes = getNotes();
	const notesObject = {
		id: Math.floor(Math.random()*9000),
		content: ""
	};

	const noteElement = createNoteElement(notesObject.id, notesObject.content);
	notesContainer.insertBefore(noteElement, addNoteButton);

	existingNotes.push(notesObject);
	saveNotes(existingNotes);

}

function updateNote(id, newContent){
	const notes = getNotes();
	const targetNote = notes.filter(note => note.id == id)[0];
	targetNote.content = newContent;
	saveNotes(notes);
}

function deleteNote(id, element){
	const notes = getNotes().filter(note => note.id !=id);
	saveNotes(notes);
	notesContainer.removeChild(element);
}