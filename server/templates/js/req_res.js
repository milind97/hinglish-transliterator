
arr = [];
prev_value = "";
currentFocus = -1;
function autocomplete(inp) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  // var currentFocus;
  /*execute a function when someone writes in the text field:*/
  // inp.addEventListener("input", function(e)     {
  //     var a, b, i, val = this.value;
  //     /*close any already open lists of autocompleted values*/
  //
  //     closeAllLists();
  //     if (!val) { return false;}
  //     currentFocus = -1;
  //     /*create a DIV element that will contain the items (values):*/
  //     a = document.createElement("DIV");
  //     a.setAttribute("id", this.id + "autocomplete-list");
  //     a.setAttribute("class", "autocomplete-items");
  //     /*append the DIV element as a child of the autocomplete container:*/
  //     this.parentNode.appendChild(a);
  //     /*for each item in the array...*/
  //     for (i = 0; i < arr.length; i++) {
  //
  //       /*check if the item starts with the same letters as the text field value:*/
  //      // if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
  //         /*create a DIV element for each matching element:*/
  //         b = document.createElement("DIV");
  //         /*make the matching letters bold:*/
  //         b.innerHTML = arr[i].substr(0, val.length);
  //         b.innerHTML += arr[i].substr(val.length);
  //         /*insert a input field that will hold the current array item's value:*/
  //         b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
  //                     //
  //                     // console.log("I am in loop !" + "inner html is: " +  b.innerHTML);
  //         /*execute a function when someone clicks on the item value (DIV element):*/
  //         b.addEventListener("click", function(e) {
  //             /*insert the value for the autocomplete text field:*/
  //             inp.value = this.getElementsByTagName("input")[0].value;
  //             /*close the list of autocompleted values,
  //             (or any other open lists of autocompleted values:*/
  //             closeAllLists();
  //         });
  //         a.appendChild(b);
  //       //}
  //     }
  // });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");

            // console.log("I am in the keydown listener bitch!" + "elmetns is: " + x);

    var prev_text_array;
    if (e.keyCode == 9 || e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      {
        e.preventDefault();
        currentFocus++;

      }

      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 32) {
      /*If the SPACEBAR is pressed, prevent the form from being submitted,*/
      //e.preventDefault();
      if (currentFocus === -1) {
        currentFocus = 0;
      }
        /*and simulate a click on the "active" item:*/
        // if (x) x[currentFocus].click();
        var ip = document.getElementById('myInput');
        console.log('current focus text: ' + ip.value.split(' '));
        prev_text_array = ip.value.split(' ').slice(0, -1);
        prev_text = '';
        for (index in ip.value.split(' ').slice(0, -1)) {
          console.log('word in array: ' + prev_text_array[index]);
          prev_text += prev_text_array[index] + ' ';
        }
        console.log('prev_text: ' + prev_text);
        ip.value = prev_text + x[currentFocus].innerText;
        flag = array[currentFocus][1];
        console.log('flag: ' + flag);

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

/*An array containing all the country names in the world:*/
<!--countries = ["Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];-->

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/

autocomplete(document.getElementById("myInput"), arr);

  function textChange() {
    var x = document.getElementById("myInput").value;
    document.getElementById("demo").innerHTML = x;

    var i,word;
	//for (i = 0; i < x.length; i++) {
    	/*if (x[x.length-1] == " ")
    	{
    		console.log(x);
    		convert(x);
    	}*/
    	if (x !== ""){
    	  words = x.split(" ");
    	convert(words[words.length-1]);
      }

}
//base_url = "http://192.168.43.65:5000"
var array = [];
part_url = "/convert";
all_words = [];
var flag = 0;
function convert(text)
{
	//document.getElementById("test").innerHTML = x;
	console.log("Text: " + text);
	prev_value = text;
	console.log('flag just before convert: ' + flag);
obj = {
"text": text,
"flag":flag
};
console.log(obj);

$.ajax({
  url:part_url,
  type:"POST",
  data:JSON.stringify(obj),
  contentType:"application/json; charset=utf-8",
  dataType:"json",
  success: function(json_data){
    array = json_data['lists']
    console.log(array)
    all_words = [];
    for(i = 0; i < array.length; i++){
      all_words.push(array[i][0]);
    }
    console.log(all_words);
    <!--autocomplete(document.getElementById("myInput"), all_words);-->
    // arr = all_words;
    document.getElementById("test").innerHTML = all_words;
        console.log("before: ................");
    suggest_list(document.getElementById("myInput"),all_words);
            console.log("after: ................");

  },
  error: function(error) {
     console.log(error);
   }
});

}
function closeAllLists(elmnt,ipTag) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != ipTag) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
<!--countries = all_words;-->
function suggest_list (ipTag,arr) {
      var a, b, i, val = ipTag.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists(ipTag);
      if (!val) { return false;}
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
                      //
                      // console.log("I am in loop !" + "inner html is: " +  b.innerHTML);
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              ipTag.value = ipTag.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        //}
      }
}
