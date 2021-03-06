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
//            if (autolog === false){
//                if($('#checkLogin').prop('checked')) {
//                    localStorage.setItem('loggedUser', JSON.stringify(data.loggedUser));
//                }
//                sessionStorage.setItem('loggedUser', JSON.stringify(data.loggedUser));
//                alert("Bienvenido " + data.loggedUser.name);
//            }
                
            alert("Bienvenido " + data.loggedUser.name);
            
            window.location.assign('/' + data.loggedUser.userType);
            
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
        if ($(window).width() > mobileMaxWith){
            $('#loggedUser').show();
            $('#loggedUser-menu').hide();
            $('#menuLogoutBtn').hide();
        }else{
            $('#loggedUser').hide();
            $('#loggedUser-menu').show();
            $('#menuLogoutBtn').show();
        }
}

function menuMaxHeight(){
    var mmh = $(window).height() - $('header').outerHeight();
    $('#menuContainer').css('max-height', mmh + "px");
}


function setLoggedUserData(loggedUser){
    $('.loggedUserPicture').attr('src', $('#loggedUser img').attr('src'));
    $('.loggedUserName').text($('#loggedUser label').text());
//    $('.loggedUserType').text(loggedUser.userType);
}


$(document).ready(function(){
    
    toogleUserInfo();
//    setLoggedUserData();
    
    
//    if (sessionStorage.getItem("loggedUser")) {
//        loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"))
//    }else if (localStorage.getItem("loggedUser")) {
//        loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
//    }
    
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
    
    
    $(window).on('resize', function(){
        $('#menuContainer').css('visibility', 'hidden');
        $('#content').css('padding-left', '20px');
        toogleUserInfo();
        menuMaxHeight();
    });
    
    
    $('.logoutBtn').on('click',function (){
        window.location.assign('/logout');
    });
    
    
    $('#btnEncuestaNueva').on('click', function(){
       var cedula = prompt('Ingrese el número de cédula');
        
        var url = '/encue/votos/' + cedula;
	    var datos = {
		    data: {
                'id':cedula},
            type: 'POST',
            datatype: 'json'
        };
        
        $.ajax(url, datos)
        .done(function(data, status, xhr){
            //Mostrar la respuesta utilizando DOM y CSS
            if (data.saved){
                alert('Nueva votación creada');
                window.location.assign('/encue/votos/' + data.id+'/binomios');
            }else {
                alert("No se creo votación");
            }
        })
        .fail(function(xhr, status, error){
            alert('ERROR DE CONEXIÓN');
        });
    });
    
    sessionStorage.setItem('objDefault', JSON.stringify(saveDefaultData()));
    sessionStorage.setItem('objEdited', JSON.stringify({}));
    
    $('#popUpForm input[type=text], #popUpForm input[type=password]').focusout(function(){
        var objDefault = JSON.parse(sessionStorage.getItem('objDefault'));
        var objEdited = buildEditObject(objDefault);
        
        sessionStorage.setItem('objEdited', JSON.stringify(objEdited));
        
        console.log(objEdited);
    });
    
});



function deleteRow(id, tableName){
    if (confirm("¿Estás seguro?")){
        var url = '/admin/'+ tableName + '/' + id;
	    var datos = {
		    data: null,
            type: 'DELETE',
            datatype: 'json'
        };
        
        $.ajax(url, datos)
        .done(function(data, status, xhr){
            //Mostrar la respuesta utilizando DOM y CSS
            if (data.deleted){
                alert('¡Registro borrado con éxito!');
                window.location.assign('/admin/' + tableName);
            }else {
                alert("ERROR al borrar registro");
            }
        })
        .fail(function(xhr, status, error){
            alert('ERROR DE CONEXIÓN');
        });
    }
}

function saveDefaultData(){
    //Almacena en variables los valores por defecto
    var obj = {};
    $('#popUpForm').find('input[type=text]').each(function() {
        var key = $(this).attr('name');
        var value = $(this).val();
        obj[key] = value;
    });
    return obj;
}

