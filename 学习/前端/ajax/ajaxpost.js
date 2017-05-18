/**
 * ajax post请求
 * @param url
 * @param data
 * @param callBack
 * @param async
 */
function ajaxPost(url,data,callBack,async){
	$.ajax({
		type:"post",
		dataType:"json",
		url:url,
		data:data,
		async:async ? async:true,
		success:function(data){
			callBack(data);
		},
		error:function(e){
			console.error(e);
		}
	})
}


$.serializeObject = function (form) {
    var o = {};
    $.each(form.serializeArray(), function (index) {
        if (o[this['name']]) {
            o[this['name']] = o[this['name']] + "," + this['value'];
        } else {
            o[this['name']] = this['value'];
        }
    });
    return o;
};



/**
 * 导航菜单切换
 */
function menuStateChanage(){
	$('#system-menu').on('click','a.menuitem',function(event){
		//加载页面内容
		loadPanelPage($(this).attr('data-href'));
	});

}

/**
 * 加载面板内容
 * @param url
 */
function loadPanelPage(url){
	$('#system-panel').attr('src',url);
}


function center($obj,top,left){
	$obj.css({
		position : 'absolute',
		'top' :top,
		left :-left
	}).show();
}



//预览html内容
function previewHtml(htmlContent){

	var content_window=window.open("about:blank","","fullscreen=1,location=no");
	content_window.moveTo(0,0);
	content_window.resizeTo(screen.width-200,screen.height-200);
	content_window.focus();

	content_window.document.open();
	content_window.document.write(htmlContent);
	content_window.document.close();
}
