//
//  Todo Data Context
//  Authored By Vincent
//
//  The MIT License (MIT)
//  Copyright © 2020 d-exclaimation
//

using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models {
    public class TodoContext: DbContext {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options) {}
        public DbSet<TodoItem> todoItems { get; set; }
    }
}