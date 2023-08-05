namespace OrCodingTest.Rest.Utilities;

using System.Data;
using Dapper;
using Microsoft.Data.Sqlite;

public class DataContext
{
    protected readonly IConfiguration Configuration;

    public DataContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IDbConnection CreateConnection()
    {
        return new SqliteConnection(Configuration.GetConnectionString("TestConnectionString"));
    }

    public async Task Init()
    {
        // create database tables if they don't exist
        using var connection = CreateConnection();

        async Task _initCustomerTable()
        {
            var sql = """
                CREATE TABLE IF NOT EXISTS 
                Customer (
                    Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    FirstName TEXT,
                    LastName TEXT
                );
            """;
            await connection.ExecuteAsync(sql);
        }

        async Task _initAddressTable()
        {
            var sql = """
                CREATE TABLE IF NOT EXISTS
                Address (
                    Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    StreetAddress TEXT,
                    City TEXT,
                    State TEXT,
                    Zip TEXT,
                    CustomerId INTEGER,
                    FOREIGN KEY(CustomerId) REFERENCES Customer(Id)
                )
            """;
            await connection.ExecuteAsync(sql);
        }

        async Task _initOfficeTable()
        {
            var sql = """
                CREATE TABLE IF NOT EXISTS
                Office (
                    Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    Name TEXT                )
            """;
            await connection.ExecuteAsync(sql);
        }        

        async Task _initCustomerOfficeTable()
        {
            var sql = """
                CREATE TABLE IF NOT EXISTS
                CustomerOffice (
                    Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    OfficeId INTEGER,
                    CustomerId INTEGER,
                    FOREIGN KEY(OfficeId) REFERENCES Office(Id),
                    FOREIGN KEY(CustomerId) REFERENCES Customer(Id)
                )
            """;
            await connection.ExecuteAsync(sql);            
        }

        await _initAddressTable();
        await _initCustomerTable();
        await _initOfficeTable();
        await _initCustomerOfficeTable();
    }
}
 