class XMIClass {

    constructor (shm, xmitype, xmipref, xmiatt, xmicon, xmiasoc, xmisub) {
        this.shm = shm;
        this.XMITypes = xmitype;
        this.xmipref = xmipref;
        this.xmiatt = xmiatt;
        this.xmicon = xmicon;
        this.xmiasoc = xmiasoc;
        this.xmisub = xmisub;
    }

    createXMIClass(name, shape) {
        let sh = this.shm.findShape(name);
        let expression = shape.expression;
        let nodekind = this.XMITypes.adequateNodeKindPresentation(shape.nodeKind);
        let generalizations = "";
        if(shape.type === "ShapeAnd") {
            expression = shape.shapeExprs.pop().expression;
            generalizations = this.xmiatt.createXMIGeneralization(shape.shapeExprs);
        }
        let nk = nodekind === undefined ? "" : this.xmiatt.createXMIPrimAttribute("nodeKind", nodekind);
        let dt = shape.datatype === undefined ? "" : this.xmiatt.createXMIPrimAttribute("datatype",
            shape.datatype);
        this.xmicon.checkFacets(shape, sh.id);
        let prName = this.xmipref.getPrefixedTermOfUri(name);
        let classXMI = '\n<packagedElement xmi:type="uml:Class" xmi:id="' + sh.id + '" name="'
            + prName
            + '">' +
            this.xmiatt.createXMIAttributes(expression, prName) +
            nk + dt +
            generalizations + '\n</packagedElement>';

        classXMI += this.xmicon.createDependentOwnedRules();
        classXMI += this.xmiasoc.createDependentAssociations(sh.id);
        classXMI += this.xmisub.createDependentSubClasses();

        return classXMI;
    }


}
module.exports = XMIClass;