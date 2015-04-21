"use strict";

function Api(conf,data) {

	data || ( data = "undefined" );
	
	this.apiHost = conf.host;
	this.token = conf.token;
	this.newRoomID = "";
	this.newUserId = "";
	this.owner_user_id = "1953666";
	this.conf = conf;
	this.redirectionUrl = 'https://www.hipchat.com/sign_in?d=%2Fchat';
	this.person = data;

	var that = this;

	$.ajaxSetup({
	    headers: {
	        'Content-Type': 'application/json',
	        'Authorization': 'Bearer ' + this.token
	    },
	    crossDomain: true
	});

	this.layer = amplify.request;

	this.layer.define("viewUser", "ajax", {
		url: this.apiHost + '/v2/user/{email}',
		type: "GET",
		async: false
	});

	this.layer.define("createWelcomeMessage", "ajax" , {
		url: this.apiHost + '/v2/room/{roomId}/notification',
		type: "POST",
	});

	this.layer.define("createUser", "ajax" , {
		url: this.apiHost + '/v2/user',
		type: "POST"
	});

	this.layer.define("createRoom", "ajax" , {
		url: this.apiHost + '/v2/room',																																														
		type: "POST"
	});

	this.layer.define("addMember", "ajax" , {
		url: this.apiHost + '/v2/room/{roomId}/member/{userId}',
		type: "PUT",
		contentType: "application/json; charset=utf-8"
	});

	this.layer.define("getUser", "ajax" , {
		url: this.apiHost + '/v2/user',
		type: "GET"
	});

	this.layer.decoders.statusResponse = function( data, status, xhr, success, error ) {
		if(status === "success") {
			success(data);
		} else if (status === "error") {
			error(true);
		}
	};

	this.viewUser =  function(email) {
		var promise;

		promise = that.layer("viewUser", {email:email});

	    return promise;	
	};

	this.getUser = function() {
		var promise;

		promise = that.layer("getUser");

		return promise;
	};

	this.createWelcomeMessage = function() {
		var promise,
			data;

		data = {
			"color" : that.conf.color,
			"message" : that.conf.messages.welcomeMessageRoom,
			"notify" : that.conf.notify,
			"message_format" : that.conf.message_format	
		}

		promise =  $.ajax({
            method: 'POST',
            url: that.apiHost + '/v2/room/{roomId}/notification',
            data: JSON.stringify(data),
            tokens: {roomId: that.newRoomID}
        });

		//promise = that.layer("createWelcomeMessage", JSON.stringify(data)); 

		return promise;
	};

	this.createUser = function() {
		var promise,
			data;

		if(typeof that.person !== "undefined") {

			data = {
				"name" :that.person.name + ' ' + that.person.surname,
				"title" : that.person.surname[0].toLowerCase() + that.person.name,
				"password" : that.person.password,
				"email" : that.person.email 
			};

			promise =  that.layer("createUser", JSON.stringify(data));

			promise.done(function(data) {
				that.newUserId = data.id;
			});

			return promise;
		}	
	};

	this.createRoom = function() {
		var promise,
			data;

		if(typeof that.person !== "undefined") {

			data = {
				"name": that.person.surname + ' ' + that.person.name[0].toUpperCase() + ' (Candidato)',
				"owner_user_id": that.owner_user_id,
				"privacy": "private"
			}

			promise =  that.layer("createRoom",JSON.stringify(data));

			promise.done(function(data) {
	            that.newRoomID =  data.id.toString();
	    	});

	    	return promise;
		}
	};

	this.addMembers = function() {
		var promises,
			_addMemberIntoRoom;

		_addMemberIntoRoom = function(member, room) {
			that.layer("addMember", {
				roomId : room,
				userId : member.id
			});
		}

		//add new candidate id
        that.conf.companyUsers2Chat.push({id: that.newUserId});

        promises = [];

        that.conf.companyUsers2Chat.forEach(function(elem,index) {
        	promises.push(_addMemberIntoRoom(elem, that.newRoomID))
        });

        promises = $.when(promises);

        return promises;
	};

	this.redirectToHipchat = function () {
       window.location.href = that.redirectionUrl;
    };