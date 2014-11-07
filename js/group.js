//group images by day
function group(photo) {
	var result = {}; 
	$.each(photo, function(i, item){
		var time = timeStampTransfer(item.time);
		if(result[time] == undefined){
			result[time] = [];
		}
		result[time].push(item);
	})
	return result;
};

//timestamp to YYYY-MM-DD
function timeStampTransfer(timeStamp){
	if(timeStamp == undefined) return;
	var time = new Date(timeStamp);
	return time.toISOString().substring(0,10);
}

//show photos
function showPhotos(data){
	for (var key in data)
	{
		if($("#"+key).length <= 0 ){
			$("#inner").append("<div id = '"+key+"' class='clearfix'></div>");
			$("#"+key).append("<div class='title'>"+key+"</div>");
			$("#"+key).append("<div class='picbox'></div>");
		}		
		$.each(data[key], function(i, item){
			$("#"+key+" .picbox").append("<div class='box'><div class='pic'><img src='"+item.imageURL+"'></div></div>");
		})
	}
}

//load photos
function loadPhotos(url){
	if(url == undefined){
		url = 'data/1';
	}

	$.ajax({
		type : 'get',
		url : url,
		success : function(data) {
			var photos = JSON.parse(data).photos;
			nextURL = JSON.parse(data).nextURL;
			var picGroup = group(photos);
			showPhotos(picGroup);
		}
	});
}