namespace OrCodingTest.Rest.Repositories;

using Dapper;
using OrCodingTest.Rest.Entities;
using OrCodingTest.Rest.Utilities;

public class CustomerRepository : IRepository<Customer>
{
    private readonly DataContext _context;

    public CustomerRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Customer>> GetAll(int foreignId = -1)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            SELECT
                c.*,
                (SELECT COUNT(*) FROM Address WHERE CustomerId = c.Id) AddressCount FROM Customer c
        """;
        return await connection.QueryAsync<Customer>(sql);
    }

    public async Task<Customer> GetById(int id, int foreignId = -1)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            SELECT c.*, (SELECT COUNT(*) FROM Address WHERE Id = @id) FROM Customer WHERE Id = @id
        """;
        return await connection.QuerySingleOrDefaultAsync<Customer>(
            sql,
            new { id }
        );
    }

    public async Task Create(Customer customer)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            INSERT INTO Customer (FirstName, LastName)
                VALUES (@FirstName, @LastName)
        """;
        await connection.ExecuteAsync(sql, customer);
    }

    public async Task Update(Customer customer)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            UPDATE Customer 
            SET FirstName = @FirstName,
                LastName = @LastName
            WHERE Id = @Id
        """;
        await connection.ExecuteAsync(sql, customer);
    }

    public async Task Delete(int id, int foreignId = -1)
    {
        using var connection = _context.CreateConnection();
        var sql = """
            DELETE FROM Customer 
            WHERE Id = @id
        """;
        await connection.ExecuteAsync(sql, new { id });
    }
}