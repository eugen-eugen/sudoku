import { Cell } from './Cell'
import * as assert from 'assert';


interface Cluster{
    firstCell: Cell
    count: number
    uncertainty: number
}

/**
 * This class represents a group of cell on sudoku field.
 * 
 * The groups are rows, columns and quadrants. Each group has {@link Group.N} cells.
 */
export class Group{

    /**
     * The side size of the sudoku "little" quadrant
     */
    public static n = 3;
    /**
     * Number of cell in the group. 
     */
    public static N = Group.n * Group.n;

    /**
     * Sets all cells of the group to values an once.
     * 
     * @param values values for setting. The position in {@param values} 
     * corresponds to the position of the cell in the group. 
     * If a value is undefined, the corresponding cell will not be set.
     */
    set(values: (number|undefined)[]) {
        values.forEach((value, i)=>{if (value != undefined) this.cells[i].set(value)});
    }
    /**
     * @returns the string representation of a group.
     */
    toString(): string{
      return this.cells.map(c=>c.toString()).reduce((a,v)=>a+' '+v)
    }

    /**
     * The cells of the group.
     */
    cells: Cell[]=[];

    /**
     * Groups cells with the same allowed values to clusters. 
     * 
     * @returns an object with these fields: 
     *    - clusters is array with all clusters
     *    - cell2cluster is array which points to a cluster 
     */
    cluster(): {clusters: Cluster[]; cell2cluster: Cluster[]}{
        let clusters: Cluster[]=[];
        let cell2cluster = new Array<Cluster>(Group.N);
        
        this.cells.forEach((cell, i)=>{
            // Find an existing cluster for current cell
            var cluster = clusters.find(cluster =>{
                if (cell.equals(cluster.firstCell)){
                    cluster.count++
                    cell2cluster[i] = cluster;
                    return true
                } else{
                    return false
                }
            })
            if (cluster === undefined){
                // If a cluster doesn not yet exist, then create it .
                let newCluster = {firstCell: cell, count: 1, uncertainty: cell.uncertainty()}
                clusters.push(newCluster);
                cell2cluster[i] = newCluster;
            }
        });
        return {clusters, cell2cluster};
    }
    
    /**
     * This is the core functionality of sudoku solving.
     * 
     * If we have a cluster which consists of M cells which allow M values, 
     * then another cells can not have these values.
     * 
     * For example, if we have two cells, which can both only have values  5 and 7. 
     * Then all another cells cannot have 5 and 7.
     * 
     * This method reduce the allowed values in group's cell according to this logic.
     * 
     * @returns true, if some values could be disallowed.
     */
    reduce() : boolean{
        let {clusters, cell2cluster} = this.cluster();
        let reduced = false;
        
        let unresolvable=clusters.find((cluster) => cluster.count > cluster.uncertainty);
        if (unresolvable){
            throw new Error("unresolvable")          
        }
        
        clusters.filter((cluster) => cluster.count === cluster.uncertainty)
           .forEach((cluster, i1) => {
               cell2cluster.forEach((cluster2, i)=>{
                   if (cluster2 != cluster){
                    if (this.cells[i].disallow(cluster.firstCell.allowedValues)){
                        reduced = true;
                    }
                   }
               })
           })

        return reduced;
    }

    /**
     * Created a group.
     * 
     * @param cells the cells of which the group consists. If empty, the cells will be created.
     */
    constructor(cells: Cell[]){
        if (cells.length === 0){
            for (let index = 0; index < Group.N; index++) {
                this.cells.push(new Cell());          
            }
        } else{
            assert (cells.length === Group.N, "The length of the group must be " + Group.N );
            cells.forEach(c=>this.cells.push(c))
        }

    }
}
