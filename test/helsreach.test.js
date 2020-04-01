const shexparser = require('../shex/shexparser.js');
const xmiparser = require('../xmi/xmiparser.js');
const TestRep = require('./testrepository.js');

describe('Pruebas de la transformación ShEx-XMI', () => {

    test('Shape', () => {
        let xml = shexparser.parseShEx(TestRep.getShex1());
        expect(TestRep.removeUniqueIDs(xml))
            .toEqual(TestRep.removeUniqueIDs(TestRep.getXMI1()));
    });

    test('Atributos básicos', () => {
        let xml = shexparser.parseShEx(TestRep.getShex2());

        expect(TestRep.removeUniqueIDs(xml))
            .toEqual(TestRep.removeUniqueIDs(TestRep.getXMI2()));
    });

    test('Relaciones', () => {
        let xml = shexparser.parseShEx(TestRep.getShex3());
        expect(TestRep.removeUniqueIDs(xml))
            .toEqual(TestRep.removeUniqueIDs(TestRep.getXMI3()));
    });

    test('Otros atributos', () => {
        let xml = shexparser.parseShEx(TestRep.getShex4());
        expect(TestRep.removeUniqueIDs(xml))
            .toEqual(TestRep.removeUniqueIDs(TestRep.getXMI4()));
    });

    test('Herencia simple', () => {
        let xml = shexparser.parseShEx(TestRep.getShex5());
        expect(TestRep.removeUniqueIDs(xml))
            .toEqual(TestRep.removeUniqueIDs(TestRep.getXMI5()));
    });

    test('Herencia múltiple', () => {
        let xml = shexparser.parseShEx(TestRep.getShex6());
        expect(TestRep.removeUniqueIDs(xml))
            .toEqual(TestRep.removeUniqueIDs(TestRep.getXMI6()));
    });

});

describe('Pruebas de la transformación XMI-ShEx', () => {

    test('Shape', () => {
        let shex = xmiparser.parseXMI(TestRep.getXMI1());
        expect(shex)
            .toEqual(TestRep.getShex1());
    });

    test('Atributos básicos', () => {
        let shex = xmiparser.parseXMI(TestRep.getXMI2());
        expect(shex)
            .toEqual(TestRep.getShex2());
    });

    test('Relaciones', () => {
        let shex = xmiparser.parseXMI(TestRep.getXMI3());
        expect(shex)
            .toEqual(TestRep.getShex3());
    });

    test('Otros atributos', () => {
        let shex = xmiparser.parseXMI(TestRep.getXMI4());
        expect(shex)
            .toEqual(TestRep.getShex4());
    });

    test('Herencia simple', () => {
        let shex = xmiparser.parseXMI(TestRep.getXMI5());
        expect(shex)
            .toEqual(TestRep.getShex5());
    });

    test('Herencia múltiple', () => {
        let shex = xmiparser.parseXMI(TestRep.getXMI6());
        expect(shex)
            .toEqual(TestRep.getShex6());
    });

});