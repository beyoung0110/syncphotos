// group images by day
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

// timestamp to YYYY-MM-DD
function timeStampTransfer(timeStamp){
	if(undefined == timeStamp) return;
	var time = new Date(timeStamp);
	return time.toISOString().substring(0,10);
}

// show photos
function showPhotos(data, lazyLoad){
	for (var key in data)
	{
		if($("#" + key).length <= 0 ){
			$(".inner").append("<div id = '" + key + "' class='clearfix'></div>");
			$("#" + key).append("<div class='title'><span class='mingrayletter'>" + key + "</span></div>");
			$("#" + key).append("<div class='picbox'></div>");
		}		
		$.each(data[key], function(i, item){
			if(lazyLoad){
				$("#" + key + " .picbox").append("<div class='box'><div class='pic'><img class='lazy' src='images/loading.gif' data-original='" + item.imageURL + "'></div></div>");
			}else{
				$("#" + key + " .picbox").append("<div class='box'><div class='pic'><img src='" + item.imageURL + "'></div></div>");
			}			
		})
	}
	$("img.lazy").lazyload();
}

function showInfo(data){
	$("#info span").html(data);
}

// load photos
function loadPhotos(url){
	if(undefined == url){
		url = 'data/1';
		var firstPage = true;
	}

	$.ajax({
		type : 'get',
		url : url,
		success : function(data) {
			if(data.length <= 0){
				showInfo("没有更多图片了");
			}else{
				var photos = JSON.parse(data).photos;
				nextURL = JSON.parse(data).nextURL;
				var picGroup = group(photos);
				if(firstPage){
					showPhotos(picGroup, false);
				}else{
					showPhotos(picGroup, true);
				}				
			}			
		}
	});
}