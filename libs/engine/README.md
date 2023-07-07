# Schema

See syntax guide [on doc-site](https://docs.worksheets.dev/docs/syntax-guide)

# Engine

The engine takes worksheets executes it. An engine is composed of an execution stack, a memory heap, and a register. The execution stack contains sequential information about which processes need to run. A memory heap contains shared data between executions, and a register manages special fields that influence the executions flow or operation of events.

## The Instruction Set

### Params

Places inputs from the execution register into the heap, it does not remove them from the register.

### Assignment

Places data on the heap, each assignment operation may only perform one assignment at a time.

### Assign

Place data on the heap. Accepts a list oåf key value pairs. Values can be of any type including expressions or other variables on the heap.

### Steps

Execute a sequential set of actions. A step can include instructions: call, try, for, assign, return, break, continue, switch, parallel_for, parallel_steps and steps. The steps instruction will immediately place all of its instructions on the stack. when any step fails a failure is placed in the registry.

### Call

Execute an application from the registry. A call instruction will place its outputs on the heap at the variable name specified by output.

### Create Scope

This will create a new "scope" or heap. Whenever we attempt to place data in memory if keys are not found in first heap they are placed into the newly created scope. When scope is destroyed only the outermost layer of keys should be removed.

Scope grows and shrinks like a stack. But we always iterate Scope starting with the oldest.

We can also create private scope. Private scope is used to define a separate layer of memory that only the upcoming function should have access too. If we need to transfer data through memory heaps we can use a register or a Copy (todo) instruction.

### Restore Scope

Removes the outermost layer of scope or throws an error if we try to delete the primary layer of scope.

### Pull Register

Pulls data out of the register and into memory and clears it from the register.

### Push Register

Pushes data into the register from an address in the currently memory.

### If

Evaluates code paths based on conditions. An if statement contains list of conditions. Each condition contains a list of steps a predicate that must evaluate to truthy and falsy. If a condition evaluates to true, we will place a restore heap on the stack, the matching steps, and a clone cache.

### Try

React to failures in steps. Creates scope. When the try instruction executes it creates a new scoped context. It adds instructions to the stack: restore heap, steps (optional), catch, steps, clone heap. When a failure is detected the engine will pop instructions off the stack until we reach a catch instruction. Specify a 'finally' parameter to perform an extra set of steps at the end of our try/catch regardless of whether or not an error was handled.

### Catch

Assigns the current registry error, if one exists, into a specified key in the heap and removes the error from the registry. If we pulled an error we also place the handlers set of instructions on the stack. otherwise we continue with the operation.

### Finally

A parameter of `try`, allows you to perform an action after a try-catch block. Catch must be specified.

### Retry

Used in conjunction with a `try` instruction to reattempt earlier steps if a failure is encountered. Incompatible with `catch` and `finally`.

### For

Iterate over lists or maps. Creates scope. When the instruction is initialized we create 3 instructions, restore heap, loop, and clone heap.

### Loop

maintains a reference to the current list we are iterating. checks to see if there are elements left and places a steps instruction on the stack. if there are no elements the loop terminates. a loop is commonly used with control structures such as break, continue, or loop.

### Break

Pops instructions off the stack until we reach the for loop and removes the forloop too. effectively terminating it. if this instruction is used outside of a forloop it will continue popping instructions until it destroys a restore heap instruction.

### Continue

Pops instructions off the stack until we reach the forloop and will continue without removing the for loop off the stack. if used outside of a forloop we will pop instructions off the stack until we see that a "Restore Heap" instruction is next.

### Return

Takes data from the heap and places it in the registries output position and pops all instructions off the stack.

### Jump

Jump to a named step during execution. Currently only accepts 'halt' operations.

### Log

Saves data to using the task's logger to the execution console.

### Wait

Delays execution until the duration is complete calculates a timestamp from a millisecond input

### Delay

The Delay instruction is used in conjunction with the "wait" instruction to help pause until the set timestamp has expired. The delay instruction will place short pauses on the engine's stack.

### Worksheet

Executes another worksheet defined as a subworksheet.

### Branch

### Copy

**Unofficial Instruction**
Copies information across different locations in memory. Useful if you need to copy or create temporary data.

### Evaluate

**Unofficial Instruction**
Places an expression evaluation on the stack, this lets us process the expression as if it was an instruction which also allows us to handle it's exceptions.
