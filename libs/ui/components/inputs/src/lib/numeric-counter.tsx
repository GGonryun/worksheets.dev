import { Add, Remove } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { Row } from '@worksheets/ui/components/flex';

// TODO: add support for holding down the buttons.
export const NumericCounterField: React.FC<{
  value: number;
  onChange: (i: number) => void;
}> = ({ value, onChange }) => {
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
    <Row width="100%" justifyContent="center" gap={1.5}>
      <Button variant="square" onClick={() => handleChange(value - 1)}>
        <Remove />
      </Button>
      <TextField
        size="small"
        value={value}
        onFocus={(event) => {
          event.target.select();
        }}
        inputProps={{
          min: 0,
          style: { textAlign: 'center', fontWeight: 700, fontSize: 20 },
        }}
        onChange={(e) => handleChange(e.target.value)}
        sx={{ width: 100 }}
      />
      <Button variant="square" onClick={() => handleChange(value + 1)}>
        <Add />
      </Button>
    </Row>
  );
};
