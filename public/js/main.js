//var datos = null;

//var activeScreen = null;



//function login(user, pass, autolog){
//    
//    // var checked = false;
//    
//    // if($('#checklogin').prop('checked')) {
//    //     checked = true;
//    // } else {
//    //     checked = false;   
//    // }
//    
//    // console.log();
//    
//    loggedUser = validateLogIn(user, pass);
//    
//    if (loggedUser != null){
//        
//        
//        
//        if($('#checkLogin').prop('checked')) {
//            sessionStorage.setItem('loggedUser', user);
//            sessionStorage.setItem('loggedUserPass', pass);
//        }
//        
//        if (autolog === false){
//            alert("Bienvenido " + loggedUser.user);
//        }
//        
//        toogleUserInfo();
//        menuMaxHeight();
//        
//        $('.loggedUserPicture').attr('src', loggedUser.imagen);
//        $('.loggedUserName').text(loggedUser.user);
//        $('input').val('');
//        $('#loginFormContainer').hide();
//        
//        switch (loggedUser.userType) {
//            case 'a':
//                $('.loggedUserType').text('Administrador');
//                modeAdminOn();
//                break;
//            case 'e':
//                $('.loggedUserType').text('Encuestador');
//                modeEncueOn();
//                break;
//            default:
//                // code
//        }
//    }else{
//        alert("¡Usuario y/o pass incorrecto!");
//        $('input').val('');
//        $('input:eq(0)').focus();
//    }
//}
//
//function renderTablaCandidatos(arrC, arrP, arrD){
//    var tabla = document.createElement('table');
//    var str = "<thead><tr><th>ID</th><th>Partido</th><th>Foto</th><th>Nombre</th><th>Dignidad</th></tr></thead><tbody>";
//    
//    for (var c of arrC){
//        str += "<tr><td>" + c.id + "</td><td><img height='100px' src='" + findById(arrP, c.partidoId).logo + "'></td><td><img height='100px' src='" + c.imagen + "'></td><td>" + c.nombre + "</td><td>" + findById(arrD, c.dignidadId).nombre + "</td></tr>"
//    }
//    str += "</tbody>"
//    tabla.innerHTML = str;
//    $("#content").append(tabla);
//}


//function renderTable(arr, tableName){
//    // for (attr in datos){
//        // var arrC = datos[attr];
//        var arrC = arr;
//        var CRUDContainer = document.createElement('div');
//        var tituloTabla = document.createElement('h2');
//        var insertButton = document.createElement('button');
//        var tabla = document.createElement('table');
//        var cabecera = [];
//
//        CRUDContainer.style.display = 'none';
//        CRUDContainer.setAttribute('class', 'CRUDContainer');
//        tituloTabla.innerHTML = "Lista de " + tableName;
//        tituloTabla.setAttribute('class', 'CRUDTableTitle');
//        insertButton.setAttribute('class', 'CRUD-button insert');
//        insertButton.innerHTML = "<img src='images/new_icon.png'>";
//        tabla.setAttribute('id', tableName);
//
//        var str = "<thead><tr>";
//        for (attr in arrC[0]){
//            str += "<th>" + attr + "</th>";
//        }
//
//        str += "<th>Acciones</th></tr></thead><tbody>";
//
//        for (var row of arrC ){
//            str += "<tr>";
//            for (var attr in row){
//                str += "<td><b class='table-cell-label'>" + attr + "</b>";
//                if (attr.includes('foto') || attr.includes('logo') || attr.includes('imagen')){
//                    str += "<img src='" + row[attr] + "' width='50px'>";
//                }
//                else{
//                    str += "<span class='table-cell-content'>" + row[attr] + "</span>";
//                }
//                str += "</td>";
//            }
//            str += "<td><b class='table-cell-label'>Acciones</b><span class='table-cell-content'><button class='CRUD-button edit'><img src='images/edit_icon.png'></button><button class='CRUD-button delete'><img src='images/delete_icon.png'></button></span></td>";
//            str += "</tr>";
//        }
//
//        str += "</tbody>";
//        // str += "<a id='show-graph' onclick='generarGraficoBinomio()'>MOSTRAR GRAFICO BINOMIOS</a>";
//        // str += "<a id='show-graph' onclick='generarGraficoAsambleistas()'>MOSTRAR GRAFICO ASAMBLEISTAS</a>";
//        // str += "<a id='show-graph' onclick='generarGraficoParlamentarios()'>MOSTRAR GRAFICO PARLAMENTARIOS</a>";
//        
//        str += "<a class='btn primary' id='toggle-chart-table'>MOSTRAR TABLA</a>";
//        tabla.innerHTML = str;
//        CRUDContainer.append(tituloTabla);
//        CRUDContainer.append(insertButton);
//        CRUDContainer.append(tabla);
//        $("#content").append(CRUDContainer);
//    // }
//}

