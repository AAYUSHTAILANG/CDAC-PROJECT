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
    public class OccupantsController : ControllerBase
    {
        private readonly PgexpContext _context;

        public OccupantsController(PgexpContext context)
        {
            _context = context;
        }

        // GET: api/Occupants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Occupant>>> GetOccupants()
        {
            return await _context.Occupants.ToListAsync();
        }

        // GET: api/Occupants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Occupant>> GetOccupant(int id)
        {
            var occupant = await _context.Occupants.FindAsync(id);

            if (occupant == null)
            {
                return NotFound();
            }

            return occupant;
        }

        // PUT: api/Occupants/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOccupant(int id, Occupant occupant)
        {
            if (id != occupant.OccupantId)
            {
                return BadRequest();
            }

            _context.Entry(occupant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OccupantExists(id))
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

        // POST: api/Occupants
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Occupant>> PostOccupant(Occupant occupant)
        {
            _context.Occupants.Add(occupant);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOccupant", new { id = occupant.OccupantId }, occupant);
        }

        // DELETE: api/Occupants/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOccupant(int id)
        {
            var occupant = await _context.Occupants.FindAsync(id);
            if (occupant == null)
            {
                return NotFound();
            }

            _context.Occupants.Remove(occupant);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OccupantExists(int id)
        {
            return _context.Occupants.Any(e => e.OccupantId == id);
        }
    }
}
