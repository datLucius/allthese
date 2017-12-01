import React from 'react';
import Pack from './Pack';

const Grid = props => (
  <div>{
      props.items.length
      ? props.items.map(item => <Pack item={item} key={item.id} />)
      : <div />
    }
  </div>
  );

export default Grid;
