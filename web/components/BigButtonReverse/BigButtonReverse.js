import React from 'react';
import Button from '@mui/material/Button';
import './bigButton.css'

export default function ReverseBigButton(props) {
    return (
        <Button className='reverseBigButton' sx={props.sx} style={props.style} variant="outlined">Outlined</Button>
    );
  }