console.log('LocalStorageChalange');
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}
//Show Book Form LocalStorage Function
showbookui()//End


//Add Display Proparties
function Display() {

}


//detact dublicate book name
function Dublicateobj() {

}


//form ko validate karne ke liye is ko banaya he
function Valobj(one, two, three) {
    this.one = one;
    this.two = two;
    this.three = three
}


//form ko reset karne ka function
Display.prototype.reset = function () {
    let clear = document.getElementById('librarysubmit')
    clear.reset()
}//end reset function


//Form ko validate karne ka function
Display.prototype.validate = function (Valobj1) {

    console.log(Valobj1.one)
    if (Valobj1.one.length < 5 || Valobj1.two.length < 5 || Valobj1.three == undefined) {
        return false
    }
    else {
        return true
    }
    console.log(Valobj1.one)
}//end validate function




//Show Notification  Function When Click Submit Button
Display.prototype.massage = function (alerttype, error, alertmaggage) {
    let msg = document.getElementById('msg')
    msgStr = `<div class="alert alert-${alerttype}" role="alert">
                <h4 class="alert-heading">${error}</h4>
                <p>${alertmaggage}</p>

            </div>`
    msg.innerHTML = msgStr



    // 10 econd ke bad ye Massage Dikhna band ho jayega
    setTimeout(() => {
        msg.innerHTML = ""
    }, 10000);
} //End



//Add EVent lisner
let submit = document.getElementById('librarysubmit');
submit.addEventListener('submit', formsubmit) //Enn event lisner

//event lisner function
function formsubmit(e) {
    e.preventDefault();
    console.log('submit');

    //get value form dom
    let name = document.getElementById('booksname').value;
    let author = document.getElementById('authorname').value;
    let type;
    let fiction = document.getElementById('fiction');
    let cooking = document.getElementById('Cooking');
    let computer = document.getElementById('coumputer');
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (cooking.checked) {
        type = cooking.value
    }
    else if (computer.checked) {
        type = computer.value;
    }//Dom value End


    //Creatte A book objact 
    let Book1 = new Book(name, author, type);

    //get Book form Local storage
    let localbook = localStorage.getItem('books');



    let bookarray;
    if (localbook == null) {
        bookarray = []
    }
    else {
        bookarray = JSON.parse(localbook);
    }
    bookarray.push(Book1)// Push New book Objact on bookarray



    //create a display objact
    let displayFunction = new Display()// end display object

    //Select Element Form Dom For Validate The Form
    let one = document.getElementById('booksname').value;;
    let two = document.getElementById('authorname').value;
    let three;
    let type1 = document.getElementById('fiction');
    let type2 = document.getElementById('Cooking');
    let type3 = document.getElementById('coumputer');
    if (type1.checked) {
        three = type1.value
    }
    else if (type2.checked) {
        three = type2.value
    }
    else if (type3.checked) {
        three = type3.value
    }//select element end

    //create the object for validate the form
    let Valobj1 = new Valobj(one, two, three)//end 

    //check dublicate books
    // let dublicate1 = new Dublicateobj();
    // dublicate1.checkeDublicate()
    //end dublicate book



    // agar validate(Valobj1) function true return karta he to ye print kar do
    if (displayFunction.validate(Valobj1)) {
        localStorage.setItem('books', JSON.stringify(bookarray))
        displayFunction.reset()

        showbookui()
        displayFunction.massage('success', 'Well Done!', ' Your Book Has Been success fully Add')
    }

    // agar validate(Valobj1)  functiion true return nahi karta he to ye print kar do
    else {
        displayFunction.massage('warning', 'Error', ' You Can Not Add This Book')

    }// end if else condition

}//submit event lisner end


function showbookui() {
    //get name ,author and type from local storage
    let localbook = localStorage.getItem('books');
    let bookarray;
    if (localbook == null) {
        bookarray = []
    }
    else {
        bookarray = JSON.parse(localbook);
    }


    //show element on dom
    let uistring = '';
    bookarray.forEach(function (element, index) {
        uistring = uistring + `
        <tr>
        <td>${index + 1}</td>
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.type}</td>
        <td><button class="delbtn" id="${index}"  onclick="deletebooks(this.id)" >Delete</button></td>
        </tr>`
    });
    let booktable = document.getElementById('tablebody');
    booktable.innerHTML = uistring
    //show element in dom end
}



//delete books function
function deletebooks(index) {
    let localbook = localStorage.getItem('books');
    let bookarray
    if (localbook == null) {
        bookarray = []
    }
    else {
        bookarray = JSON.parse(localbook);
    }
    bookarray.splice(index, 1)
    localStorage.setItem('books', JSON.stringify(bookarray))
    console.log(index)
    showbookui()
}//End Delete books function

//check Dublicate Book NAme
function dub(name) {
    this.name = name;
}

let Dubbtn = document.getElementById('dublicate');
Dubbtn.addEventListener('click', function () {
    console.log('dub')
    let dublicatebooks = localStorage.getItem('dublicatebooks');
    let dubarray = JSON.parse(dublicatebooks)
    // let dubarray=dublicatebooks

    let input = document.getElementById('booksname').value;
    let newdub = new dub(input)
    localStorage.setItem('dublicatebooks', JSON.stringify(newdub))
    console.log(dubarray.name)
    // if (dubarray.name==input) {
    //     console.log('this book is avelable')
    // }
    // else{
    //     console.log('this book is not avelable')
    // }
})

