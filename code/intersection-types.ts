export class Grid {
    Width : number = 0;
    Height : number = 0;
    Padding : number;
    constructor(padding:number) {
        this.Padding = padding;
    }
}

export class Margin {
    Left : number = 0;
    Top : number = 0;
    Width : number = 10;
    Height : number = 20;
    Padding?: number;
}

function ConsolidatedGrid(grid : Grid, margin : Margin) : Grid & Margin {
    let consolidatedGrid = <Grid & Margin>{...margin};

    consolidatedGrid.Left = margin.Left;
    consolidatedGrid.Top = margin.Top;
    consolidatedGrid.Width = margin.Width + grid.Width;
    consolidatedGrid.Height = margin.Height + grid.Height;
    consolidatedGrid.Padding = margin.Padding ? margin.Padding : grid.Padding;

    return consolidatedGrid;
}

let grid :Grid = <Grid>{Height:20, Width:10, Padding:5};
let x = ConsolidatedGrid(grid, <Margin>{Left:5,Top:5,Width:5,Height:5});

console.log(`Left : ${x.Left}, Top : ${x.Top}, Width : ${x.Width}, Height : ${x.Height}, Padding : ${x.Padding}`)