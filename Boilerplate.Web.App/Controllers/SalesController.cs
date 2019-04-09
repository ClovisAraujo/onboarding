using System.Linq;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Boilerplate.Web.App.Controllers
{
    public class SalesController : Controller
    {
        // GET: Sales/SalesList
        [HttpGet]
        public JsonResult SalesList()
        {
            using (var db = new TALENTContext())
            {
                var sales = db.Sales.Select(x => new Sales()
                {
                    Id = x.Id,
                    Customer = x.Customer,
                    Product = x.Product,
                    Store = x.Store,
                    DateSold = x.DateSold
                }).ToList();

                return Json(sales);
            }
        }

        // POST: Sales/CreateSales
        [HttpPost]
        public ActionResult CreateSales([FromBody] Sales sales)
        {
            using (var db = new TALENTContext())
            {
                if (ModelState.IsValid)
                {
                    db.Sales.Add(sales);
                    db.SaveChanges();
                    return StatusCode(StatusCodes.Status201Created);
                }

                else
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
                }

            }
        }

        // PUT: Sales/EditSales
        public ActionResult EditSales(int id, [FromBody] Sales sales)
        {
            using (var db = new TALENTContext())
            {
                if (ModelState.IsValid)
                {
                    var entity = db.Sales.Find(id);
                    entity.CustomerId = sales.CustomerId;
                    entity.ProductId = sales.ProductId;
                    entity.StoreId = sales.StoreId;
                    entity.DateSold = sales.DateSold;
                    db.SaveChanges();

                    return Ok("Record Updated Succesfully...");
                }
                else
                {
                    return NotFound("No record has been found against this id");
                }
            }
        }

        // DELETE: Sales/DeleteDeleteSales/#
        [HttpDelete]
        public ActionResult DeleteSales(int id)
        {
            using (var db = new TALENTContext())
            {
                try
                {
                    var entity = db.Sales.Find(id);
                    db.Sales.Remove(entity);
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