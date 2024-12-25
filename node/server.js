// The package @grpc/grpc-js can also be used instead of grpc here
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    __dirname + '/calculator.proto',
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const calculatorProto = grpc.loadPackageDefinition(packageDefinition);

const PORT = process.env.PORT || '50051';

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

function main() {
    const server = new grpc.Server();
    server.addService(calculatorProto.Calculator.service, {calculate});
    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
        if (error) {
            throw error;
        }
        console.log(`grpc running on: http://localhost:${port}`)
        // server.start();
    });
}

main();