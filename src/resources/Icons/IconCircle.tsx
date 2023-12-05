import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function IconCircle(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <Circle 
      cx="9" 
      cy="9" 
      r="8.5" 
      fill="#FF5F00" 
      stroke="white"
      />
    </Svg>
  );
}

export default IconCircle;
