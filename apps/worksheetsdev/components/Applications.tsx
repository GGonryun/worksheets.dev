import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { Box, SvgIconTypeMap, Typography } from '@mui/material';
import {
  MethodSummary,
  OfficialApplicationLibrary,
} from '@worksheets/apps/library';
import { GraphNode } from '@worksheets/util-data-structures';
import { v4 as uuidv4 } from 'uuid';
import DataArrayIcon from '@mui/icons-material/DataArray';
import { JsonSchema7Type } from 'zod-to-json-schema/src/parseDef';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import NumbersIcon from '@mui/icons-material/Numbers';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DataObjectIcon from '@mui/icons-material/DataObject';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { JsonSchema7ArrayType } from 'zod-to-json-schema/src/parsers/array';
import { JsonSchema7StringType } from 'zod-to-json-schema/src/parsers/string';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { JsonSchema7NumberType } from 'zod-to-json-schema/src/parsers/number';
import { JsonSchema7ObjectType } from 'zod-to-json-schema/src/parsers/object';
import { JsonSchema7EnumType } from 'zod-to-json-schema/src/parsers/enum';
import KeyIcon from '@mui/icons-material/Key';
import { JsonSchema7BooleanType } from 'zod-to-json-schema/src/parsers/boolean';
import FolderIcon from '@mui/icons-material/FolderOutlined';
import TaskIcon from '@mui/icons-material/TaskOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Applications() {
  const library = new OfficialApplicationLibrary();
  const tree = library.tree();
  const values = tree.root.children.values();
  return (
    <Box>
      <Typography variant="h6">Applications</Typography>
      <TreeView
        aria-label="worksheets navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ flexGrow: 1, width: 240, overflowY: 'auto' }}
      >
        {Array.from(values).map((node, i) => {
          return <NodeTreeItem key={i} node={node} />;
        })}
      </TreeView>
    </Box>
  );
}

function NodeTreeItem(props: { node: GraphNode<MethodSummary> }) {
  const { key, value, children } = props.node;
  const nodes = Array.from(children.values());
  return (
    <TreeItem
      label={
        <Box display="flex" alignItems="center" gap={1}>
          {nodes.length ? (
            <FolderIcon fontSize="small" />
          ) : (
            <TaskIcon fontSize="small" />
          )}
          {key}
        </Box>
      }
      nodeId={uuidv4()}
    >
      {nodes.map((n, i) => (
        <NodeTreeItem node={n} key={i} />
      ))}
      <DisplayMethodSummary {...value} />
    </TreeItem>
  );
}

function DisplayMethodSummary({
  path,
  label,
  description,
  input,
  output,
}: MethodSummary) {
  return (
    <Box>
      {label && (input || output) && (
        <TreeItem
          style={{ fontSize: 12 }}
          nodeId={uuidv4()}
          label={
            <Box display="flex" alignItems="center" gap={1}>
              <InfoOutlinedIcon fontSize={'small'} />
              details
            </Box>
          }
        >
          Label: {label} <br />
          Usage: `call: {path}` <br />
          Description {description}
        </TreeItem>
      )}
      <DataTypeDescription {...input} label="input" />
      <DataTypeDescription {...output} label="output" />
    </Box>
  );
}

type MaterialIcon = OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & {
  muiName: string;
};

function DataTypeDescription(props: JsonSchema7Type & { label?: string }) {
  function Label(innerProps: { Icon: MaterialIcon; type: string }) {
    return (
      <Box display="flex" alignItems={'center'} gap={1}>
        <innerProps.Icon fontSize="small" />
        {innerProps.type}
      </Box>
    );
  }

  if (isBooleanType(props)) {
    return (
      <TreeItem
        nodeId={uuidv4()}
        label={<Label Icon={CheckBoxIcon} type={props.label ?? 'boolean'} />}
      ></TreeItem>
    );
  }

  if (isNumberType(props)) {
    return (
      <TreeItem
        nodeId={uuidv4()}
        label={<Label Icon={NumbersIcon} type={props.label ?? 'number'} />}
      ></TreeItem>
    );
  }

  if (isStringType(props)) {
    return (
      <TreeItem
        nodeId={uuidv4()}
        label={<Label Icon={FormatQuoteIcon} type={props.label ?? 'string'} />}
      >
        {isEnumType(props) &&
          props.enum.map((e, i) => (
            <TreeItem
              key={i}
              nodeId={uuidv4()}
              label={<Label Icon={KeyIcon} type={`key: '${e}'`} />}
            />
          ))}
      </TreeItem>
    );
  }

  if (isArrayType(props)) {
    return (
      <TreeItem
        nodeId={uuidv4()}
        label={<Label Icon={DataArrayIcon} type={props.label ?? 'array'} />}
      >
        <DataTypeDescription {...props.items} label={''} />
      </TreeItem>
    );
  }

  if (isObjectType(props)) {
    return (
      <TreeItem
        nodeId={uuidv4()}
        label={<Label Icon={DataObjectIcon} type={props?.label ?? 'object'} />}
      >
        {props?.properties &&
          Object.keys(props.properties).map((key, i) => (
            <DataTypeDescription
              key={i}
              {...props.properties[key]}
              label={key}
            />
          ))}
      </TreeItem>
    );
  }

  if (props.label == 'input' || props.label == 'output') {
    return null;
  }

  return (
    <TreeItem
      nodeId={uuidv4()}
      label={<Label Icon={QuestionMarkIcon} type={'unknown'} />}
    >
      unknown schema: {JSON.stringify(props)}
    </TreeItem>
  );
}

function isArrayType(schema: JsonSchema7Type): schema is JsonSchema7ArrayType {
  return 'type' in schema && schema.type == 'array';
}

function isEnumType(schema: JsonSchema7Type): schema is JsonSchema7EnumType {
  return 'type' in schema && 'enum' in schema && schema.type == 'string';
}

function isStringType(
  schema: JsonSchema7Type
): schema is JsonSchema7StringType {
  return 'type' in schema && schema.type == 'string';
}

function isNumberType(
  schema: JsonSchema7Type
): schema is JsonSchema7NumberType {
  return (
    'type' in schema && (schema.type == 'number' || schema.type === 'integer')
  );
}

function isObjectType(
  schema: JsonSchema7Type
): schema is JsonSchema7ObjectType {
  return 'type' in schema && schema.type === 'object';
}

function isBooleanType(
  schema: JsonSchema7Type
): schema is JsonSchema7BooleanType {
  return 'type' in schema && schema.type === 'boolean';
}
