PROJECT=cf-akasach
REGION=asia-southeast1

# Get Cloud Run URL
ENDPOINT=$(\
  gcloud run services list \
  --project=${PROJECT} \
  --region=${REGION} \
  --platform=managed \
  --format="value(status.address.url)" \
  --filter="metadata.name=grpc-test")
ENDPOINT=${ENDPOINT#https://} && echo ${ENDPOINT}