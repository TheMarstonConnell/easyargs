const TYPE_FUNCTION = 1;
const TYPE_VAR = 2;

let argumentHandler = {
    arguments: {},
    raw_arguments: [],
    addFunction: function (letterCode, func, description = "", aliases = []) {
        let arg = { func: func, type: TYPE_FUNCTION, description: description, code: letterCode, aliases: aliases };
        this.arguments[letterCode] = arg;
        this.raw_arguments.push(arg);
        for (const i of aliases) {
            this.arguments[i] = arg;
        }
    },
    addParameter: function (letterCode, description = "", aliases = []) {
        let arg = { type: TYPE_VAR, description: description, code: letterCode, aliases: aliases };
        this.arguments[letterCode] = arg;
        for (const i of aliases) {
            this.arguments[i] = arg;
        }
    },
    manual: function () {
        console.log(`USAGE: node <filename> [options]`);
        for (const arg of argumentHandler.raw_arguments) {

            
                let s = ""; 
                
                for (const i of arg.aliases) {
                    s = s + "--" + i + ", ";
                }
                s = s.substring(0, s.length - 2);            

            console.log(`\t> -${arg.code}: ${arg.description} (also: ${s})`);

        }
    },
    start: function (callback) {
        let argv = require('minimist')(process.argv.slice(2));

        this.addFunction('h', this.manual, "Shows this help menu.", ['help', 'manual']);

        let data = {};
        let keys = Object.keys(this.arguments);
        for (const key of keys) {
            if (argv[key]) {
                let arg = this.arguments[key];
                if (arg.type == TYPE_VAR) {
                    data[arg.code] = argv[key];
                }
            }
        }


        for (const key of keys) {
            if (argv[key]) {
                let arg = this.arguments[key];

                if (arg.type == TYPE_FUNCTION) {
                    this.arguments[key].func(data);
                    break;
                }
            }
        }

        callback(data);
    }

};

exports.argHandler = argumentHandler;