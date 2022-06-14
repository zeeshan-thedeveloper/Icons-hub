import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class ColorPicker extends React.Component {
 constructor({intialColor={},...props}){
    super(props);
    this.handleChange=this.handleChange.bind(this);
    this.handleClickEvent=this.handleClickEvent.bind(this);
    this.handleClose=this.handleClose.bind(this);
    
    this.state={
        displayColorPicker: false,
        color: {
          r: intialColor.r,
          g: intialColor.g,
          b: intialColor.b,
          a: '1',
        },
        setHexColor:props.setHexColor
      };
 }

  

  handleClickEvent = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
    
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
    this.state.setHexColor(color.hex)
  };
 
  render() {
 
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'absolute',
          top: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClickEvent }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

export default ColorPicker