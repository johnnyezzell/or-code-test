namespace OrCodingTest.Rest.Repositories;

using Dapper;
using Microsoft.Data.Sqlite;
using OrCodingTest.Rest.Entities;
using OrCodingTest.Rest.Utilities;

public class AddressRepository : IRepository<Address>
{
    private readonly DataContext _context;

    public AddressRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Address>> GetAll(int foreignId = -1)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            SELECT * FROM Address WHERE CustomerId = @foreignId
        """;
        return await connection.QueryAsync<Address>(sql, new { foreignId });
    }

    public async Task<Address> GetById(int id, int foreignId = -1)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            SELECT * FROM Address
            WHERE Id = @id
        """;

        object parameters = foreignId > 1 ? new { id, foreignId } : new { id };

        if (foreignId > -1)
            sql += " AND CustomerId = @foreignId";

        var address = await connection.QuerySingleOrDefaultAsync<Address>(sql, parameters);
        return address;
    }

    public async Task Create(Address address)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            INSERT INTO Address (StreetAddress, City, State, Zip, CustomerId)
            VALUES (@StreetAddress, @City, @State, @Zip, @CustomerId)
        """;
        await connection.ExecuteAsync(sql, address);
    }

    public async Task Update(Address address)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            UPDATE Address 
            SET StreetAddress = @StreetAddress,
                City = @City,
                State = @State, 
                Zip = @Zip,
                CustomerId = @CustomerId
            WHERE Id = @Id
        """;
        await connection.ExecuteAsync(sql, address);
    }

    public async Task Delete(int id, int foreignId = -1)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            DELETE FROM Address 
            WHERE Id = @id
        """;

        object parameters = foreignId > 1 ? new { id, foreignId } : new { id };

        if (foreignId > -1)
            sql += " AND CustomerId = @foreignId";

        await connection.ExecuteAsync(sql, parameters);
    }

    public async Task DeleteAll(int foreignId)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            DELETE FROM Address 
            WHERE CustomerId = @foreignId
        """;

        object parameters = new { foreignId };

        await connection.ExecuteAsync(sql, parameters);
    }
}