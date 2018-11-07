currentFocus = -1;

function autocomplete(inp) {
  /*execute a function which handles word-suggestions after each request */

  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");

    var prev_text_array;
    if (e.keyCode == 9 || e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      e.preventDefault();
      currentFocus++;

      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 32 || e.keyCode == 13) {
      /*If the SPACEBAR or ENTER KEY is pressed, prevent the form from being submitted,*/
      //              e.preventDefault();
      if (currentFocus === -1) {
        currentFocus = 0;
      }
      /*and simulate a click on the "active" item:*/
      //                 if (x) x[currentFocus].click();
      var input_element = document.getElementById('inputTextElement');

      prev_text_array = input_element.value.split(' ').slice(0, -1);
      prev_text = '';
      for (index in input_element.value.split(' ').slice(0, -1)) {
        prev_text += prev_text_array[index] + ' ';
      }
      input_element.value = prev_text + x[currentFocus].innerText;
      flag = array[currentFocus][1];
      closeAllLists(x);
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}


function textChange() {
  /*a function to handle change in input text box: */
  var input_text = document.getElementById("inputTextElement").value;

  if (input_text !== "") {
    words = input_text.split(" ");
    convert(words[words.length - 1]);
  }
}

autocomplete(document.getElementById("inputTextElement"));

//base_url = "http://127.0.0.1:5000"
var array = [];
part_url = "/convert";
all_words = [];
var flag = 0;
function convert(text) {
  /*a function to send input text to server in form of ajax request and recieve transliterated text: */

  //	console.log("Text: " + text);

  /*JSON object to containing input text and a flag be sent to the server: */
  obj = {
    "text": text,
    "flag": flag
  };

  $.ajax({
    /*to send AJAX request to the server: */
    url: part_url,
    type: "POST",
    data: JSON.stringify(obj),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (json_data) {
      array = json_data['lists']
      all_words = [];
      for (i = 0; i < array.length; i++) {
        all_words.push(array[i][0]);
      }
      suggest_list(document.getElementById("inputTextElement"), all_words);
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function closeAllLists(elmnt, ipTag) {
  /*close all autocomplete lists in the document,
  except the one passed as an argument:*/
  var x = document.getElementsByClassName("autocomplete-items");
  for (var i = 0; i < x.length; i++) {
    if (elmnt != x[i] && elmnt != ipTag) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}

function suggest_list(ipTag, arr) {
  var a, b, i, val = ipTag.value;
  /*close any already open lists of autocompleted values*/
  closeAllLists(ipTag);
  if (!val) {
    return false;
  }
  currentFocus = -1;
  /*create a DIV element that will contain the items (values):*/
  a = document.createElement("DIV");
  a.setAttribute("id", ipTag.id + "autocomplete-list");
  a.setAttribute("class", "autocomplete-items");
  /*append the DIV element as a child of the autocomplete container:*/
  ipTag.parentNode.appendChild(a);
  /*for each item in the array...*/
  for (i = 0; i < arr.length; i++) {

    /*check if the item starts with the same letters as the text field value:*/
    // if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
    /*create a DIV element for each matching element:*/
    b = document.createElement("DIV");
    /*make the matching letters bold:*/
    b.innerHTML = arr[i].substr(0, val.length);
    b.innerHTML += arr[i].substr(val.length);
    /*insert a input field that will hold the current array item's value:*/
    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

    // console.log("I am in loop !" + "inner html is: " +  b.innerHTML);
    /*execute a function when someone clicks on the item value (DIV element):*/
    b.addEventListener("click", function (e) {
      /*insert the value for the autocomplete text field:*/
      ipTag.value = ipTag.getElementsByTagName("input")[0].value;
      /*close the list of autocompleted values,
      (or any other open lists of autocompleted values:*/
      closeAllLists();
    });
    a.appendChild(b);
  }
}
