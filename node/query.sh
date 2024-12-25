TOKEN=$(gcloud auth print-identity-token)

HOST_PORT=grpc-test-lcpia55i5q-as.a.run.app:443
#HOST_PORT=localhost:8443

# check http/2
#curl -i --http2-prior-knowledge https://$HOST_PORT

grpcurl \
    -proto calculator.proto \
    -d '{"first_operand": 0.1, "second_operand": 0.2, "operation": "SUBTRACT"}' \
    --plaintext $HOST_PORT \
    Calculator.Calculate \

#grpcurl \
#    -d '{"service": "abc"}' \
#    --plaintext \
#    -proto health.proto \
#    $HOST_PORT \
#    grpc.health.v1.Health.Check