function buildEditObject(objDefault){
    var obj = {};
    for (key in objDefault){
        if ($('input[name='+ key +']').val() != objDefault[key]){
            obj[key] = $('input[name='+ key +']').val();
        }else{
            delete(obj[key]);
        }
    }
    return obj;
}

function updateRow(id, tableName){
    var url = '/admin/'+ tableName + '/' + id;
	    var datos = {
		    data: JSON.parse(sessionStorage.getItem('objEdited')),
            type: 'PUT',
            datatype: 'json'
        };
        
        $.ajax(url, datos)
        .done(function(data, status, xhr){
            //Mostrar la respuesta utilizando DOM y CSS
            if (data.edited){
                alert('¡Registro actualizado con éxito!');
                window.location.assign('/admin/' + tableName);
            }else {
                alert("ERROR al actualizar registro");
            }
        })
        .fail(function(xhr, status, error){
            alert('ERROR DE CONEXIÓN');
        });
}
function votarBinomio(binomio,id){
    
       var url = '/encue/votos/'+id+ '/binomios/'+binomio;
	    var datos = {
		     data: {
                'id':id,
                'idBinomio':binomio},
            type: 'PUT',
            datatype: 'json'
        };
        
    
        $.ajax(url, datos)
        .done(function(data, status, xhr){
            //Mostrar la respuesta utilizando DOM y CSS
            if (data.edited){
                alert('éxito!');
                window.location.assign('/encue/votos/' + id+'/asambleistas');
            }else {
                alert("No se creo votación");
            }
        })
        .fail(function(xhr, status, error){
            alert('ERROR DE CONEXIÓNnn');
        });
    
}
function votarAsambleista(asambleista,id){
    
       var url = '/encue/votos/'+id+ '/asambleistas/'+asambleista;
	    var datos = {
		     data: {
                'id':id,
                'asambleista':asambleista},
            type: 'PUT',
            datatype: 'json'
        };
        
    
        $.ajax(url, datos)
        .done(function(data, status, xhr){
            //Mostrar la respuesta utilizando DOM y CSS
            if (data.edited){
                alert('éxito!');
                window.location.assign('/encue/votos/' + id+'/parlamentarios');
            }else {
                alert("No se creo votación");
            }
        })
        .fail(function(xhr, status, error){
            alert('ERROR DE CONEXIÓNnn');
        });
    
}

function votarParlamentarios(parlamentario,id){
    
       var url = '/encue/votos/'+id+ '/parlamentarios/'+parlamentario;
	    var datos = {
		     data: {
                'id':id,
                'parlamentario':parlamentario},
            type: 'PUT',
            datatype: 'json'
        };
        
    
        $.ajax(url, datos)
        .done(function(data, status, xhr){
            //Mostrar la respuesta utilizando DOM y CSS
            if (data.edited){
                console.log(data);
                alert('éxito!');
                
                window.location.assign('/encue/votos/' + id);
            }else {
                alert("No se creo votación");
            }
        })
        .fail(function(xhr, status, error){
            alert('ERROR DE CONEXIÓNnn');
        });
    
}



function registraVoto(id, binomio, asambleista, parlamento){
    
      var url = '/encue/votos/'+id;
	    var datos = {
		     data: {
                'id':id
//                 ,
//                 'binomio':binomio,
//                 'asambleista':asambleista,
//                 'parlamento':parlamento
                },
            type: 'PUT',
            datatype: 'json'
        };
        
    
        $.ajax(url, datos)
        .done(function(data, status, xhr){
            //Mostrar la respuesta utilizando DOM y CSS
            if (data.saved){
                console.log(data);
                alert('éxito!');
                
                window.location.assign('/encue');
            }else {
                alert("No se guardó la votación");
            }
        })
        .fail(function(xhr, status, error){
            alert('ERROR DE CONEXIÓNnn');
        });
    
}
    