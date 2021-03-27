import React from 'react'
import { View } from 'react-native'

const Obstacles = ({color, obstaclesLeft, obstacleWidth, obstacleHeight, randomBottom, gap}) => {

    return(
        <>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom + obstacleHeight + gap,
            }} />

            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom,
            }} />
        </>
    )
}

export default Obstacles