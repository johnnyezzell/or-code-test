namespace OrCodingTest.Rest.Controllers;

using Microsoft.AspNetCore.Mvc;
using OrCodingTest.Rest.Models.Addresses;
using OrCodingTest.Rest.Repositories;
using OrCodingTest.Rest.Entities;

[ApiController]
[Route("customers/{customerId}/addresses")]
public class AddressesController : ControllerBase
{
    private readonly IRepository<Address> _addressRepository;

    public AddressesController(IRepository<Address> addressRepository)
    {
        _addressRepository = addressRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(int customerId)
    {
        var addresses = await _addressRepository.GetAll(customerId);
        return Ok(addresses);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int customerId, int id)
    {
        var address = await _addressRepository.GetById(id, customerId);
        return address == null ?
          throw new KeyNotFoundException($"No address was found for customer {customerId} and id {id}") :
            Ok(address);
    }

    [HttpPost]
    public async Task<IActionResult> Create(int customerId, CreateAddressRequest model)
    {
        Address address = new () {
            StreetAddress = model.StreetAddress,
            City = model.City,
            State = model.State,
            Zip = model.Zip,
            CustomerId = customerId 
        };

        await _addressRepository.Create(address);
        return Ok(new { message = "Address created" });
    }

    [HttpPut]
    public async Task<IActionResult> Update(int customerId, UpdateAddressRequest model)
    {
        Address address = new () {
            Id = model.Id,
            StreetAddress = model.StreetAddress,
            City = model.City,
            State = model.State,
            Zip = model.Zip,
            CustomerId =  customerId
        };

        await _addressRepository.Update(address);
        return Ok(new { message = "Address updated" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int customerId, int id)
    {
        await _addressRepository.Delete(id, customerId);
        return Ok();
    }

}