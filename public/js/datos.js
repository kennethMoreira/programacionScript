class Usuario {
    constructor (obj){
        this.id = obj.id;
        this.user = obj.user;
        this.pass = obj.pass;
        this.userType = obj.userType;
        this.imagen = obj.imagen;
    }
}

class Eleccion{
    constructor(obj){
        this.id = obj.id;
        this.titulo = obj.titulo;
        this.fecha = obj.fecha;
        this.descripcion = obj.descripcion;
        this.cedulaVotantes = obj.cedulaVotantes;
        this.dignidades = this.setDignidades(obj.dignidades);
    }
    
    setDignidades(dig){
        var arr = [];
        for (var x of dig){
            arr.push(new Dignidad(x));
        }
        return arr;
    }
    
    getDignidades(){
        var arr = [];
        for (var dig of this.dignidades){
            arr.push({"id":dig.id, "nombre":dig.nombre});
        }
        return arr;
    }
    
    getCandidatosPorDignidad(dignidad){
        var arr = [];
        var d = this.dignidades.find(function(x){
            if (x.nombre === dignidad){
                return true;
            }
        });
        
        return d.candidatos;
    }
    
}

class Dignidad{
    constructor(obj){
        this.id = obj.id;
        this.nombre = obj.nombre;
        this.candidatos = this.setCandidatos(obj.candidatos);
    }
    setCandidatos (can){
        var arr = [];
        for (var x of can){
            switch (this.nombre){
                case "Binomio":
                    arr.push(new Binomio(x));
                break;
                case "Asambleista":
                    arr.push(new Asambleista(x));
                break;
                case "Parlamentario":
                    arr.push(new Parlamentario(x));
                break;
                default:
            }
        }
        return arr;
    }
}

class Candidato{
    constructor(obj){
        this.id = obj.id;
        this.lista = obj.lista;
        this.logoLista = obj.logoLista;
        this.partido = obj.partido;
        this.imagen = obj.imagen;
        this.nombre = obj.nombre;
        this.voto = obj.voto;
    }
}

class Binomio extends Candidato{
    constructor(obj){
        super(obj);
        this.imagenVicepresidente = obj.imagenVicepresidente;
        this.vicepresidente = obj.vicepresidente;
    }
}

class Parlamentario extends Candidato{
    constructor(obj){
        super(obj);
    }
}

class Asambleista extends Candidato{
    constructor(obj){
        super(obj);
        this.zona = obj.zona;
    }
}


function loadJSON (json){
    var jsonObj = json;
    var objAux = {"elecciones":[],"usuarios":[]};
    
    for (var att in jsonObj){
        switch (att){
            case "elecciones":
                for (var e of jsonObj[att]){
                    objAux[att].push(new Eleccion(e));
                }
                break;
            case "usuarios":
                for (var u of jsonObj[att]){
                    objAux[att].push(new Usuario(u));
                }
                break;
            default:
        }
    }
    
    console.log("JSON leído correctamente");
    
    return objAux;
}

function validateLogIn (user, pass){
    for (var u of datos.usuarios){
        if (user === u.user && pass === u.pass){
            return u;
        }
    }
    return null;
}

function getAll(arrName){
    switch(arrName){
        case 'elecciones':
            return datos.elecciones;
            break;
        case 'usuarios':
            return datos.usuarios;
            break;
        case 'dignidades':
            var arr = [];
            for (var e of datos.elecciones){
                for (var dig of e.getDignidades()){
                    arr.push(dig);
                }
            }
            return arr;
            break;
        case 'binomios':
            var arr = [];
            for (var e of datos.elecciones){
                for (var bi of e.getCandidatosPorDignidad('Binomio')){
                    arr.push(bi);
                }
            }
            return arr;
            break;
        case 'asambleistas':
            var arr = [];
            for (var e of datos.elecciones){
                for (var bi of e.getCandidatosPorDignidad('Asambleista')){
                    arr.push(bi);
                }
            }
            return arr;
            break;
        case 'parlamentarios':
            var arr = [];
            for (var e of datos.elecciones){
                for (var bi of e.getCandidatosPorDignidad('Parlamentario')){
                    arr.push(bi);
                }
            }
            return arr;
            break;
            default:
    }
}


function filtrarCandidatosPorDignidad(arr, d){
    //'d' es la dignidad. 1 = presidente, 2 = vicepresidente
    return arr.filter(function(c){if (c.dignidadId === d){return true;}});
}

function findById (arr, id){
    return arr.find(function(x){if (x.id === id){return true;}});
}

function deleteByID (arr, id){
    
    var index = arr.findIndex(function(x){
        console.log(x.id)
        if (x.id == id){
            return true;
        }
    });
    console.log(index)
    arr.splice(index, 1);
};

function selectArray (tableId){
    switch (tableId) {
                case 'binomios':
                    return datos.elecciones[0].dignidades[0].candidatos;
                    break;
                case 'parlamentarios':
                    return datos.elecciones[0].dignidades[1].candidatos;
                    break;
                case 'asambleistas':
                    console.log('AAAAA')
                    return datos.elecciones[0].dignidades[2].candidatos;
                    break;
                case 'diginidad':
                    return datos.elecciones[0].dignidades;
                    break;
                case 'usuarios':
                    return datos.usuarios;
                    break;
                case 'elecciones':
                    return datos.elecciones;
                    break;
                default:
                    // code
            }
}