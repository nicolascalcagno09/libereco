export interface PositionSorterMatrix {
    row: number;
    col:number;
  }


export async function reshapeSorterMatrix(rows, cols) {
    let result = [];
    var arrays = Array(rows * cols).fill(0).map((e, i) => i + 1);

    var copy = arrays // Copy all elements.

    for (var r = 0; r < rows; r++) {
        var row = [];
        for (var c = 0; c < cols; c++) {
            var i = r * cols + c;
            if (i < copy.length) {
                row.push(copy[i]);
            }
        }
        result.push(row);
    }

    return result;
}

export async function returnPositionSorterMatrix(rows, cols,position:PositionSorterMatrix) {
    let result = await reshapeSorterMatrix(rows,cols);
    console.log('result',result)
    if (position.row <= rows && position.col <= cols){
     return result[position.row-1][position.col-1];
    }
    return 0;       
}

