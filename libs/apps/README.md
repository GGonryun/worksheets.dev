# Creating new applications

1. Create your application in the registry. Describe the application and it's method inputs and outputs.
   - The registry package contains the application registry and the application framework.
2. Typescript compiler should warn you about missing data in the sample-data, metadata, fetcher, handlers packages.
3. The sample data package should contain all the information required to test your application, it also populates our documentation.
4. The metadata package should contain all the information required to render the application in the UI and for pricing.
5. The fetcher package is type-proxy for our typescript SDK.
6. The handlers package contains the logic for the actual application method handlers.
