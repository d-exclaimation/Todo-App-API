//
// Todo API Controller
// Authored By Vincent
//

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Controllers {
    [Route("api/TodoItems")]
    [ApiController]
    public class TodoItemsController : ControllerBase {
        private readonly TodoContext _context;

        public TodoItemsController(TodoContext context) {
            _context = context;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems() {
            
            // get all data
            return await _context.todoItems.ToListAsync();
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(long id) {
            
            // Get all the full data in the database context
            var todoItem = await _context.todoItems.FindAsync(id);

            if (todoItem == null) {
                return NotFound();
            }

            return todoItem;
        }

        // PUT: api/TodoItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodoItem(long id, TodoItemDto itemDto) {
            // Using the dto find the item in the context using the id
            if (id != itemDto.id) {
                return BadRequest();
            }
            
            // Using the id find the actual data, if fail return a 404 Not Found
            var todoItem = await _context.todoItems.FindAsync(id);
            if (todoItem == null) return NotFound();
            
            // Make changes
            todoItem.name = itemDto.name;
            todoItem.dueDate = itemDto.dueDate;
            todoItem.isCompleted = itemDto.isCompleted;

            // Save the newly modified data to database context
            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!TodoItemExists(id)) {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/TodoItems
        [HttpPost]
        public async Task<ActionResult<TodoItem>> CreateTodoItem(TodoItemDto itemDto) {
            
            // Make the actual TodoItem
            var todoItem = new TodoItem {
                name = itemDto.name,
                createdAt = DateTime.Now,
                dueDate = itemDto.dueDate,
                isCompleted = itemDto.isCompleted
            };
            
            _context.todoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.id }, todoItem);
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(long id) {
            var todoItem = await _context.todoItems.FindAsync(id);
            if (todoItem == null) {
                return NotFound();
            }

            _context.todoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoItemExists(long id) {
            return _context.todoItems.Any(e => e.id == id);
        }
    }
}
