# Uploading Games to Charity Games

## Manual Upload

### The CDN

Static IP assigned for CDN 34.110.239.165

URL: https://console.cloud.google.com/networking/addresses/list?project=charity-games

### The Google cloud Bucket

The bucket is public and holds all the static files for our public games:

https://console.cloud.google.com/storage/browser?hl=en&project=charity-games&prefix=&forceOnObjectsSortingFiltering=false&forceOnBucketsSortingFiltering=true

### Logging

A useful query for finding logs for the load balancer:

```
https://console.cloud.google.com/logs/query;query=--Hide%20similar%20entries%0A-%2528-labels.logLabel:*%0A-labels.activity_type_name:*%0Aseverity%3D%22INFO%22%0AhttpRequest.status%3D%22200%22%0A-jsonPayload.response_code:*%0A-jsonPayload.referer:*%0A-jsonPayload.path:*%0A-jsonPayload.name:*%0A-jsonPayload.code:*%0AjsonPayload:*%0A-jsonPayload.message:*%2529%0A--End%20of%20hide%20similar%20entries%0Aresource.type%3D%22http_load_balancer%22;cursorTimestamp=2023-12-10T20:06:19.572914Z;duration=PT1H?project=charity-games
```
