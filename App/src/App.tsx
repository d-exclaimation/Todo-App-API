//
//  App.tsx
//  React App
//
//  The MIT License (MIT)
//  Copyright © 2020 d-exclaimation
//

import React, {ChangeEvent} from 'react';
import {Button, Checkbox, TextField, List, ListItem, ListItemText, ListItemIcon} from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import './App.css';


class App extends React.Component {

    state = {
        textBox: "",
        isChecked: false,
        todos: Array<TodoItems>()
    };

    api: string = 'https://localhost:5001/api/TodoItems/';

    textBox(): string {
        return this.state.textBox;
    }

    render(): JSX.Element {
        return (
          <div className="App">
              <header className="App-header">
                  <List component="nav" aria-label="main mailbox folders">
                      { this.state.todos.map((data: TodoItems) => (
                          <ListItem key={data.id}>
                              <ListItemIcon>
                                  <Checkbox
                                      disabled
                                      checked={data.isCompleted}
                                      color="primary"
                                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                                  />
                              </ListItemIcon>
                              <ListItemText primary={data.name} />
                          </ListItem>
                      )) }
                  </List>
                  <Button variant="outlined" color="primary" onClick={() => {this.getJSON()}}>Get API</Button>
                  <br />
                  <FormGroup className="App-Form">
                      <TextField
                          id="outlined-basic"
                          label="Name of new task"
                          onChange={(event) => this.setTextBox(event)}
                          variant="outlined"
                      />
                      <FormControlLabel
                          control={
                              <Checkbox
                                  checked={this.state.isChecked}
                                  onChange={(event) => this.setCheck(event)}
                                  color="primary"
                                  inputProps={{ 'aria-label': 'primary checkbox' }}
                              />
                          }
                          label="Completed"
                      />
                  </FormGroup>
                  <Button color="secondary" onClick={() => {this.postJSON(this.state.textBox, this.state.isChecked)}}>Post API</Button>
              </header>
          </div>
        );
    }

    setCheck(event: ChangeEvent<HTMLInputElement>): void {
        this.setState({ isChecked: event.target.checked });
    }

    setTextBox(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
        const result: string = event.target.value;
        this.setState({ textBox: result });
    }

    getJSON(): void {
        axios.get(this.api)
            .then( (response) => {
                // change the list into the state
                const todos: TodoItems[] = response.data.sort((a: TodoItems, b: TodoItems) => {
                    return a.id <= b.id ? -1 : 1;
                });
                this.setState({ todos: todos });
            })
            .catch( (error: Error) => {
                console.error(error);
            });
    }

    postJSON(name: string, isCompleted: boolean = false, dueDate: Date | null = null): void {
        console.log(this.state);
        axios.post(this.api, {
            name: name,
            dueDate: dueDate,
            isCompleted: isCompleted
        }).then(_ => {
            this.getJSON();
        }).catch( (error: Error) => {
           console.error(error)
        });
    }
}

interface TodoItems {
    id: number,
    name: string,
    createdAt: Date,
    dueDate: Date | null,
    isCompleted: boolean
}

export default App;
