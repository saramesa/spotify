$("#mainButton").on("click",function(){
	var input = $("#input").val();
	var spoty_url = "https://api.spotify.com/v1/search?type=artist&query=SEARCHTERM";   
 	var url = spoty_url.replace("SEARCHTERM", input);//Adds the query
 	request(url, search);
 	$('#input').val('');
});

function request(url, success){
	$.ajax({
	url: url,
	crossDomain: true,
	type: "GET",
	dataType: "json",
	success: success,
	error: error 
})}

var search = function (data){
 	var artist = data;
 	var id = artist.artists.items[0].id;
 	var url = "https://api.spotify.com/v1/artists/" + id +"/top-tracks?country=ES";
 	request (url, topTracks); 
}

var nameArtist = [];
var uriArtist = [];
var f = 0;
var response;
var songs = []

prior_login();

var topTracks = function (response2){
	response=response2

	var html = '<div class="top"><strong>TOP TRACKS</strong></div>';
	for(i=0;i<10;i++){
	html += '<iframe class="iframe" src="https://embed.spotify.com/?uri=' + response.tracks[i].uri + 
	'" width="300" height="380" frameborder="0" allowtransparency="true"></iframe><div><button id = "'+ f++ +
	'" type="button" class= "btn btn-success buttonBox">Save!</button></div>' 
	nameArtist.push(response.tracks[i].name); //ASÍ SE ACCEDE AL NAME DE LA CANCIÓN 
	uriArtist.push(response.tracks[i].uri);
	}
	
	$("#album").append(html);
	
//FUNCTION ONCLICK DEL BOTÓN SAVE
	$('.btn-success').click (function(){
	var pair = [nameArtist[this.id], uriArtist[this.id]];
	songs.push(pair);
	var currentUser = window.localStorage.getItem("currentUser");
	var obj = JSON.parse(window.localStorage.getItem(currentUser));
	obj["canciones"] = songs;
	window.localStorage.setItem(currentUser, JSON.stringify(obj));
	appendPlaylist();
	})	
}

var error = function (){
	console.log ("ERROR")
}

function appendPlaylist() {
	var currentUser = window.localStorage.getItem("currentUser");
	var obj = JSON.parse(window.localStorage.getItem(currentUser));
	$('#playlist').empty();
	var html='<div class="top"><strong>PLAYLIST</strong></div>'
	for(var j = 0 ; j<obj.canciones.length;j++){
		html += '<iframe src="https://embed.spotify.com/?uri=' + obj.canciones[j][1] + 
		'" width="300" height="80" frameborder="0" allowtransparency="true"></iframe>'
	}
	$("#playlist").append(html)
}

function prior_login(){
	//SACA LA PLAYLIST QUE YA ESTÁ GUARDADA
	var currentUser = window.localStorage.getItem("currentUser");
	//INICIA EL ARRAY DE CANCIONES Y URIS CON LA LISTA YA GUARDADA
	var obj = JSON.parse(window.localStorage.getItem(currentUser));
	if (obj.canciones){
		appendPlaylist();
		var prior_songs = obj["canciones"];
		var prior_pairs;
		for(var z = 0 ; z<prior_songs.length;z++){
			prior_pairs= [prior_songs[z][0], prior_songs[z][1]];
			songs.push(prior_pairs)
		}	
	}

}
