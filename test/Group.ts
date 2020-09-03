import * as assert from "assert";
import { Group } from "../lib/Group";

describe('Group', function () {
    describe('set', function () {
      it('set', function () {
        let group= new Group([]);
        group.set([1,2,3,4,5,,7,8,9]);
        assert.deepEqual(group.cells[0].allowedValues, [true, false, false, false, false, false, false, false, false]);
        assert.deepEqual(group.cells[8].allowedValues, [false, false, false, false,  false, false, false, false, true]);
        assert.deepEqual(group.cells[5].allowedValues, [true, true, true, true, true, true, true, true, true]);
      });
    });
  
    describe('cluster', function () {
      it('cluster', function () {
        let group= new Group([]);
        group.set([1,2,3,4,5,6,7,8,9]);
        let {clusters} = group.cluster();
        assert.equal(clusters.length, Group.N);
  
        group=new Group([]);
         clusters = group.cluster().clusters;
        assert.equal(clusters.length, 1);
        assert.equal(clusters.filter(c=>{return c.uncertainty==9 && c.count==Group.N;}).length, 1)
      });
    });
  
    describe('reduce', function () {
      it('reduce', function () {
        let group= new Group([]);
        group.set([,2,3,4,5,6,7,,]);
        assert(group.reduce());
        assert.deepEqual(group.cells[0].allowedValues, [true, false, false, false, false, false, false, true, true]);
        assert.deepEqual(group.cells[7].allowedValues, group.cells[0].allowedValues);
        assert.deepEqual(group.cells[8].allowedValues, group.cells[0].allowedValues);
        assert( ! group.reduce());
  
        group = new Group([]);
        group.set([4,5,1,9,3,7,8,2,,]);
        assert(group.reduce());
      });
    });
    describe('reduce', function () {
      it('not resolvable', function () {
        let group= new Group([]);
        group.cells[0].allowedValues=Array(Group.N).map(()=>false); //set all allowed to false
        group.cells[0].allowedValues[0]=group.cells[0].allowedValues[1]=true;
        group.cells[2] = group.cells[0];
        group.cells[4] = group.cells[0];
        assert.throws(()=>{group.reduce()});
    

      });
    });
  });
  