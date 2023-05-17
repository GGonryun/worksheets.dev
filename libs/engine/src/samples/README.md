### Schema v1.0

```yaml
version: v1.0
name: worksheet
# assign sensitive fields from outside
environment:
  param_name: value_of_any_type

# worksheet input.
input:
  param_name:
    type: string
    default: default_value

# assign values.
assign:
  param_name: value_of_any_type

# executable steps
steps:
  - step_name:
    assign:
      param_name: value_of_any_type
  - step_name:
    call: <folder>.<app>.<method>
    input:
      name_one: {{param_name_1}}
      name_two: {{step_name_1.param_name_3}}
      ...
    output: OUTPUT_VARIABLE

# worksheet output
output:
  param_name_1:
    type: string
    default: default_value
  param_name_2: direct_assignment
```

### Schema v2.0

```yaml
version: v2.0
name: worksheet
# assign sensitive fields from outside
environment:
  param_name: value_of_any_type

# worksheet input.
input:
  param_name:
    type: string
    default: default_value

# assign values.
assign:
  param_name: value_of_any_type

# executable steps (tasks maximum execution time is 10 seconds)
steps:
  - step_name:
    assign:
      param_name: value_of_any_type
  - step_name:
    for:
      value: LOOP_VARIABLE_NAME
      index: INDEX_VARIABLE_NAME
      in: ${LIST_EXPRESSION}      # or simply in: LIST_DEFINITION
      steps:
        - STEP_NAME:
        - STEP_NAME:
  - step_name:
    wait: 5000 # ms
  - step_name:
    raise: 'error name'
  - step_name:
    try:
      steps:
    catch:
      steps:
      retry:
        ${core.retry.default} # a function definition that takes (error, code, attempts) => ms to wait before retrying, if 0 do not retry.
  - step_name:
    switch:
      - case: ${EXPRESSION}
        steps:
          - STEP_NAME:
          - STEP_NAME:
        next: STEP_NAME
      - case: ${EXPRESSION}
        steps:
          - STEP_NAME:
          - STEP_NAME:
        next: STEP_NAME
    next: DEFAULT_STEP_NAME
  - step_name:
    call: <folder>.<app>.<method>
    input:
      name_one: {{param_name_1}}
      name_two: {{step_name_1.param_name_3}}
      ...
    output: OUTPUT_VARIABLE

# worksheet output
output:
  param_name_1:
    type: string
    default: default_value
  param_name_2: direct_assignment
```
