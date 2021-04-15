import React, {Component} from 'react';
import Snake from './Snake';
import Food from './Food';

import './TacoSnek.css'

const getRandomCoords = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    return [x, y]
}

const initalState = {
    food: getRandomCoords(),
    speed: 500,
    direction: 'RIGHT',
    snakeDots: [
        [0, 0],
        [2, 0]
    ]
}

class TacoSnek extends Component {

    state = initalState;

    componentDidMount() {
        setInterval(this.moveSnake, this.state.speed); //Moves the snake every 500 milliseconds
        document.onkeydown = this.onKeyDown;
    }

    componentDidUpdate() {
        this.checkIfOutOfBorders();
        this.checkIfSnakeHitsSelf();
        this.checkIfEatFood();
    }

    onKeyDown = (e) => {
        e = e || window.event;
        switch (e.keyCode) {
            case 38:
                this.setState({direction: 'UP'});
                break;
            case 40:
                this.setState({direction: 'DOWN'});
                break;
            case 37:
                this.setState({direction: 'LEFT'});
                break;
            case 39:
                this.setState({direction: 'RIGHT'});
                break;
        }
    }
    moveSnake = () => {
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length-1];
        switch (this.state.direction) {
            case 'RIGHT':
                head = [head[0] + 2, head[1]];
                break;
            case 'LEFT':
                head = [head[0] - 2, head[1]];
                break;
            case 'DOWN':
                head = [head[0], head[1] + 2];
                break;
            case 'UP':
                head = [head[0], head[1] - 2];
                break;
        }
        dots.push(head); //Adds head
        dots.shift(); //Removes tail
        this.setState({
            snakeDots: dots
        })
    }
    checkIfOutOfBorders() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
            this.onGameOver();
        }
    }
    checkIfSnakeHitsSelf() {
        let snake = [...this.state.snakeDots];
        let head = snake[snake.length-1];
        snake.pop();
        snake.forEach(dot => {
            if(head[0] == dot[0] && head[1] == dot[1]) {
                this.onGameOver();
            }
        })
    }
    checkIfEatFood() {
        let head = this.state.snakeDots[this.state.snakeDots.length-1];
        let food = this.state.food;
        if(head[0] == food[0] && head[1] == food[1]) {
            this.setState({
                food: getRandomCoords()
            })
            this.enlargeSnake();
            this.increaseSpeed();
        }
    }
    enlargeSnake() {
        let newSnake = [...this.state.snakeDots];
        newSnake.unshift([])
        this.setState({
            snakeDots: newSnake
        })
    }
    increaseSpeed() {
        if(this.state.speed > 10) {
            this.setState({
                speed: this.state.speed - 10
            })
        }
    }
    onGameOver() {
        alert(`Game Over. Score is ${this.state.snakeDots.length-2}`);
        this.setState(initalState);
    }

    render() {
        return (
            <div className="game-area">
                <Snake snakeDots={this.state.snakeDots}/>
                <Food dot={this.state.food}/>
            </div>
        );
    }
}

export default TacoSnek;
