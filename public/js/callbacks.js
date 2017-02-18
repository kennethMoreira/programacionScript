var userIsLogged = false;
var mobileMaxWith = 480;
var desktopMinWith = 960;

function login(user, pass, autolog){
	var found = false;
    
    var url = '/auth';
	var datos = {
		data: {
            'user':user,
            'pass':pass
        },
		type: 'POST',
		datatype: 'json'
	};
    
	$.ajax(url, datos)
	.done(function(data, status, xhr){
		//Mostrar la respuesta utilizando DOM y CSS
		data = JSON.parse(data);

		if (data.found){
            found = true;
//            if (autolog === false){
//                if($('#checkLogin').prop('checked')) {
//                    localStorage.setItem('loggedUser', JSON.stringify(data.loggedUser));
//                }
//                sessionStorage.setItem('loggedUser', JSON.stringify(data.loggedUser));
//                alert("Bienvenido " + data.loggedUser.name);
//            }

//            userIsLogged = true;
            
//            if (userIsLogged === true){
                
            alert("Bienvenido " + data.loggedUser.name);
            
            window.location.assign('/' + data.loggedUser.userType + '?key=koko69');
//            }
            
//            toogleUserInfo();
//            menuMaxHeight();

//            $('.loggedUserPicture').attr('src', '/' + data.loggedUser.photo);
//            $('.loggedUserName').text(data.loggedUser.name);
//            $('input').val('');
//            $('#loginFormContainer').hide();
//            $('.loggedUserType').text(data.loggedUser.userType);
            
        }else {
            found = false;
            alert("Usuario no encontrado");
            $('#userBox, #passBox').val('');
            $('#userBox').focus();
        }
	})
	.fail(function(xhr, status, error){
		alert('ERROR DE CONEXIÓN');
	});
}

function toogleUserInfo(){
//    if (userIsLogged){
        if ($(window).width() > mobileMaxWith){
            $('#loggedUser').show();
            $('#loggedUser-menu').hide();
            $('#menuLogoutBtn').hide();
        }else{
            $('#loggedUser').hide();
            $('#loggedUser-menu').show();
            $('#menuLogoutBtn').show();
        }
//    }
}

function menuMaxHeight(){
    var mmh = $(window).height() - $('header').outerHeight();
    $('#menuContainer').css('max-height', mmh + "px");
}


function setLoggedUserData(loggedUser){
    $('.loggedUserPicture').attr('src', '/' + loggedUser.photo);
    $('.loggedUserName').text(loggedUser.name);
    $('.loggedUserType').text(loggedUser.userType);
}


$(document).ready(function(){
    
    toogleUserInfo();
    
    var loggedUser = {
        "id": '',
        "user": "",
        "pass": "",
        "name": "",
        "lastName": "",
        "userType": "",
        "photo": ""
    };
    
    if (sessionStorage.getItem("loggedUser")) {
        loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"))
    }else if (localStorage.getItem("loggedUser")) {
        loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    }
    
    setLoggedUserData(loggedUser);
    
//    console.log(userIsLogged);
    
//    if (userIsLogged === false){
//        if (localStorage.getItem("loggedUser") || sessionStorage.getItem("loggedUser")) {
//            var user = JSON.parse(sessionStorage.getItem("loggedUser")).user;
//            var pass = JSON.parse(sessionStorage.getItem("loggedUser")).pass;
//            login(user, pass, true);
//        }
//    }
    
    
    
    
	$('#loginButton').on('click', function(){
        login($('#userBox').val(), $('#passBox').val(), false);
    });
    
    $('#passBox').on('keydown',function (event){
        if (event.key === 'Enter'){
            login($('#userBox').val(), $('#passBox').val(), false);
        }
    });
    
    
    $('#nav-toggle').on('click',function (){
        if ($('#menuContainer').css('visibility') === 'hidden'){
            $('#menuContainer').css('visibility', 'visible');
            if ($(window).width() >= desktopMinWith){
                $('#content').css('padding-left', '200px');
            }
        }else {
            $('#menuContainer').css('visibility', 'hidden');
            if ($(window).width() >= desktopMinWith){
                $('#content').css('padding-left', '20px');
            }
        }
    });
    
    
//    $('#menuAdminCRUD ul li a').on('click', function(){
//        var tableName = $(this).data('table-name');
//        changeContentCRUD(tableName);
//    });
    
    
    $(window).on('resize', function(){
        $('#menuContainer').css('visibility', 'hidden');
        $('#content').css('padding-left', '20px');
        toogleUserInfo();
        menuMaxHeight();
    });
    
    
    $('.logoutBtn').on('click',function (){
        userIsLogged = false;
        localStorage.removeItem('loggedUser');
        sessionStorage.removeItem('loggedUser');
        window.location.assign('/login');
    });
    
});

//function changeContentCRUD(tabla){
//    var url = 'admin/' + tabla;
//	var datos = {
//		data: null,
//		type: 'GET',
//		datatype: 'html'
//	};
//    
//	$.ajax(url, datos)
//	.done(function(data, status, xhr){
//		//Mostrar la respuesta utilizando DOM y CSS
//        $('#content').children().remove();
//        $('#content').append(data);
//        addCRUDButtonListeners();
////        window.location.href=url;
//	})
//	.fail(function(xhr, status, error){
//		alert('ERROR :(');
//	});
//}


function getForm(tableName){
    
    
    
    var url = '/admin/'+ tableName + '/insert';
	var datos = {
		data: null,
		type: 'GET',
		datatype: 'json'
	};
    
	$.ajax(url, datos)
	.done(function(data, status, xhr){
		//Mostrar la respuesta utilizando DOM y CSS
//        $('#popUp').append(data);
        console.log(data);
        $('#cancelButton').on('click', function(){
//            $('#popUpFormContainer h2').text("");
            $('#popUp').children().remove();
            $('#popUp').fadeOut();
        });
        
        
//        $('#popUp').fadeIn();
//        $('#popUp').css('display', 'flex');
        
	})
	.fail(function(xhr, status, error){
		alert('ERROR :(');
	});
}



function modeAdminOn(){
//    changeContentCRUD('binomios')
    
    
//    window.location.assign('/admin/asambleistas');
    
    
//    $('#menuAdminCRUD').show();
//    addCRUDButtonListeners();
    
//    window.location = "/binomios";
    
//    renderTable(getAll('asambleistas'), 'asambleistas');
//    activeScreen = $('.CRUDTableTitle:contains("asambleistas")').parent();
//    activeScreen.fadeIn();
    
    
}
