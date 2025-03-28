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
        public IActionResult GetBooks(int pageHowMany = 5, int pageNum = 1, string sort = "title", string order = "asc", [FromQuery] List<string>? category = null)
        {
            var query = _context.Books.AsQueryable();

            if (category != null && category.Count > 0)
            {
                query = query.Where(b => category.Contains(b.Category));
            }

            if (sort.ToLower() == "title")
            {
                query = order.ToLower() == "desc"
                    ? query.OrderByDescending(b => b.Title)
                    : query.OrderBy(b => b.Title);
            }

            var pagedBooks = query
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            var totalNumBooks = query.Count();

            return Ok(new
            {
                Books = pagedBooks,
                TotalNumBooks = totalNumBooks
            });
        }

        [HttpGet("GetCategories")]
        public IActionResult GetCategories()
        {
            var categories = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .OrderBy(c => c)
                .ToList();

            return Ok(categories);
        }
    }
}
