class XMICardinality {

    constructor(unid) {
        this.unid = unid;
    }

    getUpperCardinality(cardinality) {
        if(cardinality === 1)
            return "";
        if(cardinality === -1)
            return '\n\t\t<upperValue xmi:type="uml:LiteralUnlimitedNatural" xmi:id="' + this.unid() + '" value="*"/>';
        return '\n\t\t<upperValue xmi:type="uml:LiteralUnlimitedNatural" xmi:id="' + this.unid() + '" value="' + cardinality + '"/>';
    }

    getLowerCardinality(cardinality) {
        if(cardinality === 0)
            return this.getLower0Cardinality();
        else if(cardinality === 1)
            return "";
        return '\n\t\t<lowerValue xmi:type="uml:LiteralUnlimitedNatural" xmi:id="' + this.unid() + '" value="' + cardinality + '"/>';
    }

    getLower0Cardinality() {
        return '\n\t\t<lowerValue xmi:type="uml:LiteralInteger" xmi:id="' + this.unid() + '"/>';
    }

}
module.exports = XMICardinality;