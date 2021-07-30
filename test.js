const args = require('./easyargs').argHandler;

function main(){

    args.addParameter('p', 'Handles p.', ['pword', 'pfield']);

    args.addFunction('t', (params) => {
        console.log(params['p']);
    }, "Prints out the 'p' parameter.", ['print']);

    args.start((fields) => {
    });

}

main();