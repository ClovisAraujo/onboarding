using System.Linq;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Boilerplate.Web.App.Controllers
{
    public class ProductController : Controller
    {
        // GET: Customer/CustomerList
        [HttpGet]
        public JsonResult ProductList()
        {
            using (var db = new TALENTContext())
            {
                var products = db.Product.Select(x => new Product()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Price = x.Price
                }).ToList();

                return Json(products);
            }
        }

        // POST: Customer/CreateCustomer
        [HttpPost]
        public ActionResult CreateProduct([FromBody] Product product)
        {
            using (var db = new TALENTContext())
            {
                if (ModelState.IsValid)
                {
                    db.Product.Add(product);
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
        public ActionResult EditProduct(int id, [FromBody] Product product)
        {
            using (var db = new TALENTContext())
            {
                if (ModelState.IsValid)
                {
                    var entity = db.Product.Find(id);
                    entity.Name = product.Name;
                    entity.Price = product.Price;
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
        public ActionResult DeleteProduct(int id)
        {
            using (var db = new TALENTContext())
            {
                try
                {
                    var entity = db.Product.Find(id);
                    db.Product.Remove(entity);
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