const $ = require('./jquery-3.4.1.min.js');

let es = {
    stx: "ShEx a XMI",
    xts: "XMI a ShEx",
    guml: "Generar UML",
    ggr: "Generar grafo",
    cej: "Cargar ejemplos ",
    shb: "ShEx básico",
    her: "Herencia",
    rtn: "Restr. tipo nodal",
    fct: "Facetas",
    rex: "Rangos y exclusiones",
    cgn: "Conjuntos genéricos",
    etq: "Etiquetas de lenguaje",
    crd: "Cardinalidad",
    one: "OneOf",
    and: "Shapes anidadas",
    cer: "Shapes cerradas",
    rti: "Restricción triple inversa",
    ext: "Extra",
    exe: "Expresiones etiquetadas",
    cnj: "Conjunciones",
    cfg: "Configuración",
    cambiarClaro: "Tema claro",
    cambiarOscuro: "Tema oscuro",
    uk: "Inglés",
    es: "Español",
    int: "Introducción",
    p1: "Bienvenidos al <span class=\"pbold\">Proyecto Shumlex</span>. El objeto del mismo consiste en elaborar una herramienta que permita\n" +
        " llevar a cabo una integración entre las Shape Expressions y UML, otorgando al usuario la capacidad de generar\n" +
        " el equivalente en UML del conjunto deseado de ShEx, o viceversa; aportando asimismo características que permitan\n" +
        " la visualización in situ de los datos trabajados.",
    p2: "Obra de D. Jorge Álvarez Fidalgo.",
    mostrargrafo: "Generar grafo",
    borrarshex: "Borrar",
    cargarShexXMI: "Generar XMI",
    "dwnshex-btn" : "Descargar ShEx",
    shextoxmi: "Generar XMI",
    xmitoshex: "Generar ShEx",
    intercambiarsx: "Intercambiar",
    cargarGrafo: "Grafo",
    borrarxmi: "Borrar",
    cargarUML: "UML",
    "dwnxmi-btn": "Descargar XMI",
    mostraruml: "Generar UML",
    cargarXMIShex: "Generar ShEx",
    intercambiarxs: "Intercambiar",
    ggen: "Generación de grafo",
    shxm: "ShEx a XMI",
    umlg: "Generación de UML",
    xmsh: "XMI a ShEx"
};

let en = {
    stx: "ShEx to XMI",
    xts: "XMI to ShEx",
    guml: "Create UML",
    ggr: "Create graph",
    cej: "Load examples ",
    shb: "Basic ShEx",
    her: "Inheritance",
    rtn: "Node kinds",
    fct: "Facets",
    rex: "Ranges and exclusions",
    cgn: "Wildcard stem ranges",
    etq: "Language tags",
    crd: "Cardinality",
    one: "OneOf",
    and: "Nested shapes",
    cer: "Closed shapes",
    rti: "Inverse triple constraints",
    ext: "Extra",
    exe: "Labeled triple expression",
    cnj: "Conjunctions",
    cfg: "Settings",
    cambiarClaro: "Light Theme",
    cambiarOscuro: "Dark Theme",
    uk: "English",
    es: "Spanish",
    int: "Introduction",
    p1: "Welcome to <span class=\"pbold\">Shumlex</span>. Its purpose is to develop a tool which allows \n" +
        " an integration between both Shape Expressions and UML, enabling the user to create an UML equivalent to\n" +
        " the desired set of Shape Expressions, as well as the opposite. Moreover, it seeks to ease such tasks by\n" +
        " contributing some complementary features which allow a integrated display of the data.",
    p2: "A creation by Mr. Jorge Álvarez Fidalgo.",
    mostrargrafo: "Create graph",
    borrarshex: "Delete",
    cargarShexXMI: "Create XMI",
    "dwnshex-btn" : "Download ShEx",
    shextoxmi: "Create XMI",
    xmitoshex: "Create ShEx",
    intercambiarsx: "Swap",
    cargarGrafo: "Graph",
    borrarxmi: "Delete",
    cargarUML: "UML",
    "dwnxmi-btn": "Download XMI",
    mostraruml: "Create UML",
    cargarXMIShex: "Create ShEx",
    intercambiarxs: "Swap",
    ggen: "Graph generation",
    shxm: "ShEx to XMI",
    umlg: "UML generation",
    xmsh: "XMI to ShEx"
};

function checkLang() {
    let lang = sessionStorage.getItem("lang");
    if(!lang) {
        lang = es;
        sessionStorage.setItem("lang", JSON.stringify(lang));
        localize(lang);
    }
    else {
        localize(JSON.parse(lang));
    }



}

function localize(lang) {
    setContentByID("stx", lang.stx);
    setContentByID("xts", lang.xts);
    setContentByID("guml", lang.guml);
    setContentByID("ggr", lang.ggr);
    setContentByID("cej", lang.cej);
    setContentByID("shb", lang.shb);
    setContentByID("her", lang.her);
    setContentByID("rtn", lang.rtn);
    setContentByID("fct", lang.fct);
    setContentByID("rex", lang.rex);
    setContentByID("cgn", lang.cgn);
    setContentByID("etq", lang.etq);
    setContentByID("crd", lang.crd);
    setContentByID("one", lang.one);
    setContentByID("and", lang.and);
    setContentByID("cer", lang.cer);
    setContentByID("rti", lang.rti);
    setContentByID("ext", lang.ext);
    setContentByID("exe", lang.exe);
    setContentByID("cnj", lang.cnj);
    setContentByID("cfg", lang.cfg);
    setContentByID("cambiarClaro", lang.cambiarClaro);
    setContentByID("cambiarOscuro", lang.cambiarOscuro);
    setTitleByID("uk", lang.uk);
    setTitleByID("es", lang.es);
    setContentByID("int", lang.int);
    setContentByID("p1", lang.p1);
    setContentByID("p2", lang.p2);
    setContentByID("mostrargrafo", lang.mostrargrafo);
    setTitleByID("borrarshex", lang.borrarshex);
    setContentByID("cargarShexXMI", lang.cargarShexXMI);
    setTitleByID("dwnshex-btn", lang["dwnshex-btn"]);
    setContentByID("shextoxmi", lang.shextoxmi);
    setContentByID("xmitoshex", lang.xmitoshex);
    setContentByID("cargarGrafo", lang.cargarGrafo);
    setTitleByID("borrarxmi", lang.borrarxmi);
    setContentByID("cargarUML", lang.cargarUML);
    setTitleByID("dwnxmi-btn", lang["dwnxmi-btn"]);
    setContentByID("mostraruml", lang.mostraruml);
    setContentByID("cargarXMIShex", lang.cargarXMIShex);

    setTitleByClass("intercambiarsx", lang.intercambiarsx);
    setTitleByClass("intercambiarxs", lang.intercambiarxs);
    setContentByClass("ggen", lang.ggen);
    setContentByClass("shxm", lang.shxm);
    setContentByClass("umlg", lang.umlg);
    setContentByClass("xmsh", lang.xmsh);
}

function setContentByID(id, co) {
    if(document.getElementById(id)) {
        $("#"+id).html(co);
    }
}

function setTitleByID(id, co) {
    if(document.getElementById(id)) {
        $("#"+id).attr("title", co);
    }
}

function setContentByClass(id, co) {
    if(document.getElementsByClassName(id).length > 0) {
        $("."+id).text(co);
    }
}

function setTitleByClass(id, co) {
    if(document.getElementsByClassName(id).length > 0) {
        $("."+id).attr("title", co);
    }
}

exports.checkLang = checkLang;
exports.en = en;
exports.es = es;