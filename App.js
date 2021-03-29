import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

import Taco from './src/components/Taco';
import Obstacles from './src/components/obstacles';

export default function App() {
  //get screen width and height
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  const tacoLeft = screenWidth / 2
  const [tacoBottom, setTacoBottom] = useState(screenHeight / 2)
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth + 30)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/3 + 30)
  const [obstaclesLeftThree, setObstaclesLeftThree] = useState(screenWidth + 2*(screenWidth/3) + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0)  
  const [obstaclesNegHeightThree, setObstaclesNegHeightThree] = useState(-Math.random()*100)   
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)

  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 160
  const obstacleWidthTwo = 60
  const obstacleHeightTwo = 300
  const gapTwo = 160
  const obstacleWidthThree = 60
  const obstacleHeightThree = 300
  const gapThree = 160

  let gameTimerId 
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo
  let obstaclesLeftTimerIdThree


  //start taco falling 
  useEffect(() => {
    if(tacoBottom > 0){
      gameTimerId = setInterval(() =>{
        setTacoBottom(tacoBottom => tacoBottom - 3)
      }, 30)

      return()=>{
        clearInterval(gameTimerId)
      }
    }
  }, [tacoBottom])
  console.log(tacoBottom)

  //make taco jump 
  const jump = () => {
    if(!isGameOver && tacoBottom < screenHeight){
      setTacoBottom(tacoBottom => tacoBottom + 50)
    }
  }

//start first obstacle
  useEffect(() => {
    if(obstaclesLeft > -obstacleWidth){
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 4.5)
      }, 30)
      
      return() => {
        clearInterval(obstaclesLeftTimerId)
      }
    } else {
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight(- Math.random() * 100)
      setScore(score => score + 1)
    }  
  }, [obstaclesLeft])

  //start second obstacle
  useEffect(() => {
    if(obstaclesLeftTwo > -obstacleWidth){
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5.25)
      }, 35)
      
      return() => {
        clearInterval(obstaclesLeftTimerIdTwo)
      }
    } else {
      setObstaclesLeftTwo(screenWidth)
      setObstaclesNegHeightTwo(-Math.random()*100)
      setScore(score => score + 1)
    }  
  }, [obstaclesLeftTwo])

  //start third obstacle
  useEffect(() => {
    if(obstaclesLeftThree > -obstacleWidth){
      obstaclesLeftTimerIdThree = setInterval(() => {
        setObstaclesLeftThree(obstaclesLeftThree => obstaclesLeftThree - 4.5)
      }, 30)
      
      return() => {
        clearInterval(obstaclesLeftTimerIdThree)
      }
    } else {
      setObstaclesLeftThree(screenWidth)
      setObstaclesNegHeightThree(-Math.random()*100)
      setScore(score => score + 1)
    }  
  }, [obstaclesLeftThree])

  //check for collisions 
  useEffect(() => {
    if(
      ((tacoBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
      tacoBottom > (obstaclesNegHeight + obstacleHeight + gap - 30)) &&
      (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30)
      )
      ||
      ((tacoBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
      tacoBottom > (obstaclesNegHeightTwo + obstacleHeight + gap - 30)) &&
      (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30)
      ||
      ((tacoBottom < (obstaclesNegHeightThree + obstacleHeight + 30) ||
      tacoBottom > (obstaclesNegHeightThree + obstacleHeight + gap - 30)) &&
      (obstaclesLeftThree > screenWidth/2 -30 && obstaclesLeftThree < screenWidth/2 + 30)
      ))){
      console.log('game over')
      gameOver()
    }
  })

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesLeftTimerId)
    clearInterval(obstaclesLeftTimerIdTwo)
    clearInterval(obstaclesLeftTimerIdThree)
    setIsGameOver(true)
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={jump}>
        <View style={styles.container}>
         
          {isGameOver && <Text style={styles.score}>Score:<br/>{score}</Text>}
          <Taco 
            tacoBottom={tacoBottom}
            tacoLeft={tacoLeft}
          />  
          
          <Obstacles
          color={'#F5853F'}
          obstaclesLeft={obstaclesLeft}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeight}
          gap={gap}
          />
          <Obstacles
          color={'#0091Ad'}
          obstaclesLeft={obstaclesLeftTwo}
          obstacleWidth={obstacleWidthTwo}
          obstacleHeight={obstacleHeightTwo}
          randomBottom={obstaclesNegHeightTwo}
          gap={gapTwo}
          />
          <Obstacles
          color={'#440D0F'}
          obstaclesLeft={obstaclesLeftThree}
          obstacleWidth={obstacleWidthThree}
          obstacleHeight={obstacleHeightThree}
          randomBottom={obstaclesNegHeightThree}
          gap={gapThree}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16324F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontSize: '28px',
    background: '#fff',
  }
})