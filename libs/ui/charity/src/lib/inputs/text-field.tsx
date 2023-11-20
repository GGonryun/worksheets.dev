import {
  styled,
  TextField as TextFieldBase,
  TextFieldProps as TextFieldBaseProps,
} from '@mui/material';
import { JSXElementConstructor } from 'react';

export const TextField = styled<JSXElementConstructor<TextFieldBaseProps>>(
  (props) => <TextFieldBase variant="standard" {...props} />
)(({ theme }) => ({}));
