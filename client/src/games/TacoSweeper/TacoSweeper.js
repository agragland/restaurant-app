// Adapted from https://medium.com/@learncodefromjohn/how-to-make-minesweeper-with-react-fb4f9b5358da
import React from "react";
import classNames from "classnames"
import "./TacoSweeper.css"

class TacoSweeper extends React.Component {
    constructor(props) {
        super(props);
        let height = 10;
        let width = 10;
        let mines = 10;
        this.state = {
            height: 10,
            width: 10,
            mines: 10,
            cellsClicked: 1,
            board: generateMap(height,width,mines)
        }
    }

    handleCellsClicked() {
        let {height, width, mines, cellsClicked} = this.state;
        let safeCells = height * width - mines;
        this.setState({cellsClicked: cellsClicked + 1})
        if (cellsClicked >= safeCells) alert("***You have won!***")
    }

    render() {
        return (
            <div>
                <table className="sweeper">
                    <tbody className="sweeper">
                    {this.state.board.map((item,row) => {
                        return (
                            <tr key={row} className="sweeper">
                                {item.map((subitem,col) => {
                                    return (
                                        <Cell
                                            key={col}
                                            row={row}
                                            column={col}
                                            value={subitem}
                                            cellsClicked={this.handleCellsClicked.bind(this)}
                                        />
                                    );
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

let endTacoSweeperGame = false;

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {clicked: false, flag: ""};
    }

    render() {
        let {row, column, value} = this.props;
        let {clicked, flag} = this.state;
        let cellsClass = classNames({
            cell: true,
            clicked,
            mine: value === -1
        });
        return (
            <td
                id={`${row}_${column}`}
                className={cellsClass}
                onClick={this.handleClick.bind(this)}
                onContextMenu={this.handleContextMenu.bind(this)}
            >
                {clicked && !flag ? value: ""}
                {flag}
            </td>
        );
    }

    handleContextMenu(e) {
        e.preventDefault();
        let {clicked, flag} = this.state;
        if (!clicked)
            if (flag) {
                this.setState({flag: ""});
            } else {
                this.setState({flag: "⚑"});
                window.navigator.vibrate(200);
            }
    }

    handleClick({target}) {
        let {row, column, cellsClicked, value} = this.props;
        let {clicked, flag} = this.state;
        if (!flag) this.setState({clicked: true});
        if (!clicked) cellsClicked();
        if (!endTacoSweeperGame) {
            // empty cell => recursion click
            if (value === 0 && target.id === `${row}_${column}`)
                recursionClick(target,row,column);
            if (value === -1 && !flag)
                endGame(target);
        }
    }
}

function endGame(target) {
    endTacoSweeperGame = true;
    target.style.backgroundColor = "black";
    let cols = target.parentElement.children.length;
    let rows = target.parentElement.parentElement.children.length;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (document.getElementById(`${i}_${j}`)){
                document.getElementById(`${i}_${j}`).click();
            }
            
        }
    }
}

function recursionClick(target, row, column) {
    target.id = `${row}_${column}_`
    let rowList = [row - 1, row, row + 1]
    let colList = [column - 1, column, column + 1]
    for (let i of rowList) {
        for (let j of colList) {
            setImmediate(() => {
                if (document.getElementById(`${i}_${j}`))
                    document.getElementById(`${i}_${j}`).click();
            });
        }
    }

}

function generateMap(rows, cols, mines) {
    // -1 = mine, 0-8 = number of adjacent mines
    // create array
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(cols).fill(0);
    }
    //fill with mines
    let count = mines;
    while(count>0) {
        let x = Math.floor(Math.random() * cols);
        let y = Math.floor(Math.random() * rows);
        if (arr[y][x] !== -1) {
            arr[y][x] = -1;
            count--;
            // update adjacent cells
            let adj_cells = [[x-1,y-1],[x,y-1],[x+1,y-1],[x-1,y],[x,y],[x+1,y],[x-1,y+1],[x,y+1],[x+1,y+1]]
            for (let adj of adj_cells) {
                let i = adj[1];
                let j = adj[0];
                if (arr[i] && arr[i][j] !== undefined && arr[i][j]!== -1){
                    arr[i][j] += 1;
                }
            }
        }
    }
    return arr;
}

export default TacoSweeper;
