namespace OrCodingTest.Rest.Models.Addresses;

using System.ComponentModel.DataAnnotations;

public class UpdateAddressRequest
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string? StreetAddress { get; set; }

    [Required]
    public string? City { get; set; }

    [Required]
    public string? State { get; set; }

    [Required]
    [MinLength(5)]
    [MaxLength(10)]
    public string? Zip { get; set; }    

    [Required]
    public int CustomerId { get; set;}
}