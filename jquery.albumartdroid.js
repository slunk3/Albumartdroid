jQuery(document).ready(function(){

	//This is to remove the validation image if no poster is present
	$('#artist').focus(function(){
		var full = $("#album-art").has("img").length ? true : false;
		if(full == false){
			$("#album-art").empty();
		}
	});

	//function definition
	var getAlbum = function(){

		//Grab the album title and store it in a variable 
		var artistName = $("#artist").val();
		var albumTitle = $("#album").val();

		//check if the user has entered anything
		if(artistName == ' '){
			//if the input field is empty display a message
			$('#album-art').html('<h2 class="msg">You forgot to enter the album title. Did you mean The White Album?</h2>');		
		} else {
			$.get("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&format=json&api_key=5f35804e9c13dac1ecd42129d7a99ad8&album=" + albumTitle + "&artist=" + artistName + "&callback=&", function(data){

				console.log(data);
				//alert();
				$("#album-art").html("<h2>" + data.album.name + " by " + data.album.artist + "</h2><img src='" + data.album.image[2]['#text'] + "' /> ");

			});

		}

		return false;

	}

	$("#search").click(getAlbum);

	$("#album").keyup(function(event){
		if(event.keyCode == 13){
			getAlbum();
		}
	});

});