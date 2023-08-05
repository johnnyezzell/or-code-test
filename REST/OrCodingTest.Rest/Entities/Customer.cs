namespace OrCodingTest.Rest.Entities;

public class Customer
{
    public int Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public ICollection<Customer>? Addresses { get; set;}
}