// The package @grpc/grpc-js can also be used instead of grpc here
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const loadOptions = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
}
const packageDefinition = protoLoader.loadSync(
    __dirname + '/calculator.proto',
    loadOptions,
);
const calculatorProto = grpc.loadPackageDefinition(packageDefinition);
// console.log('calculatorProto', calculatorProto)

const healthPackageDef = protoLoader.loadSync(
    __dirname + '/health.proto',
    loadOptions,
);
const healthProto = grpc.loadPackageDefinition(healthPackageDef).grpc.health.v1;
// console.log('healthProto', healthProto)


function calculate(call, callback) {
    const request = call.request;
    let result;
    if (request.operation === 'ADD') {
        result = request.first_operand + request.second_operand;
    } else {
        result = request.first_operand - request.second_operand;
    }
    callback(null, {result});
}

function check(call, callback) {
    const status = 1
    callback(null, {status});
}

function watch(call, callback) {
    // console.log(call)
    // const status = 'SERVING'
    // callback(null, {status});
}

const PORT = process.env.PORT || '8443';
console.log({PORT})

function main() {
    const server = new grpc.Server();
    server.addService(calculatorProto.Calculator.service, {calculate});
    server.addService(healthProto.Health.service, {check, watch});

    server.bindAsync(
        `0.0.0.0:${PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (error, port) => {
            if (error) {
                throw error;
            }
            console.log(`grpc running on: http://localhost:${port}`)
            // server.start();
        });
}

main();