function renderTableEncuestador(arr, tableName){
    // for (attr in datos){
        // var arrC = datos[attr];
        var arrC = arr;
        var CRUDContainer = document.createElement('div');
        var tituloTabla = document.createElement('h2');
       // var Button = document.createElement('button');
        var tabla = document.createElement('table');
        var cabecera = [];

        CRUDContainer.style.display = 'none';
        CRUDContainer.setAttribute('class', 'CRUDContainer');
        tituloTabla.innerHTML = "Lista de " + tableName;
        tituloTabla.setAttribute('class', 'CRUDTableTitle');
       // insertButton.setAttribute('class', 'CRUD-button insert');
       // insertButton.innerHTML = "<img src='images/new_icon.png'>";
        tabla.setAttribute('id', tableName);

        var str = "<thead><tr>";
        for (attr in arrC[0]){
            str += "<th>" + attr + "</th>";
        }

        str += "<th>Acciones</th></tr></thead><tbody>";

        for (var row of arrC ){
            str += "<tr>";
            for (var attr in row){
                str += "<td><b class='table-cell-label'>" + attr + "</b>";
                if (attr.includes('foto') || attr.includes('logo') || attr.includes('imagen')){
                    str += "<img src='" + row[attr] + "' width='50px'>";
                }
                else{
                    str += "<span class='table-cell-content'>" + row[attr] + "</span>";
                }
                str += "</td>";
            }
            str += "<td><b class='table-cell-label'>Acciones</b><span class='table-cell-content'><button class='CRUD-button delete'><img src='images/vote_icon.png'></button></span></td>";
            str += "</tr>";
        }

        str += "</tbody>";
//        str += "<a id='show-graph' onclick='generarGraficoBinomio()'>MOSTRAR GRAFICO</a>";
//        
//        str += "<a class='btn primary' id='toggle-chart-table'>MOSTRAR TABLA</a>";
        tabla.innerHTML = str;
        CRUDContainer.append(tituloTabla);
       // CRUDContainer.append(insertButton);
        CRUDContainer.append(tabla);
        $("#content").append(CRUDContainer);
    // }
}

//
//$(document).ready(function(){
//    datos = loadJSON(json);
//    
//    
//    
//     $('#menuEncuestador ul li a').on('click', function(){
//        var tableName = $(this).data('table-name');
//        
//        // parent().attr('name');
//        activeScreen.fadeOut(function(){
//            activeScreen.remove();
//            renderTableEncuestador(getAll(tableName), tableName);
//            activeScreen = $('.CRUDTableTitle:contains("' + tableName + '")').parent();
//            activeScreen.fadeIn();
//            
//            addEncuestadorButtonListeners();
//            
//        });
//    });
//    
//});









