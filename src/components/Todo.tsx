import CommentIcon from '@mui/icons-material/Comment';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { useContext, useState } from 'react';
import { Input } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TodoObj from '../../types/Task';
import TodoListContext from '../context/todoListContext';

interface TodoProps extends TodoObj {
  handleToggle: ()=>void
}
function Todo({
  id, completed, name, description, order, handleToggle,
}: TodoProps) {
  const [editingText, setEditingText] = useState(false);
  const [nameState, setNameState] = useState(name ?? '');
  const [descriptionState, setDescriptionState] = useState(description);

  const labelId = `task-checkbox-label-${nameState}`;
  const { modifyTodo } = useContext(TodoListContext);

  const toggleEditText = () => {
    setEditingText(!editingText);
  };

  const toggleEditingText = () => {
    setEditingText(!editingText);
    if (editingText) {
      modifyTodo(id, { name: nameState });
    }
  };

  return (
    <ListItem
      secondaryAction={(
        <Checkbox
          edge="start"
          checked={completed ?? false}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': labelId }}
          onClick={() => modifyTodo(id, { completed: !completed })}
        />
          )}
      disablePadding
    >
      {/* /onClick={handleToggle(key)} */}
      <ListItemButton
        dense
      >
        <IconButton aria-label="edit">
          <EditIcon
            onClick={() => toggleEditingText()}
          />
        </IconButton>
        <IconButton aria-label="up">
          <KeyboardArrowUpIcon
            onClick={() => modifyTodo(id, { order, move: -1 })}
          />
        </IconButton>
        <IconButton aria-label="down">
          <KeyboardArrowDownIcon
            onClick={() => modifyTodo(id, { order, move: 1 })}
          />
        </IconButton>
        <IconButton aria-label="delete">
          <ClearIcon
            onClick={() => {
              modifyTodo(id, { remove: true });
            }}
          />
        </IconButton>

        <ListItemIcon />
        {
          editingText ? (
            <Input
              value={nameState ?? ''}
              onChange={(e) => {
                setNameState(e.target.value);
              }}
            />
          ) : (<ListItemText id={labelId} primary={nameState} />)
        }

      </ListItemButton>
    </ListItem>
  );
}

export default Todo;
