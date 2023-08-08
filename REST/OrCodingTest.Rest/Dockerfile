#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["OrCodingTest.Rest/OrCodingTest.Rest.csproj", "OrCodingTest.Rest/"]
RUN dotnet restore "OrCodingTest.Rest/OrCodingTest.Rest.csproj"
COPY . .
WORKDIR "/src/OrCodingTest.Rest"
RUN dotnet build "OrCodingTest.Rest.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "OrCodingTest.Rest.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "OrCodingTest.Rest.dll"]
