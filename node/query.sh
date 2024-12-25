PORT=50051

grpcurl \
    -d '{"first_operand": 0.1, "second_operand": 0.2, "operation": "ADD"}' \
    --plaintext \
    -proto calculator.proto \
    localhost:$PORT \
    Calculator.Calculate