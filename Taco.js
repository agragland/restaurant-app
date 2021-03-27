import React from 'react';
import { View } from 'react-native';

import taco from '../_img/tacoSprite.png'

const Taco = ({tacoBottom, tacoLeft}) => {
  const tacoWidth = 120
  const tacoHeight = 140

  return(
    <View style={{ position: 'absolute',
      backgroundColor: 'transparent',
      width: tacoWidth,
      height: tacoHeight,
      left: tacoLeft - (tacoWidth/2),
      bottom: tacoBottom - (tacoHeight/2),
    }}>
      <img src={taco} />
    </View>
    
  )
}

export default Taco;