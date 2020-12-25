//
// Todo Item Model
// Authored By Vincent
//

using System;

namespace TodoApi.Models {
    public class TodoItem {
        public long id { get; set; }
        public string name { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime? dueDate { get; set; }
        public bool isCompleted { get; set; }

        public TodoItemDto toDto() => new TodoItemDto {
            id = id, 
            name = name, 
            dueDate = dueDate, 
            isCompleted = isCompleted
        };
    }

    public class TodoItemDto {
        public long id { get; set; }
        public string name { get; set; }
        public DateTime? dueDate { get; set; }
        public bool isCompleted { get; set; }
    }
}