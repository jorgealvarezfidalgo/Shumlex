/**
 * Gestiona los tipos en XMI
 */
class XMITypes {

    constructor (unid, irim, XMIAux, IRIManager) {
        this.datatypes = [];
        this.anyTypeId = null;
        this.nodeKinds = [];

        this.unid = unid;
        this.irim = irim;
        this.XMIAux = XMIAux;
        this.IRIManager = IRIManager;
    }

    /**
     * Crea un tipo XMI
     * @param type  Tipo
     * @returns {*}  Incluye si es primitivo y el nombre. Puede incluir IRI
     */
    createXMIType(type) {
        switch(type) {
            case "any":
                return {
                    primitive: false,
                    name: "Any"
                };
            case this.getXSDTypes(type):
                let last = this.irim.getPrefixedTermOfUri(type);
                return {
                    primitive: true,
                    name: last === "int" ? "integer" : last,
                    uri: type
                };
            default:
                return {
                    primitive: false,
                    name: this.irim.getPrefixedTermOfUri(type),
                    uri: type
                };
        }
    }

    /**
     * Indica si la IRI coincide con uno de los tipos XSD reconocidos
     * @param uri   IRI
     * @returns {string}    Tipo XSD si coincide, o vacío
     */
    getXSDTypes(uri) {
        let type = this.irim.getPrefixedTermOfUri(uri).split(":").pop();
        let xsdtypes = [];
        xsdtypes.push("string", "date",     //Dates
            "byte", "int", "integer", "long", "short",    //Numeric
            "boolean", "double", "float");
        if(xsdtypes.includes(type)) {
            return "http://www.w3.org/2001/XMLSchema#" + type;
        }
        return ""
    }

    /**
     * Busca un Datatype por nombre, o lo guarda si no existe
     * @param name  Nombre DT
     * @param uri   IRI DT
     * @returns {*} Datatype
     */
    findDataType(name, uri) {
        for(let i = 0; i < this.datatypes.length; i++) {
            if(name === this.datatypes[i].name) {
                return this.datatypes[i];
            }
        }

        let dt = {id: this.unid(), name: name, uri: uri};
        this.datatypes.push((dt));
        return dt;
    }

    /**
     * Busca un NodeKind por nombre, o lo guarda si no existe
     * @param kind  Tipo de nodo (nombre)
     * @returns {*} NodeKind
     */
    findNodeKind(kind) {
        for(let i = 0; i < this.nodeKinds.length; i++) {
            if(kind === this.nodeKinds[i].name) {
                return this.nodeKinds[i];
            }
        }

        let nk = {id: this.unid(), name: kind};
        this.nodeKinds.push((nk));
        return nk;
    }

    /**
     * Indica si existe un tipo WildCard/cualquiera
     * @returns {string}    ID Any
     */
    getAny() {
        return this.anyTypeId;
    }

    /**
     * Otorga un valor al tipo WildCard/cualquiera
     */
    setAny() {
        this.anyTypeId = this.unid();
    }

    /**
     * Crea, si está marcado, un tipo Wildcard denominado Any
     * @returns {*} XMI Packaged Element: Tipo Any
     */
    getAnyTypeXMI() {
        if(this.anyTypeId) {
            return this.XMIAux.createPackEl("uml:PrimitiveType", this.anyTypeId, 'name="Any"', "");
        }
        return "";
    }

    /**
     * Genera los tipos correspondientes a cada Datatype registrado
     * @returns {string}    XMI Datatypes
     */
    getDatatypesXMI() {
        let base = "";
        for(let i = 0; i < this.datatypes.length; i++) {
            base += this.XMIAux.createPackEl("uml:PrimitiveType", this.datatypes[i].id,
                'name="' + this.datatypes[i].name + '"', "");
        }
        return base;
    }

    /**
     * Genera los tipos correspondientes a cada NodeKind registrado
     * @returns {string}    XMI NodeKinds
     */
    getNodeKindsXMI() {
        let base = "";
        for(let i = 0; i < this.nodeKinds.length; i++) {
            base += this.XMIAux.createPackEl("uml:PrimitiveType", this.nodeKinds[i].id,
                'name="' + this.IRIManager.checkNodeKind(this.nodeKinds[i].name) + '"', "");
        }
        return base;
    }

    /**
     * Resetea los registros existentes
     */
    clear() {
        this.datatypes = [];
        this.anyTypeId = null;
        this.nodeKinds = [];
    }

}
module.exports = XMITypes;