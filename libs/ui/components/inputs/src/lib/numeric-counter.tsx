import {
  Add,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  Remove,
} from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { Row } from '@worksheets/ui/components/flex';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';

// TODO: add support for holding down the buttons.
export const NumericCounterField: React.FC<{
  backgroundColor?: string;
  value: number;
  onMin?: () => void;
  onMax?: () => void;
  onChange: (i: number) => void;
}> = ({ backgroundColor = 'transparent', value, onChange, onMin, onMax }) => {
  const isTiny = useMediaQueryDown('mobile1');
  const textFieldStyle = isTiny
    ? { fontSize: 16, paddingTop: 9, paddingBottom: 7 }
    : {
        fontSize: 20,
      };
  const buttonSize = isTiny ? 'small' : 'medium';
  const handleChange = (number: number | string) => {
    const newValue = Number(number);
    if (isNaN(newValue)) {
      return;
    }
    if (newValue < 0) {
      return;
    }
    onChange(newValue);
  };
  return (
    <Row width="100%" justifyContent="center" gap={isTiny ? 1 : 1.25}>
      {onMin && (
        <Button
          variant="square"
          onClick={onMin}
          size={buttonSize}
          color="warning"
        >
          <KeyboardDoubleArrowLeft />
        </Button>
      )}
      <Button
        variant="square"
        onClick={() => handleChange(value - 1)}
        size={buttonSize}
      >
        <Remove />
      </Button>
      <TextField
        size={'small'}
        value={value}
        onFocus={(event) => {
          event.target.select();
        }}
        inputProps={{
          min: 0,
          style: {
            ...textFieldStyle,
            textAlign: 'center',
            fontWeight: 700,
            backgroundColor,
          },
        }}
        onChange={(e) => handleChange(e.target.value)}
        sx={{ width: 100 }}
      />
      <Button
        variant="square"
        onClick={() => handleChange(value + 1)}
        size={buttonSize}
      >
        <Add />
      </Button>
      {onMax && (
        <Button
          variant="square"
          onClick={onMax}
          size={buttonSize}
          color="warning"
        >
          <KeyboardDoubleArrowRight />
        </Button>
      )}
    </Row>
  );
};
