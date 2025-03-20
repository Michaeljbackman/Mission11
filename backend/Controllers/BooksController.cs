using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace MissionEleven.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private BookstoreContext _context;
        public BooksController(BookstoreContext temp) => _context = temp;

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageHowMany = 5, int pageNum = 1, string sort = "title", string order = "asc")
        {
            var query = _context.Books.AsQueryable();

            // Sorting by Title + Direction (asc/desc)
            if (sort.ToLower() == "title")
            {
                query = order.ToLower() == "desc"
                    ? query.OrderByDescending(b => b.Title)
                    : query.OrderBy(b => b.Title);
            }

            // Pagination logic
            var pagedBooks = query
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            var totalNumBooks = _context.Books.Count();

            return Ok(new
            {
                Books = pagedBooks,
                TotalNumBooks = totalNumBooks
            });
        }
    }
}