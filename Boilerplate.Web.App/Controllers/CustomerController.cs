using System.Linq;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Boilerplate.Web.App.Controllers
{
    public class CustomerController : Controller
    {

        // GET: Customer/CustomerList
        [HttpGet]
        public JsonResult CustomerList()
        {
            using (var db = new TALENTContext())
            {
                var customers = db.Customer.Select(x => new Customer()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Address = x.Address
                }).ToList();

                return Json(customers);
            }
        }

        // POST: Customer/CreateCustomer
        [HttpPost]
        public ActionResult CreateCustomer([FromBody] Customer customer)
        {
            using (var db = new TALENTContext())
            {
                if (ModelState.IsValid)
                {
                    db.Customer.Add(customer);
                    db.SaveChanges();
                    return StatusCode(StatusCodes.Status201Created);
                }

                else
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
                }

            }
        }

        // PUT: Customer/EditCustomer
        [HttpPut]
        public ActionResult EditCustomer(int id, [FromBody] Customer customer)
        {
            using (var db = new TALENTContext())
            {
                if (ModelState.IsValid)
                {
                    var entity = db.Customer.Find(id);
                    entity.Name = customer.Name;
                    entity.Address = customer.Address;
                    db.SaveChanges();

                    return Ok("Record Updated Succesfully...");
                }
                else
                {
                    return NotFound("No record has been found against this id");
                }
            }
        }

        // DELETE: Customer/DeleteDeleteCustomer/#
        [HttpDelete]
        public ActionResult DeleteCustomer(int id)
        {
            using (var db = new TALENTContext())
            {
                try
                {
                    var entity = db.Customer.Find(id);
                    db.Customer.Remove(entity);
                    db.SaveChanges();
                    return Ok("Code deleted");
                }
                catch
                {
                    throw;
                }
            }
        }
    }
}