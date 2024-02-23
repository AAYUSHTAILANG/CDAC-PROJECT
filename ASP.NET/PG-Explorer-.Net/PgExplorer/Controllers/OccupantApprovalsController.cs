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
    public class OccupantApprovalsController : ControllerBase
    {
        private readonly PgexpContext _context;

        public OccupantApprovalsController(PgexpContext context)
        {
            _context = context;
        }

        // GET: api/OccupantApprovals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OccupantApproval>>> GetOccupantApprovals()
        {
            return await _context.OccupantApprovals.ToListAsync();
        }

        // GET: api/OccupantApprovals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OccupantApproval>> GetOccupantApproval(int id)
        {
            var occupantApproval = await _context.OccupantApprovals.FindAsync(id);

            if (occupantApproval == null)
            {
                return NotFound();
            }

            return occupantApproval;
        }

        // PUT: api/OccupantApprovals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOccupantApproval(int id, OccupantApproval occupantApproval)
        {
            if (id != occupantApproval.Id)
            {
                return BadRequest();
            }

            _context.Entry(occupantApproval).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OccupantApprovalExists(id))
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

        // POST: api/OccupantApprovals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OccupantApproval>> PostOccupantApproval(OccupantApproval occupantApproval)
        {
            _context.OccupantApprovals.Add(occupantApproval);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOccupantApproval", new { id = occupantApproval.Id }, occupantApproval);
        }

        // DELETE: api/OccupantApprovals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOccupantApproval(int id)
        {
            var occupantApproval = await _context.OccupantApprovals.FindAsync(id);
            if (occupantApproval == null)
            {
                return NotFound();
            }

            _context.OccupantApprovals.Remove(occupantApproval);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OccupantApprovalExists(int id)
        {
            return _context.OccupantApprovals.Any(e => e.Id == id);
        }
    }
}
