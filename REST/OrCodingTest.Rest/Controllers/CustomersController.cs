namespace OrCodingTest.Rest.Controllers;

using Microsoft.AspNetCore.Mvc;
using OrCodingTest.Rest.Models.Customers;
using OrCodingTest.Rest.Repositories;
using OrCodingTest.Rest.Entities;

[ApiController]
[Route("[controller]")]
public class CustomersController : ControllerBase
{
    private readonly IRepository<Customer> _customerRepository;

    public CustomersController(IRepository<Customer> customerRepository)
    {
        _customerRepository = customerRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var customers = await _customerRepository.GetAll();
        return Ok(customers);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var customer = await _customerRepository.GetById(id, -1);
        
        if (customer == null) {
            throw new KeyNotFoundException($"No customer was found for id {id}");
        }

        return Ok(customer);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateCustomerRequest model)
    {
        Customer customer = new () {
            FirstName = model.FirstName,
            LastName = model.LastName
        };

        await _customerRepository.Create(customer);
        return Ok(new { message = "Customer created" });
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateCustomerRequest model)
    {
        Customer customer = new () {
            Id = model.Id,
            FirstName = model.FirstName,
            LastName = model.LastName
        };

        await _customerRepository.Update(customer);
        return Ok(new { message = "Customer updated" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _customerRepository.Delete(id);
        return Ok();
    }

}