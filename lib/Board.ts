import { Group } from "./Group";
import { Cell } from './Cell';
var faild = 0;
var solutions =0;

/**
 * This class represents the entire sudoku board.
 */
export class Board {

    /**
     * The rows of the board.
     */
    rows : Group[] =  []

    /**
     * The columns of the board.
     */
    columns: Group[] =   []

    /**
     * The quadrants.
     */
    quadrants: Group [] = [];

    toString(): string{
       let ret: string = '';
       return this.rows.map(r=>r.toString()).reduce((ret, v) => {
           return ret + '\n'+ v
        }, ret);
  
    }

     firstUncertain():Cell|null{
        for (let r = 0; r < Group.N; r++){
            for (let c = 0; c < Group.N; c++){
                if (this.rows[r].cells[c].uncertainty() !== 1){
                    return this.rows[r].cells[c];
                }
            }
        }
        return null;
    }

    resolve(max: number = 1): Board[]{
      let reduced = false;
      try{
        do {  
            let rowReduced:    boolean=  this.rows.map(row=>row.reduce()).reduce((reduced, value)=>value || reduced, false);       
            let columnReduced: boolean = this.columns.map(column=>column.reduce()).reduce((reduced,value)=>value || reduced, false);        
            let squaresReduced:boolean = this.quadrants.map(square=>square.reduce()).reduce((reduced,value)=>value || reduced, false);
            reduced = rowReduced || columnReduced || squaresReduced
        } while(reduced)
      }catch(Error){
        return [];
      }

     let uncertain = this.firstUncertain(); 
     if (uncertain){
        if(0==uncertain.uncertainty()){
            // this Board is unresolvable.
            return [];
        }
        let allowedValues = [...uncertain.allowedValues];
        let ret: Board[] = [];
        for (let u = 0; u < allowedValues.length && ret.length < max; u++) {
            if (allowedValues[u]){
                uncertain.set(u+1);
                let newSolutions = this.clone().resolve(max);
                while (newSolutions.length > max - ret.length){
                    newSolutions.pop()
                }
                ret = [...ret, ...newSolutions]
            }
        }
        if (0 == ret.length){
            faild++;
            console.log('failed: '+ faild)
        };
        return ret

     } else{
         console.log('Solution: ', this.toString())
         solutions++;
         console.log('Solutions: '+solutions)
         return [this];
     }
    }


    initColumnsSquares(){
        for (let index = 0; index < Group.N; index++) {
            const col: Cell[]=this.rows.map((row, i)=>this.rows[i].cells[index]);
            this.columns.push(new Group(col));      
        }

        for (let index = 0; index < Group.N; index++) {
            let square: Cell[] = [];
            this.rows.forEach((row, i)=>{
                row.cells.filter((v, j)=>{
                    return Math.floor(i/Group.n)*Group.n + Math.floor(j/Group.n) === index
                }).forEach((cell) => {
                   square.push(cell)
                })
            })
            this.quadrants.push(new Group(square));
        }        
    }

    init(){
        for (let index = 0; index < Group.N; index++) {
            let row: Cell[] = [];
            for (let j = 0; j < Group.N; j++) {
                row.push(new Cell());
            }
            this.rows.push(new Group(row));      
        }
    }

    clone(): Board{
        let board = new Board(); 
        for (let r = 0; r <Group.N; r++) {
            let row:Cell[] = [];
            for (let c = 0; c < Group.N; c++) {
                row.push(this.rows[r].cells[c].clone());
            }
            board.rows.push(new Group(row));
        }  
        board.initColumnsSquares();
        return board;        
    }

    static setBoard(v: (number|undefined)[][]): Board{
        let board = new Board();
        board.init();
        board.initColumnsSquares();
        v.forEach((row, i)=>{
            board.rows[i].set(row);
        })
        return board;
    }


}