 

showNotes(); // Once reload the screen the notes will be shown

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes); // data becomes javaScript obj then only we can push the data
  }

  let myObj = {
    title:addTitle.value,
    text:addTxt.value
  }
  notesObj.push(myObj);
  
  localStorage.setItem("notes", JSON.stringify(notesObj)); //becauselocal storage store data in the string form 
  addTxt.value = ""; // otheriwse value will be stagnent there
  addTitle.value=""; //title will be pressent there
//   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);//index se 1 ele dlt krega
  localStorage.setItem("notes", JSON.stringify(notesObj)); // update jruri h ,dlt show nai hoga
  showNotes();
}

// for search 
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase(); //  taki agr koi big  letter m bhi search mare to bta chle
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');// notecard class wale sare ele dedo
    console.log(noteCards)
    
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;//ele k andr jitne data h tag p m (0 se start krk),usko cardtxt m dal do , nmbr bdhte jayga (since for each) 
       
        if(cardTxt.includes(inputVal)){// agr value include h t usko block show krdo
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
     
        // console.log(cardTxt);
    })
})

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/ 