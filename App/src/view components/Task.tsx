//
//  Task.tsx
//  React App
//
//  The MIT License (MIT)
//  Copyright © 2020 d-exclaimation
//

import React from 'react';
import { TodoItems } from '../App';
import { Checkbox, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import '../App.css';

const getDateOnly = (date: Date): string => {
    const actualDate = new Date(date.toString());
    return actualDate.toDateString();
};

const Task = (props: TodoItems) => {
    return (
        <ListItem key={props.id}>
            <ListItemIcon>
                <Checkbox
                    disabled
                    checked={props.isCompleted}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </ListItemIcon>
            <ListItemText
                primary={props.name}
                secondary={ getDateOnly(props.createdAt) }
                secondaryTypographyProps={{ style: { color: 'lightgray' } }}
            />
        </ListItem>
    );
};

export default Task;
