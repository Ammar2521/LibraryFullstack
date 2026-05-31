using LibraryApi.Data;
using LibraryApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoansController : ControllerBase
{
    private readonly AppDbContext _context;

    public LoansController(AppDbContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<Loan>>> GetLoans()
    {
        var loans = await _context.Loans
            .Include(l => l.Book)
            .ToListAsync();

        return Ok(loans);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Loan>> CreateLoan(Loan loan)
    {
        var book = await _context.Books.FindAsync(loan.BookId);

        if (book == null)
        {
            return NotFound("Boken finns inte.");
        }

        if (!book.IsAvailable)
        {
            return BadRequest("Boken är redan utlånad.");
        }

        book.IsAvailable = false;
        loan.LoanDate = DateTime.Now;

        _context.Loans.Add(loan);
        await _context.SaveChangesAsync();

        return Ok(loan);
    }

    [Authorize]
    [HttpPut("{id}/return")]
    public async Task<IActionResult> ReturnBook(int id)
    {
        var loan = await _context.Loans
            .Include(l => l.Book)
            .FirstOrDefaultAsync(l => l.Id == id);

        if (loan == null)
        {
            return NotFound();
        }

        loan.ReturnDate = DateTime.Now;

        if (loan.Book != null)
        {
            loan.Book.IsAvailable = true;
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }
}