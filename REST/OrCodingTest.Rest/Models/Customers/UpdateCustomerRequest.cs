namespace OrCodingTest.Rest.Models.Customers;

using System.ComponentModel.DataAnnotations;

public class UpdateCustomerRequest
{
    [Required]
    public int Id { get; set; }

    [Required]
    [MinLength(2)]
    [MaxLength(50)]
    public string? FirstName { get; set; }

    [Required]
    [MinLength(2)]
    [MaxLength(50)]
    public string? LastName { get; set; }
}