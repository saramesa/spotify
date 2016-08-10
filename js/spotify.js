var email;
var password;


$("#button").on("click", function(e){
	e.preventDefault();
	email =  $("#exampleInputEmail3").val();
	password = $("#exampleInputPassword3").val();	
	if(email === "") {
		alert("invalid email")
	}
	$("#exampleInputEmail3").val('');
	$("#exampleInputPassword3").val('');
	$.ajax({
		url: "js/spotify.jsonp", 
		jsonpCallback: "dataUsers",
		crossDomain: true,
		type: "GET",
		dataType: "jsonp",
		success: logIn,
		error: error 
	})
});

var response;
var logIn = function (data){
response = data.users
for (i=0; i<response.length; i++) {
	var name = response[i].name;
	var pass = response[i].password;
	if (email === name && password === pass){
		var redir = window.location.href;
		window.location.href = redir.replace("spotifyLogin","mainPage");
		window.localStorage.setItem ("currentUser", name);	
		var Obj = {};	
		if (window.localStorage.getItem(name)){
			Obj = JSON.parse(window.localStorage.getItem(name));
		}else {
			Obj["name"] = name;
			Obj["password"] = pass;
		}
		window.localStorage.setItem (name, JSON.stringify(Obj));
	}
}
}

var error = function (){
	console.log ("ERROR")
}