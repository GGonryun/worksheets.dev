---
sidebar_position: 4
---

# Syntax Guide

## Single Function Execution

```yaml
version: 1
name: worksheet_name

input: param_name

assign:
  #   key: value
  - param_a: ${sys.time.now()}
  - param_b: ${env("my_auth_token")}
  - param_c: value

steps:
  # save values into memory
  - assign:
    #   key: value
    - param_d: the current time is ${param_a}!

  # execute external methods or libraries
  - call: module.function.path
    input:
      # key: value
      key_a: ${param_a}
      key_b: ${param_b}
      ...
    output: param_g

  # make decisions with expressions
  - switch:
    - if: ${expression} # expects a single expression: ${a == b}
      steps:
          ...
    - if: ${expression}
      # terminate early.
      next: continue | break | end
    - if: ${expression}
      return: ${param_name}

  # operate on arrays, lists and maps (iterables).
  - for: list_variable_name
    value: value_variable_name # value stored during iteration
    index: index_variable_name
    steps:
      # execute instructions for each value in list.
        ...

  # handle operations safely
  - try:
      steps:
          ...
    catch:
      # reference assigned error with ${error_name}
      assign: error_name
      steps:
          ...
    finally:
      steps:
          ...

  # retry operations (not compatible with catch/finally)
  - try:
      steps:
          ...
    retry:
      # reference assigned error with ${error_name}
      assign: e # defaults to 'error'
      if: ${e.code === 429} # evaluate any expression
      attempts: 5 # number of extra retries to perform
      delay: ${5 * 1000} # starting delay in ms
      limit: ${60 * 1000} # 60 seconds max delay in between retries
      multiplier: 2 # every attempt double the starting delay.

  # execute other worksheets synchronously waits for the task to complete.
  - worksheet: my_sub_worksheet_id
    input: ${x/y} # accepts references or static variables
    output: data # address to store output
  # save a task for later processing
  - jump: halt

  # save and log data
  - log:
      level: trace | debug | info | warn | error | fatal
      message: string message of text
      data: # unstructured data gets saved as json object.
        anything: ${goes}
  # shortcut syntax
  - log: 400
  - log: 429

  # delay execution for up to 5 minutes per instruction.
  - wait: 500 # milliseconds

return:
  - param_i: "assigning this text as a value"
  - param_h: ${param_g} # reference outputs
  - param_j: 24
```

## Multi Function Execution

```yaml
name: my worksheet name
version: 1

# must specify a main function
main:
  input: data
  steps:
    - worksheet: multiply_by_three
      input: ${data}
      output: result
  output: ${result}

multiply_by_three:
  input: x
  output: ${x * 3}
```
