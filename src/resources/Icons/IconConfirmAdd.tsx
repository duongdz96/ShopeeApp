import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { InjectedProps, withIcon } from '~/libs/IconDecorator';

const IconConfirmAdd = ({
  width,
  height,
  style,
  fill,
}: InjectedProps): JSX.Element => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox='0 0 20 21'
      fill={fill}
      style={style}>
      <Path
        d='M9 2C5.13438 2 2 5.13438 2 9C2 12.8656 5.13438 16 9 16C12.8656 16 16 12.8656 16 9C16 5.13438 12.8656 2 9 2ZM12.0234 6.71406L8.73281 11.2766C8.68682 11.3408 8.62619 11.3931 8.55595 11.4291C8.48571 11.4652 8.40787 11.4841 8.32891 11.4841C8.24994 11.4841 8.17211 11.4652 8.10186 11.4291C8.03162 11.3931 7.97099 11.3408 7.925 11.2766L5.97656 8.57656C5.91719 8.49375 5.97656 8.37813 6.07812 8.37813H6.81094C6.97031 8.37813 7.12187 8.45469 7.21562 8.58594L8.32812 10.1297L10.7844 6.72344C10.8781 6.59375 11.0281 6.51562 11.1891 6.51562H11.9219C12.0234 6.51562 12.0828 6.63125 12.0234 6.71406Z'
        fill='#52C41A'
      />
    </Svg>
  );
};

export default withIcon(IconConfirmAdd);
