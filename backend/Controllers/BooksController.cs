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

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{id}")]
        public IActionResult UpdateBook(int id, [FromBody] Book updatedBook)
        {
            var existing = _context.Books.FirstOrDefault(b => b.BookID == id);
            if (existing == null)
                return NotFound();

            existing.Title = updatedBook.Title;
            existing.Author = updatedBook.Author;
            existing.Publisher = updatedBook.Publisher;
            existing.Category = updatedBook.Category;
            existing.Classification = updatedBook.Classification;
            existing.ISBN = updatedBook.ISBN;
            existing.Price = updatedBook.Price;
            existing.PageCount = updatedBook.PageCount;

            _context.SaveChanges();
            return Ok(existing);
        }

        [HttpDelete("DeleteBook/{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = _context.Books.FirstOrDefault(b => b.BookID == id);
            if (book == null)
                return NotFound();

            _context.Books.Remove(book);
            _context.SaveChanges();
            return Ok();
        }
    }
}