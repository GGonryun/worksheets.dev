# GCLOUD CLI

## Installation

1. Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) for your platform.

## Preparing the bucket for game submissions.

1. We use a general bucket for all game submissions. This bucket is called `game-submissions`. The bucket was created manually using the google cloud console, but adding CORS rules must be done [using the CLI](https://cloud.google.com/storage/docs/using-cors#command-line). To do this, run the following command:

```bash

gcloud storage buckets update gs://game-submissions --cors-file=./gcs_cors.json

```
