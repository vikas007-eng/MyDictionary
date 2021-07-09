 

showWords(); // Once reload the screen the notes will be shown

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let addWord = document.getElementById("addWord");
  let words = localStorage.getItem("words");
  if (words == null) {
    wordsObj = [];
  } else {
    wordsObj = JSON.parse(words); // data becomes javaScript obj then only we can push the data
  }

  let myObj = {
    word:addWord.value,
    text:addTxt.value
  }
  wordsObj.push(myObj);
  
  localStorage.setItem("words", JSON.stringify(wordsObj)); //becauselocal storage store data in the string form 
  addTxt.value = ""; // otheriwse value will be stagnent there
  addWord.value=""; //title will be pressent there
//   console.log(notesObj);
  showWords();
});

// Function to show elements from localStorage
function showWords() {
  let words = localStorage.getItem("words");
  if (words == null) {
    wordsObj = [];
  } else {
    wordsObj = JSON.parse(words);
  }
  let html = "";
  wordsObj.forEach(function(element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.word}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"onclick="deleteWord(this.id)" class="btn btn-primary">Delete Word</button>
                    </div>
                </div>`;
  });
  let wordsElm = document.getElementById("words");
  if (wordsObj.length != 0) {
    wordsElm.innerHTML = html;
  } else {
    wordsElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteWord(index) {
//   console.log("I am deleting", index);

  let words = localStorage.getItem("words");
  if (words == null) {
    wordsObj = [];
  } else {
    wordsObj = JSON.parse(words);
  }

  wordsObj.splice(index, 1);//index se 1 ele dlt krega
  localStorage.setItem("words", JSON.stringify(wordsObj)); // update jruri h ,dlt show nai hoga
  showWords();
}

// for search 
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase(); //  taki agr koi big  letter m bhi search mare to bta chle
    // console.log('Input event fired!', inputVal);
    let wordCards = document.getElementsByClassName('wordCard');// notecard class wale sare ele dedo
    console.log(wordCards)
    
    Array.from(wordCards).forEach(function(element){
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
