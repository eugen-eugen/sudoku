import { Group } from './Group';
/**
 * This class represents a single cell of a sudoku field.
 * 
 * A cell's model is the set of values, which the cell can yet have.
 * The class have a couple of utility methods which evolve the cell 
 * while sudoku is being be solved. 
 */
export class Cell{
    /**
     * This array represents values the cell can have.
     * 
     * The first element corresponds to the value "1" and so on to "Group.N".
     * "true" at the i. position means that the cell can have the value i.
     * Initially the call can have all possible values.
     */
    allowedValues: boolean[] = [...Array(Group.N)].map(v=>v=true);

    /**
     * @returns the string representation of the cell
     */
    toString(): string{
      if (1 === this.uncertainty()){
          return (this.allowedValues.findIndex(v=>v) + 1).toString()
      } else{
          return '-'
      }
    }

    /**
     * Allows the cell to have only one value.
     * 
     * @param value only value which a cell can have
     */
    set(value: number){
        this.allowedValues.forEach((allowedValue, i)=>{
            this.allowedValues[i] = (i===value-1)
        });
    }

    /**
     * Disallows some values, whicht this cell can have.
     * 
     * @param restricties values, which the cell cannot more have
     */
    disallow(restricties: boolean[]): boolean{
        let ret: boolean = false;
        restricties.forEach((value, i) =>{
            if (value){
              if (this.allowedValues[i]){
                  ret = true;
              }
              this.allowedValues[i] = false;
            }
        })
       return ret;
    }

    /**
     * @param cell another cell
     * @returns true, if this cell and another cell are equivalent
     */
    equals(cell: Cell): boolean{
       let firstUnequal = this.allowedValues.find((v, i)=>cell.allowedValues[i] != v)
       return firstUnequal === undefined 
    }

    /**
     * @returns the number of yet possible values of the cell.
     */
    uncertainty(): number{
        let ret: number=0;
        return this.allowedValues.filter(v=>v).length;
    }

    /**
     * Creates an equivalent copy of the cell.
     * 
     * @returns equivalent copy of the cell
     */
    clone(): Cell{
        let cell = new Cell();
        cell.allowedValues = [...this.allowedValues];
        return cell;
    }
}
