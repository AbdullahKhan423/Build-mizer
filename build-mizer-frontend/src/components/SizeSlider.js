import React from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

function SizeSlider(props) {
  const { value, onChange } = props;

  const handleSliderChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <div>
      <Typography id="size-slider" gutterBottom>
        Size
      </Typography>
      <Slider
        value={value}
        min={0}
        max={100}
        step={1}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value} marla`}
        aria-labelledby="size-slider"
      />
    </div>
  );
}

export default SizeSlider;
