
import React from '../../../../node_modules/react';
import PropTypes from '../../../../node_modules/prop-types';
import './CheckBox.css';


export const CheckBox=({type= 'checkbox',description,checked=false,onChange})=>{
  return(
<label>
  {description}
  <input type="checkbox" 
          className="check-custom" 
          name={description} 
          checked={checked} 
          value={description} 
          onChange={e=>onChange(e)}
    />
  <span className="check-toggle"></span>
</label>
  )
}


CheckBox.propTypes = {
  type: PropTypes.string,
  description: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

