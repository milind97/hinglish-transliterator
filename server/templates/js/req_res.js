function textChange() {
    var x = document.getElementById("myText").value;
    document.getElementById("demo").innerHTML = x;

    var i,word;
	//for (i = 0; i < x.length; i++) {
    	/*if (x[x.length-1] == " ")
    	{
    		console.log(x);
    		convert(x);
    	}*/
    	convert(x);
}
//base_url = "http://192.168.43.65:5000"
part_url = "/convert";

function convert(text)
{
	//document.getElementById("test").innerHTML = x;
	console.log("Text: " + text);
obj = {
"text": text,
"flag":1
};
console.log(obj);
$.ajax({
  url:part_url,
  type:"POST",
  data:JSON.stringify(obj),
  contentType:"application/json; charset=utf-8",
  dataType:"json",
  success: function(data){
    document.getElementById("test").innerHTML = data;
  },
  error: function(error) {
     console.log(error);
   }
});

}