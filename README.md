# OR Test Application
## Notes
After making this there are a few things I would have done differently.

I thought it would take more time to do the angular routing child routes, but if I did this again, I would have used that instead. Not only would I get the ability to hit the back button etc, but I think the code would have been cleaner. I'm going to update it later to be this way.

 

## Dependencies
- Install .NET 7 SDK
- Install Node 19.4.0

## Getting Ready

1. Clone this repository
2. Navigate to the Client directory
3. Execute 'npm install'
4. Navigate to the REST directory
5. Execute 'dotnet restore rest.sln'
6. Execute 'dotnet build rest.sln'

## Executing Tests

### Angular Tests
1. In the Client directory, execute 'npm run test'

### REST Tests
2. In the REST directory, execute 'dotnet test rest.sln'

## Trying the Application

### REST Service

1. Navigate to the REST/OrCodingTest.Rest directory
2. Execute 'dotnet run'
3. Navigate to https://localhost:8080/swagger in your browser to see the OpenApi page
4. Try creating a Customer and Address in the swagger, you'll have to create the Customer first

### Angular Client

1. Naviate to the Client directory
2. Execute 'npm start'
3. Navigate to http://localhost:4200
