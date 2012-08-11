var AlbumArt =
{
	init: function()
	{

		$('#search-artist').click(function(event){
			AlbumArt.artist();
		});

		$('#artist').keyup(function(event){
		 	if(event.keyCode == 13){
		 		AlbumArt.artist();
		 	}
		 });

		$('#display-album').click(function(event){
			AlbumArt.artwork();
		})
	},

	artist: function(button)
	{

		var artistName = $('#artist').val();


		$.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + artistName + "&autocorrect=1&api_key=5f35804e9c13dac1ecd42129d7a99ad8&format=json&callback=", function(data){

			console.log(data);
			
			var albumList = document.createElement('select');
			
			albumList.id = "album-list";

			for (var i = 0; i < data.topalbums.album.length; i++) {
				
				data.topalbums.album[i];
				
				var albums = $(albumList).append('<option value="' + data.topalbums.album[i].name + '">' + data.topalbums.album[i].name + '</option>');

			};

			var albumOptions = $("#albums").html(albums);

		});

		$('#display-album').css('display', 'block');
	},

	artwork: function()
	{
		var artistName = $('#artist').val();
		var albumName = $("#albums select").val();

		$.get("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=5f35804e9c13dac1ecd42129d7a99ad8&artist=" + artistName + "&album=" + albumName +"&format=json&callback=", function(data){

			console.log(data);

			var artwork = $("#album-art").html("<h2>" + data.album.name + " </h2><img src='" + data.album.image[3]['#text'] + "' /> ");

			var animate = function() {


				$("html,body").animate({scrollTop : 100}, 1500);
//				$(artwork).animate({'margin-top' : '-100px'}, 1000);	

			};

			setTimeout(animate, 1500);
			

		});
	}
}


jQuery(document).ready(function(){
	AlbumArt.init();
})