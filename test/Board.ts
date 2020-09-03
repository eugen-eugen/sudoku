import { Board } from "../lib/Board";
import * as assert from "assert";


describe('Board', function () {
  describe('unambigious', function () {
    it('unambigious', function () {
      let board= Board.setBoard([
        [6, , ,2,8, ,5,1,3], 
        [4, , , , , , , , ],
        [8,2, ,5, , ,9, , ],
        [9,1,3, ,5, ,4, ,7],
        [ , ,8, , , ,3, , ],
        [ ,4, , ,9,2, , , ],
        [3, , ,4, , ,2, , ],
        [ ,5, ,1,2, ,6,3,8],
        [ , , ,8, , 6,7, ,]   
      ]);
      assert(!board.firstUncertain() !== null);
      board=Board.setBoard([
        [6,6,6,6,6,6,6,6,6], 
        [6,6,6,6,6,6,6,6,6], 
        [6,6,6,6,6,6,6,6,6], 
        [6,6,6,6,6,6,6,6,6], 
        [6,6,6,6,6,6,6,6,6], 
        [6,6,6,6,6,6,6,6,6], 
        [6,6,6,6,6,6,6,6,6], 
        [6,6,6,6,6,6,6,6,6], 
        [6,6,6,6,6,6,6,6,6] 
      ]);
      assert(board.firstUncertain() === null);
    });
  })

  describe('clone', function () {
    it('clone', function () {
      let board= Board.setBoard([
        [6, , , , , , ,1, ], 
        [4, , , , , , , , ],
        [ ,2, , , , , , , ],
        [ , , , ,5, ,4, ,7],
        [ , ,8, , , ,3, , ],
        [ , ,1, ,9, , , , ],
        [3, , ,4, , ,2, , ],
        [ ,5, ,1, , , , , ],
        [ , , ,8, , , , , ]   
      ]);
      let board2= board.clone();
      assert.deepEqual(board2.rows[0].cells[0].allowedValues, [false, false, false, false, false, true, false, false, false ]);
      board.rows[0].cells[0].set(9)
      assert.deepEqual(board2.rows[0].cells[0].allowedValues, [false, false, false, false, false, true, false, false, false ]);
    });
  })
  
  describe('resolve', function () {
    it('resolve', function () {
      let board= Board.setBoard([
        [6, , ,2,8, ,5,1, ], 
        [4, , , , , , , , ],
        [8,2, ,5, , ,9, , ],
        [9,1,3, ,5, ,4, ,7],
        [ , ,8, , , ,3, , ],
        [ ,4, , ,9,2, , , ],
        [3, , ,4, , ,2, , ],
        [ ,5, , , , , , , ],
        [ , , ,8, ,6, , , ]   
        ]);
      assert.equal(board.rows[2].cells[3], board.columns[3].cells[2]);
      assert.equal(board.rows[2].cells[3], board.quadrants[1].cells[6]);
      const solutions = board.resolve(9);
      assert.equal(solutions.length, 9);
      assert.equal(solutions[0].resolve(9).length, 1)
    });
  });

  describe('resolve', function () {
    it('not resolvable', function () {
      let board= Board.setBoard([
        [6, 6, ,2,8, ,5,1, ], 
        [4, , , , , , , , ],
        [8,2, ,5, , ,9, , ],
        [9,1,3, ,5, ,4, ,7],
        [ , ,8, , , ,3, , ],
        [ ,4, , ,9,2, , , ],
        [3, , ,4, , ,2, , ],
        [ ,5, , , , , , , ],
        [ , , ,8, ,6, , , ]   
        ]);

      assert.equal(board.resolve(9).length, 0);

    });
  });
});