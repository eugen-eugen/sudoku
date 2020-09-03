# Sudoku Resolving Library
This library can be used for solving "Sudoku" quizzes.

## Quick Start

```javascript
// Get up to 10 solutions of a sudoku
import {Boad} fron 'sudoku';

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
let solutions = board.resolve(10)      
console.log(solutions.toString());
``` 