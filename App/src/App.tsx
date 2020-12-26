//
//  App.tsx
//  React App
//
//  The MIT License (MIT)
//  Copyright © 2020 d-exclaimation
//

import React from 'react';
import { Button, Checkbox, TextField, List, Card, CardContent } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Task from "./view components/Task";
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

    componentDidMount(): void {
        this.getJSON();
    }

    render(): JSX.Element {
        return (
          <div className="App">
              <header className="App-header">
                  <div>
                      {this.formCard()}
                      <Card style={{
                          minWidth: 275,
                          backgroundColor: "#282c34",
                          margin: 20,
                      }} variant="outlined">
                          <CardContent>
                              <List className="App-Form" component="nav" aria-label="main mailbox folders">
                                  { this.state.todos.map((data: TodoItems) => (
                                      <Task key={data.id} id={data.id} name={data.name} createdAt={data.createdAt} dueDate={data.dueDate} isCompleted={data.isCompleted}/>
                                  )) }
                              </List>
                          </CardContent>
                      </Card>
                  </div>
              </header>
          </div>
        );
    }

    formCard(): JSX.Element {
        return (
            <Card style={{
                minWidth: 275,
                backgroundColor: "#282c34",
                margin: 20,
            }} variant="outlined">
                <CardContent>
                    <FormGroup>
                        <TextField
                            id="outlined-basic"
                            label="Name of new task"
                            onChange={(event) => this.setTextBox(event)}
                            InputLabelProps={{ style: { color: "lightgray" } }}
                            InputProps={{ style: { color: "lightgray" } }}
                            variant="outlined"
                        />
                        <FormControlLabel
                            className="App-Label" control={
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
                    <Button
                        onClick={() => {
                            this.postJSON(this.state.textBox, this.state.isChecked)
                        }}
                        style={{margin: 20}} variant="outlined" color="secondary">Post API</Button>
                </CardContent>
            </Card>
        )
    }

    setCheck(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ isChecked: event.target.checked });
    }

    setTextBox(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
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

export interface TodoItems {
    id: number,
    name: string,
    createdAt: Date,
    dueDate: Date | null,
    isCompleted: boolean
}

export default App;
