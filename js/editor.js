const $ = require('./jquery-3.4.1.min.js');

const shexparser = require('../shex/shexparser.js');
const xmiparser = require('../xmi/xmiparser.js');

const xmlformat = require('xml-formatter');

$('#shextoxmi').click(shExToXMI);
$('#xmitoshex').click(XMIToShEx);

function shExToXMI() {
	let text = shExEditor.getValue();

    let parsedToXML = shexparser.parseShEx(text);
    //xmiEditor.setValue(xmlformat(parsedToXML, {}));
    xmiEditor.setValue(parsedToXML);
}

function XMIToShEx() {
    let text = xmiEditor.getValue();
    shExEditor.setValue(xmiparser.parseXMI(text));
}
