namespace OrCodingTest.Rest.Entities;

public class Office
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public ICollection<Customer>? Addresses { get; set; }
    public ICollection<Customer>? Customers { get; set; }
}