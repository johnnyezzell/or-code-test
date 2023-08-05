using Moq;

using OrCodingTest.Rest.Repositories;
using OrCodingTest.Rest.Entities;
using OrCodingTest.Rest.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace OrCodingTest.Rest.Tests.Controllers
{
	[TestClass]
	public class CustomersControllerTests
	{
		[TestMethod]
		public void GetAll_WhenReturnedDataIsExpected()
		{
			var customers = new Customer[2];
			customers[0] = new Customer() { Id = 1, FirstName = "Test", LastName = "Customer" };
            customers[1] = new Customer() { Id = 2, FirstName = "Another", LastName = "Person" };

            var repo = new Mock<IRepository<Customer>>();

			repo.Setup(x => x.GetAll(-1)).Returns(Task.FromResult(customers.AsEnumerable()));

			CustomersController customersController = new CustomersController(repo.Object);

            var result = customersController.GetAll();
            var okObjectResultValue = (result?.Result as OkObjectResult)?.Value as IEnumerable<Customer>;

            var expectedResult = customers;

            Assert.AreEqual(okObjectResultValue?.ToList().Count(), expectedResult.Length);
            Assert.AreEqual(okObjectResultValue?.ToList()[0].FirstName, "Test");
            Assert.AreEqual(okObjectResultValue?.ToList()[1].FirstName, "Another");
        }

        [TestMethod]
        public void GetAll_WhenReturnedDataIsNotExpected()
        {
            var customers = new Customer[0];

            var repo = new Mock<IRepository<Customer>>();

            repo.Setup(x => x.GetAll(-1)).Returns(Task.FromResult(customers.AsEnumerable()));

            CustomersController customersController = new CustomersController(repo.Object);

            var result = customersController.GetAll();
            var okObjectResultValue = (result?.Result as OkObjectResult)?.Value as IEnumerable<Customer>;
            var expectedResultCount = 0;

            Assert.AreEqual(okObjectResultValue?.ToList().Count(), expectedResultCount);
        }

        [TestMethod]
        public void GetById_WhenReturnedDataIsExpected()
        {
            var customer = new Customer()
            {
                FirstName = "Test",
                LastName = "TestUser"
            };

            var repo = new Mock<IRepository<Customer>>();

            // -1 is default and used when no parent is expected
            repo.Setup(x => x.GetById(1, -1)).Returns(Task.FromResult(customer));

            CustomersController customersController = new CustomersController(repo.Object);

            var result = customersController.GetById(1);
            var okObjectResultValue = (result?.Result as OkObjectResult)?.Value as Customer;
            var expectedResult = customer;

            Assert.IsNotNull(okObjectResultValue);
            Assert.AreEqual(okObjectResultValue?.FirstName, expectedResult.FirstName);
            Assert.AreEqual(okObjectResultValue?.LastName, expectedResult.LastName);
            Assert.AreSame(okObjectResultValue, expectedResult);
        }

        [TestMethod]
        public void GetById_WhenReturnedDataIsNotExpected()
        {
            var repo = new Mock<IRepository<Customer>>();

            // -1 is default and used when no parent is expected
            repo.Setup(x => x.GetById(1, -1)).Returns(Task.FromResult<Customer>(null));

            CustomersController customersController = new CustomersController(repo.Object);

            var result = customersController.GetById(1);

            Assert.AreEqual(result?.Exception?.Message, "One or more errors occurred. (No customer was found for id 1)");
        }
    }
}