function addCRUDButtonListeners(){
    $('.CRUD-button.delete').on('click', function() {
        var tableId = '';
        
        var r = confirm("¿Estás seguro?");
        if (r == true) {
            var id = $(this).parents('tr').children(':nth-child(1)').children(':nth-child(2)').text();
            $(this).parents('tr').fadeOut();
            tableId = $(this).parents('table').attr('id');
            
            deleteByID(selectArray(tableId), id);
            console.log("Registro Eliminado");
        }
    });
    
    
//    $('.CRUD-button.insert').on('click', function(){
//        var tableId = $(this).next().attr('id');
//        var arr = selectArray(tableId);
//        
//        var formText = "";
//        var niu = {};
//        
//        $('#popUp').fadeIn();
//        $('#popUp').css('display', 'flex');
//        
//        for (var attr in arr[0]){
//            niu[attr] = '';
//            formText += "<label>" + attr + "</label><input id='"+ attr + "Box' type='text' class='form-TextBox'>";
//        }
//        
//        console.log(niu);
//        
//        formText += "<button id='saveButton' class='form-button'>Guardar</button>";
//        formText += "<button id='cancelButton' class='form-button'>Cancel</button>";
//        
//        
//        $('#popUpFormContainer h2').text("Nuevo " + arr[0].constructor.name);
//        $('#popUpForm').html(formText);
//        
//        $('#cancelButton').on('click', function(){
//            $('#popUpFormContainer h2').text("");
//            $('#popUpForm').children().remove();
//            $('#popUp').fadeOut();
//        });
//        
//        $('#saveButton').on('click', function(){
//            for (var key in niu){
//                niu[key] = $("#popUpForm input[id='" + key + "Box']").val();
//            }
//            
//            arr.push(niu);
//            
//            $('#popUpFormContainer h2').text("");
//            $('#popUpForm').children().remove();
//            $('#popUp').fadeOut();
//            
//            
//            activeScreen.fadeOut(function(){
//                activeScreen.remove();
//                renderTable(getAll(tableId), tableId);
//                activeScreen = $('.CRUDTableTitle:contains("' + tableId + '")').parent();
//                activeScreen.fadeIn();
//                
//                addCRUDButtonListeners();
//            
//            });
//        });
//    });
    
    $('.CRUD-button.edit').on('click', function(){
        
        var id = $(this).parents('tr').children(':nth-child(1)').children(':nth-child(2)').text();
        var tableId = $(this).parents('table').attr('id');
        var arr = selectArray(tableId);
        
        console.log(id);
        console.log(arr);
        
        
        var currentItem = arr[id-1];
        
        var formText = "";
        var niu = {};
        
        $('#popUp').fadeIn();
        $('#popUp').css('display', 'flex');
        
        for (var attr in currentItem){
            niu[attr] = '';
            formText += "<label>" + attr + "</label><input id='"+ attr + "Box' type='text' class='form-TextBox' value='" + currentItem[attr] + "'>";
        }
        
        console.log(niu);
        
        formText += "<button id='saveButton' class='form-button'>Guardar</button>";
        formText += "<button id='cancelButton' class='form-button'>Cancel</button>";
        
        
        $('#popUpFormContainer h2').text("Editar " + arr[0].constructor.name);
        $('#popUpForm').html(formText);
        
        $('#cancelButton').on('click', function(){
            $('#popUpFormContainer h2').text("");
            $('#popUpForm').children().remove();
            $('#popUp').fadeOut();
        });
        
        $('#saveButton').on('click', function(){
            for (var key in niu){
                niu[key] = $("#popUpForm input[id='" + key + "Box']").val();
            }
            
            arr[id-1] = niu;
            
            $('#popUpFormContainer h2').text("");
            $('#popUpForm').children().remove();
            $('#popUp').fadeOut();
            
            
            activeScreen.fadeOut(function(){
                activeScreen.remove();
                renderTable(getAll(tableId), tableId);
                activeScreen = $('.CRUDTableTitle:contains("' + tableId + '")').parent();
                activeScreen.fadeIn();
                
                addCRUDButtonListeners();
            });
        });
    });
}

function modeEncueOn(){
   renderTableEncuestador(getAll('binomios'), 'binomios');
    activeScreen = $('.CRUDTableTitle:contains("binomios")').parent();
    activeScreen.fadeIn();
    $('#menuEncuestador').show();
    addEncuestadorButtonListeners();
}


function addEncuestadorButtonListeners(){
     
    $('.CRUD-button.delete').on('click', function() {
                console.log($('.CRUDTableTitle').text());
        var tipoDignidad = "";
        switch($('.CRUDTableTitle').text()){
            case "Lista de asambleistas":
                tipoDignidad="asambleistas";
            break;
            case "Lista de binomios":
                tipoDignidad="binomios";
            break;
            case "Lista de parlamentarios":
                tipoDignidad="parlametarios"; 
            break;
            default:
        }
        console.log(tipoDignidad);
        var arr = selectArray(tipoDignidad);
        
        var aaa = $(this).parents('tr').children(':nth-child(2)').children(':nth-child(2)').text();
        
        for(var c of arr){
            
            if(c.lista==aaa){
               
                console.log(c.voto);
                c.voto+=1;
                console.log(c.voto);
                activeScreen.fadeOut(function(){
            activeScreen.remove();
            renderTableEncuestador(getAll(tipoDignidad), tipoDignidad);
            activeScreen = $('.CRUDTableTitle:contains("' + tipoDignidad + '")').parent();
            activeScreen.fadeIn();
            
            addEncuestadorButtonListeners();
            
            
    
    
            
        });
            }
           
        }
        
    //s   var cedula = prompt("ingrese su número de cédula: ")
        
       // var r = confirm("¿Está seguro que desea votar por:"+$(this).parents('tr').first().children(':nth-child(2)').text());
  
 
    });
    
    
}