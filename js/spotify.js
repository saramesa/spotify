var email;
var password;


$("#button").on("click", function(e){
	e.preventDefault();
	email =  $("#exampleInputEmail3").val();
	password = $("#exampleInputPassword3").val();	
	if(email === "") {
		alert("invalid email")
	}
	//var jsonP = {}
	// jsonP [email] = password
	window.localStorage.setItem(email, password);
	$("#exampleInputEmail3").val('');
	$("#exampleInputPassword3").val('');
	// window.open('file:///C:/Users/Alvaro/Documents/PROGRAMA_GENERATION_SEVILLA_2016/EJERCICIOS_SEMANA_10/SPOTIFY/mainPage.html','_self')
});
var response;
var logIn = function (data){
response = data.users
for (i=0;i<response.length;i++) {
	var name = response[i].name;
	var pass = response[i].password;
	if (email === name && password === pass){
		window.location.href = 'file:///C:/Users/saram_000/Desktop/GENERATION%20SPAIN/PROJECTS/Semana%209(3%20presencial)/Spotify/mainPage.html'
		window.localStorage.setItem ("currentUser", name);		
		var Obj = { "name" : name , "password": pass};
		window.localStorage.setItem (name, JSON.stringify(Obj));
	}
}
}

var error = function (){
	console.log ("ERROR")
}