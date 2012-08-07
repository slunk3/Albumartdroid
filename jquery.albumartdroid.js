var AlbumArt =
{
	init: function()
	{

		$('#search').click(function(event){
			AlbumArt.artist();
		});

		$("#get-album").click(function(event){
			AlbumArt.artwork();
		});

	},

	artist: function()
	{

		var artistName = $('#artist').val();

		var getArtist = function() {

			$.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + artistName + "&api_key=5f35804e9c13dac1ecd42129d7a99ad8&format=json&callback=", function(data){

				console.log(data);
				
				var albumList = document.createElement('select');
				
				for (var i = 0; i < data.topalbums.album.length; i++) {
					
					data.topalbums.album[i];
					
					var albums = $(albumList).append('<option value="' + data.topalbums.album[i].name + '">' + data.topalbums.album[i].name + '</option>');

				};

				var albumOptions = $("#albums").html(albums);

			});

		};

		getArtist();

	},

	artwork: function(artistName)
	{
		var artistName = $('#artist').val();
		var albumName = $("#albums select").val();


		var getImage = function() {

			$.get("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=5f35804e9c13dac1ecd42129d7a99ad8&artist=" + artistName + "&album=" + albumName +"&format=json&callback=", function(data){

				console.log(data);

				$("#album-art").html("<h2>" + data.album.name + " by " + data.album.artist + "</h2><img src='" + data.album.image[2]['#text'] + "' /> ");

			});

		};

		getImage();
	}
}


jQuery(document).ready(function(){
	AlbumArt.init();
})