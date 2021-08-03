# EasyArguments
An easy to use command-line argument template tool.

## Installation
```
npm install easyarguments
```
Then in your ```.js``` file:
```
const args = require('easyarguments').argHandler;
```

## Usage
To use EasyArguments, you can either add functions or parameters respectively:
```
args.addFunction({LETTERCODE}, (params) => {
    ...
}, {DESCRIPTION OF FUNCTION}, [{ALIAS1}, {ALIAS2}, ...]);
```
An example of a function that simply prints the '-p' paramters value is:
```
args.addFunction('t', (params) => {
    console.log(params['p']);
}, "Prints out the 'p' parameter.", ['print']);
```

```
args.addParameter({LETTER CODE}, {DESCRIPTION}, [{ALIAS1}, {ALIAS2}, ...]);
```
An example:
```
args.addParameter('p', 'Handles p.', ['pword', 'pfield']);
```

And finally if you wish to not use functions as entry points you can use:
```
args.start((fields) => {
    ...
});
```
This will run a callback function with a dictionary of parameters using their letter codes as a parameter.
Ex.
```
args.addParameter('p', 'Handles p.', ['pword', 'pfield']);
args.addParameter('f', 'Handles f.', []);

args.start((fields) => {
    console.log(fields);
});
```
Run:
```
node test.js --pword=hello -f -d=false
```
Result:
```
{ p: 'hello', f: true }
```
Because d is not defined it will not retain that information. This allows for very clean user input.