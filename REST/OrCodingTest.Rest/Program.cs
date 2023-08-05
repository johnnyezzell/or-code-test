using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using OrCodingTest.Rest.Entities;
using OrCodingTest.Rest.Utilities;
using OrCodingTest.Rest.Repositories;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;
var env = builder.Environment;

services.AddSingleton<DataContext>();
services.AddCors();
services.AddSwaggerGen();

services.AddControllers().AddJsonOptions(x =>
{
    x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    x.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

// Add repositories

services.AddScoped<IRepository<Address>, AddressRepository>();
services.AddScoped<IRepository<Customer>, CustomerRepository>();

var app = builder.Build();

// Create the database if it doesn't exist
using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<DataContext>();

await context.Init();

app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseMiddleware<ErrorHandlerMiddleware>();

app.MapControllers();

if (env.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Run("https://localhost:8080");