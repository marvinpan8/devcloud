import {JetApp, JetView, EmptyRouter } from "webix-jet";
import dataview from "modules/applyview/applist";
import projectUI from "modules/applyview/createapp";

import addview from "addview";
import webixview from "webixview";
import applyview from "modules/applyview/index";



const samples = new webix.DataCollection({ data:[
	{ group:4, value:"Using App as Webix View", app: webixview,	id:"webixview" },
	{ group:4, value:"Dynamic views (addView)",	app: addview, id:"addview" },
	{ group:4, value:"Apply view",	app: applyview,	id:"applyview" }
]});


class SamplesNavigation extends JetView {
	config(){
		return {
			rows:[
				{ 
					header: "联友应用云平台",
					css: "ly-portal",
					width: 150,
					body: {
						rows:[
							{ 
								cols: [
									{ width: 20 },
									{ 
										view: "label",
										label: "应用列表",
										css: "applist"
									},
									{},
									{
										view:"search", 
										placeholder:"Search..", 
										width: 300
									},
									{width:30},
									{
										view: "button",
										value: "创建应用",
										width: 80,
										click: function(){
											webix.ui(projectUI).show();
										}
									},
									{width: 80}
								]
							},
							{   
								height: 5
							},
							{
								cols:[
									{ width:50, css: "touming"},
									dataview,
									{width:50}
								]
							},
							{}
						]
					}
				}
			]
		};
	}
	init(){

	}
}

const samplesApp = new JetApp({
	id:	"jetsamples",
	start:		"/top",
	router: 	EmptyRouter,
	views:{
		top:	SamplesNavigation
	}
});

webix.ready(() => {
	const id = document.location.pathname.split("/")[1];
	const item = samples.getItem(id);
	if (item){
		const app = typeof item.app === "function" ? item.app() : item.app;
		document.title = item.value;
		app.render();
	} else {
		samplesApp.render()
	}
});