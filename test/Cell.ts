import { Cell } from "../lib/Cell";
import { Group } from "../lib/Group";


var assert = require('assert');
describe('Cell', function () {
    describe('setAnOnlyValue', function () {
      it('set', function () {
        let cell= new Cell();
        cell.set(1);
        assert.deepEqual(cell.allowedValues, [true, false, false, false, false, false, false, false, false]);
        cell.set(9);
        assert.deepEqual(cell.allowedValues, [false, false, false, false, false, false, false, false, true]);
      });
    });
    describe('clone', function () {
      it('clone', function () {
        let cell= new Cell();
        cell.set(1);
        let cell2 = cell.clone();
        assert.deepEqual(cell.allowedValues, [true, false, false, false, false, false, false, false, false]);
        assert.deepEqual(cell2.allowedValues, [true, false, false, false, false, false, false, false, false]);
        cell2.set(2);
        assert.deepEqual(cell.allowedValues, [true, false, false, false, false, false, false, false, false]);
        assert.deepEqual(cell2.allowedValues, [false, true, false, false, false, false, false, false, false]);
      });
    });

    describe('restrict', function () {
      it('restrict', function () {
        let cell= new Cell();
        assert(cell.disallow([true, false, false,false,false,false,false,false, true]));   
        assert(! cell.disallow([true, false, false,false,false,false,false,false, true]));
        assert.deepEqual(cell.allowedValues, [false, true, true, true,true, true,true, true, false]);

      });
    });
    describe('equals', function () {
      it('equals', function () {
        assert(new Cell().equals(new Cell));
        let cell1= new Cell();
        let cell2= new Cell();
        cell1.disallow([true, false, false,false,false,false,false,true, false]);
        cell2.disallow([true, false, false,false,false,false,false,true, false]);
        assert(cell1.equals(cell2));

      });
    })
    describe('uncertainty', function () {
      it('uncertainty', function () {
        assert.equal(new Cell().uncertainty(), Group.N);
        let cell = new Cell();
        cell.set(5);
        assert.equal(cell.uncertainty(), 1);
        cell=new Cell();
        assert.equal(cell.uncertainty(), 9);
      });
    });
  
    describe('not equals', function () {
      it('not equals', function () {
 
        let cell1= new Cell();
        let cell2= new Cell();
        cell1.disallow([true, false, false,false,false,false,false,false, false]);
        cell2.disallow([false, false, false,false,false,false,false,false, true]);
        assert(!cell1.equals(cell2));

      });
    });    
});
