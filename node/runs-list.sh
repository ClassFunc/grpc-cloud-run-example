  GCP_PROJECT=cf-akasach
  GCP_REGION=asia-southeast1

  gcloud run services list \
  --project=${GCP_PROJECT} \
  --region=${GCP_REGION} \
  --platform=managed \
  --format="value(status.address.url)" \
  --filter="metadata.name=grpc-calculator"
