# Engine

The engine takes worksheets executes it. An engine is composed of an execution stack, a memory heap, and a register. The execution stack contains sequential information about which processes need to run. A memory heap contains shared data between executions, and a register manages special fields that influence the executions flow or operation of events.

## The Instruction Set

### Params

Places inputs from the execution register into the heap, it does not remove them from the register.

### Assignment

Places data on the heap, each assignment operation may only perform one assignment at a time.

### Assign

Place data on the heap. Accepts a list of key value pairs. Values can be of any type including expressions or other variables on the heap.

### Steps

Execute a sequential set of actions. A step can include instructions: call, try, for, assign, return, break, continue, switch, parallel_for, parallel_steps and steps. The steps instruction will immediately place all of its instructions on the stack. when any step fails a failure is placed in the registry.

### Call

Execute an application from the registry. A call instruction will place its outputs on the heap at the variable name specified by output.

### Restore heap

This instruction takes the original heap as an argument. It creates a cache of all current assigned variable keys. When this instruction executes it takes the current heap and removes all new keys and places assign instructions on the stack. This will retain global variable modified state.

### If

Evaluates code paths based on conditions. An if statement contains list of conditions. Each condition contains a list of steps a predicate that must evaluate to truthy and falsy. If a condition evaluates to true, we will place a restore heap on the stack, the matching steps, and a clone cache.

### Try

React to failures in steps. Creates scope. When the try instruction executes it creates a new scoped context. It adds instructions to the stack: restore heap, steps (optional), catch, steps, clone heap. When a failure is detected the engine will pop instructions off the stack until we reach a catch instruction. Specify a 'finally' parameter to perform an extra set of steps at the end of our try/catch regardless of whether or not an error was handled.

### Catch

Assigns the current registry error, if one exists, into a specified key in the heap and removes the error from the registry. If we pulled an error we also place the handlers set of instructions on the stack. otherwise we continue with the operation.

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

### Parallel For

**Planned v2 release**
Executes multiple for loop iterations in parallel.

### Parallel Steps

**Planned v2 release**
Executes multiple steps at the same time.

### Jump

**Planned v3 release**
Go to another position in the execution flow.

### Copy

**Unofficial Instruction**
Copies information across different locations in memory. Useful if you need to copy or create temporary data.

### Evaluate

**Unofficial Instruction**
Places an expression evaluation on the stack, this lets us process the expression as if it was an instruction which also allows us to handle it's exceptions.
