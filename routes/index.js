
var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
	var url_list_1={
		"和泰FB 測試環境":"https://nodered-servicebot-test.mybluemix.net/",
		"和泰FB 正式環境":"https://nodered-servicebot-prod02.mybluemix.net/"
	}

	var url_list_2={
		"和泰Line 測試環境": "https://nodered-api-test.mybluemix.net/",
		"和泰Line 測試環境紀錄": "https://nodered-surveillance-test.mybluemix.net/",
		"和泰Line 正式環境": "https://nodered-api-prod02.mybluemix.net/",
		"和泰Line 正式環境紀錄": "https://nodered-surveillance-prod02.mybluemix.net/"
	}
	var url_list_3={
		"和泰Line簡易後台":"http://lineprod02backstage.mybluemix.net/",
		"ServiceBot後台":"https://service-bot-backstage-nodejs.mybluemix.net/login"
	}
	var list = [
		"https://nodered-servicebot-test.mybluemix.net/",
		"https://nodered-servicebot-prod02.mybluemix.net/",
		"https://nodered-api-test.mybluemix.net/",
		"https://nodered-surveillance-test.mybluemix.net/",
		"https://nodered-api-prod02.mybluemix.net/",
		"https://nodered-surveillance-prod02.mybluemix.net/",
		"https://lineprod02backstage.mybluemix.net/",
		"https://service-bot-backstage-nodejs.mybluemix.net/login"
	]
	getListStatusCode(list,function(result){
		console.log(result);
		var dict_1 = {
			"和泰FB 測試環境":result[0],
			"和泰FB 正式環境":result[1]
		};
		var dict_2={
			"和泰Line 測試環境": result[2],
			"和泰Line 測試環境紀錄": result[3],
			"和泰Line 正式環境": result[4],
			"和泰Line 正式環境紀錄": result[5]
		}
		var dict_3={
			"和泰Line簡易後台":result[6],
			"ServiceBot後台":result[7]
		}
		var time_str = new Date(Date.now()+8*3600*1000).toISOString().replace("T"," ").split(".")[0]
		let output_str = 
		'<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF8"><title>狀態們</title><style></style></head><body><h3>資料時間戳:'+time_str+'</h3>'+
			produce_table(dict_1,url_list_1) + 
			produce_table(dict_2,url_list_2) + 
			produce_table(dict_3,url_list_3)+
		'</body></html>'
		console.log(output_str);
		res.send(output_str);
		
	});
});

module.exports = router;

function produce_table(dict,url_list){
	var table_str = "<table style='font-family: Microsoft JhengHei;border-collapse: collapse; margin:20px;border-spacing: 0;'>";
	var keys = Object.keys(dict);
	var header = "";
	var content = "";
	
	
	for(let i=0;i<keys.length;i++){
		header += "<th style='text-align:center;width:180px;border:1px solid #000;padding:2px 4px;background-color:#efefef;font-weight:800;'>"+keys[i]+"</th>";
		if(dict[keys[i]]==200){
			content += "<td style='text-align:center;border:1px solid #555;background-color:#fefefe;'><b><font color='green' style='font-weight:900;'>√  "+"<a target='_blank' href='"+url_list[keys[i]]+"'>連結</a>"+"</font></b></td>";
		}else{
			content += "<td style='text-align:center;border:1px solid #555;background-color:#fefefe;'><b><font color='red' style='font-weight:900;'>X  "+"<a target='_blank' href='"+url_list[keys[i]]+"'>連結</a>"+"</font></b></td>";
		}
	}
	
	header = "<tr>" + header + "</tr>";
	content = "<tr>" + content + "</tr>";
	return table_str + header + content + "</table>";
}

function getListStatusCode(url_list,callback){
	console.log(url_list);
	let status_list = [];
	getStatusCode(url_list[0],function(result_1){
		status_list.push(result_1);
		getStatusCode(url_list[1],function(result_2){
			status_list.push(result_2);
			getStatusCode(url_list[2],function(result_3){
				status_list.push(result_3);
				getStatusCode(url_list[3],function(result_4){
					status_list.push(result_4);
					getStatusCode(url_list[4],function(result_5){
						status_list.push(result_5);
						getStatusCode(url_list[5],function(result_6){
							status_list.push(result_6);
							getStatusCode(url_list[6],function(result_7){
								status_list.push(result_7);
								getStatusCode(url_list[7],function(result_8){
									status_list.push(result_8);
									callback(status_list);
								})
							})
						})
					})
				})
			})
		})
	})
	
}
	
function getStatusCode(url,callback){

	var request = require('request');
	request.get(url, function(e, r, d){
	  if(e){ console.log(e);callback(r.statusCode);}
	  console.log(r.statusCode);
	  callback(r.statusCode);
	});
	
}