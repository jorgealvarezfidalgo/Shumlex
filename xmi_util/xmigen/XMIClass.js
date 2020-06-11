/**
 * Genera el XMI correspondiente a una clase UML
 */
class XMIClass {

    constructor (shm, xmitype, irim, xmiatt, xmicon, xmiasoc, xmisub, XMIAux, IRIManager) {
        this.shm = shm;
        this.XMITypes = xmitype;
        this.irim = irim;
        this.xmiatt = xmiatt;
        this.xmicon = xmicon;
        this.xmiasoc = xmiasoc;
        this.xmisub = xmisub;
        this.XMIAux = XMIAux;
        this.IRIManager = IRIManager;

    }

    /**
     * Crea una clase XMI
     * @param name  Nombre de la clase
     * @param shape Shape cuyo equivalente XMI ha de ser hallado
     * @returns {string|*}  Clase XMI
     */
    createXMIClass(name, shape) {
        let sh = this.shm.findShape(name);
        let expression = shape.expression;
        let nodekind = shape.nodeKind;
        let generalizations = "";
        let nk = nodekind === undefined ? "" : this.xmiatt.createXMIKindAttribute("nodeKind", nodekind);
        let dt = shape.datatype === undefined ? "" : this.xmiatt.createXMIPrimAttribute("datatype",
            shape.datatype);

        //Nombre de la clase prefijado
        let prName = this.IRIManager.getShexTerm(this.irim.getPrefixedTermOfUri(name));
        //Shape anónima
        if(prName.includes("_:")) {
            this.shm.incrementBlank();
        }
        let ats = "";
        let subClassName = this.xmisub.getComponentNumber();
        if(shape.type === "ShapeAnd") {
            let nOfShapes = 0;
            //Contar el número de Shapes en la conjunción
            let exprsForGen = [];
            let exprsForComp = [];
            for (let i = 0; i < shape.shapeExprs.length; i++) {
                if(shape.shapeExprs[i].type === "ShapeRef"      // Herencia - :User :Person AND {}
                    || shape.shapeExprs[i].type === "NodeConstraint") { // Restricción Nodal - :Thing Literal AND {}
                    exprsForGen.push(shape.shapeExprs[i]);
                }
                else if (shape.shapeExprs[i].type === "Shape" && shape.shapeExprs[i].expression
                    && shape.shapeExprs[i].expression.predicate === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type") {
                    exprsForGen.push(shape.shapeExprs[i].expression.valueExpr.values);
                }
                else {
                    nOfShapes++;
                    exprsForComp.push(shape.shapeExprs[i]);
                    //:User IRI CLOSED {...}
                    if(shape.shapeExprs[i].closed === true) {
                        this.xmicon.markAsClosed(sh.id);
                    }
                }
            }
            if(nOfShapes > 0) {
                ats += this.xmiatt.createComponent("AND", subClassName, exprsForComp);
            }
            generalizations = this.xmiatt.createXMIGeneralization(exprsForGen, false, sh.id);
        }
        else if(shape.type === "ShapeOr") {
            console.log(shape);
            let nOfShapes = 0;
            //Contar el número de Shapes en la conjunción
            let exprsForGen = [];
            let exprsForComp = [];
            for (let i = 0; i < shape.shapeExprs.length; i++) {
                if(shape.shapeExprs[i].type === "ShapeRef"      // Herencia - :User :Person AND {}
                    || shape.shapeExprs[i].type === "NodeConstraint") { // Restricción Nodal - :Thing Literal AND {}
                    exprsForGen.push(shape.shapeExprs[i]);
                }
                else if (shape.shapeExprs[i].type === "Shape" && shape.shapeExprs[i].expression
                    && shape.shapeExprs[i].expression.predicate === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type") {
                    exprsForGen.push(shape.shapeExprs[i].expression.valueExpr.values);
                }
                else {
                    nOfShapes++;
                    exprsForComp.push(shape.shapeExprs[i]);
                    //:User IRI CLOSED {...}
                    if(shape.shapeExprs[i].closed === true) {
                        this.xmicon.markAsClosed(sh.id);
                    }
                }
            }
            if(nOfShapes > 0) {
                ats += this.xmiatt.createComponent("OR", subClassName, exprsForComp);
            }
            generalizations = this.xmiatt.createXMIGeneralization(exprsForGen, false, sh.id, "OR");
        }
        //Si no es una ShapeAnd, generar atributos de modo corriente
        else {
            ats = this.xmiatt.createXMIAttributes(expression, prName);
        }

        //Comprobar facetas ShEx: restricciones
        this.xmicon.checkFacets(shape, sh.id);

        let extra = "";
        //Comprobar si tiene Extra
        if(shape.extra !== undefined) {
            extra = this.xmicon.markAsExtra(sh.id, shape.extra, prName);
        }

        //El interior de la clase está conformado por:
        let int = ats               //Atributos
            + nk                    //Atributos tipo nodo (IRI, Literal...)
            + dt                    //Atributos datatype
            + generalizations       //Generalizaciones
            + extra;

        let classXMI = this.XMIAux.createPackEl("uml:Class", sh.id, 'name="' + prName + '"', int);

        //Comprobar si es una shape cerrada
        if(shape.closed === true) {
            this.xmicon.markAsClosed(sh.id);
        }

        //Crear elementos dependientes de esta clase
        classXMI += this.xmicon.createDependentOwnedRules();
        classXMI += this.xmiasoc.createDependentAssociations(sh.id);
        classXMI += this.xmisub.createDependentComponents();

        return classXMI;
    }


}
module.exports = XMIClass;