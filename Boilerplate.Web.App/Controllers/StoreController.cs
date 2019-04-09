using System.Linq;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Boilerplate.Web.App.Controllers
{
    public class StoreController : Controller
    {
        // GET: Customer/CustomerList
        [HttpGet]
        public JsonResult StoreList()
        {
            using (var db = new TALENTContext())
            {
                var stores = db.Store.Select(x => new Store()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Address = x.Address
                }).ToList();

                return Json(stores);
            }
        }

        // POST: Customer/CreateCustomer
        [HttpPost]
        public ActionResult CreateStore([FromBody] Store store)
        {
            using (var db = new TALENTContext())
            {
                if (ModelState.IsValid)
                {
                    db.Store.Add(store);
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
        public ActionResult EditStore(int id, [FromBody] Store store)
        {
            using (var db = new TALENTContext())
            {
                if (ModelState.IsValid)
                {
                    var entity = db.Store.Find(id);
                    entity.Name = store.Name;
                    entity.Address = store.Address;
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
        public ActionResult DeleteStore(int id)
        {
            using (var db = new TALENTContext())
            {
                try
                {
                    var entity = db.Store.Find(id);
                    db.Store.Remove(entity);
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