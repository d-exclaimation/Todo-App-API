# Todo List Starter Project

Todo List App using React and ASP.NET Core

## React

Simple React Todo List by pulling list from API
> Used Material UI Components

```tsx
import {Button, Checkbox, TextField, List, ListItem, ListItemText, ListItemIcon} from '@material-ui/core';
<Button color="secondary">Post API</Button>
```

## ASP.NET Core

Simple API for a Todo List using MVC
> Used a DTO to disable adding createdAt DateTime

```cs
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
```