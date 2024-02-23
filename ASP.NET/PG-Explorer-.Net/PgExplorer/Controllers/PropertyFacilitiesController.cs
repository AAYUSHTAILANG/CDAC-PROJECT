using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PgExplorer.Models;

namespace PgExplorer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyFacilitiesController : ControllerBase
    {
        private readonly PgexpContext _context;

        public PropertyFacilitiesController(PgexpContext context)
        {
            _context = context;
        }

        // GET: api/PropertyFacilities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PropertyFacility>>> GetPropertyFacilities()
        {
            return await _context.PropertyFacilities.ToListAsync();
        }

        // GET: api/PropertyFacilities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PropertyFacility>> GetPropertyFacility(int id)
        {
            var propertyFacility = await _context.PropertyFacilities.FindAsync(id);

            if (propertyFacility == null)
            {
                return NotFound();
            }

            return propertyFacility;
        }

        // PUT: api/PropertyFacilities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPropertyFacility(int id, PropertyFacility propertyFacility)
        {
            if (id != propertyFacility.Id)
            {
                return BadRequest();
            }

            _context.Entry(propertyFacility).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PropertyFacilityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PropertyFacilities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PropertyFacility>> PostPropertyFacility(PropertyFacility propertyFacility)
        {
            _context.PropertyFacilities.Add(propertyFacility);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPropertyFacility", new { id = propertyFacility.Id }, propertyFacility);
        }

        // DELETE: api/PropertyFacilities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePropertyFacility(int id)
        {
            var propertyFacility = await _context.PropertyFacilities.FindAsync(id);
            if (propertyFacility == null)
            {
                return NotFound();
            }

            _context.PropertyFacilities.Remove(propertyFacility);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PropertyFacilityExists(int id)
        {
            return _context.PropertyFacilities.Any(e => e.Id == id);
        }
    }
}
