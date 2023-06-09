import './App.css';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { useState, useRef } from 'react';
import Weather from "./Weather.js";
import "@fontsource/inter";
import { Container } from '@mui/system';
import { Autocomplete, Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles';
import { montheme, tuetheme, wedtheme, thutheme, fritheme} from './themes'; // Import your custom theme
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function App(){
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const [inputValue, setInputValue] = useState("");
  const [units, setUnits] = useState("metric");
  const [unitdisplay, setUnitsDis] = useState("Celcius");
  const [degree, setDegree] = useState("°C")
  const [city, setCity] = useState("Vancouver");
  const [thisHighlight, setThisHighlight] = useState([null, null]);

  //init lists
  const [taskMon, setTaskMon] = useState([
    { taskName: 'Task 1', taskEditable: false, highlighted: false, day: 1},
  ]);
  const [taskTue, setTaskTue] = useState([]);
  const [taskWed, setTaskWed] = useState([]);
  const [taskThu, setTaskThu] = useState([]);
  const [taskFri, setTaskFri] = useState([]);

  const daysvar = [taskMon, taskTue, taskWed, taskThu, taskFri];

  const themevar = [montheme, tuetheme, wedtheme, thutheme, fritheme]

  const options = ['Option 1', 'Option 2', 'Option 3'];


  function writeDay(day, item){
    switch (day) {
      case taskMon:
        setTaskMon(item);
        break;
      case taskTue:
        setTaskTue(item);
        break;
      case taskWed:
        setTaskWed(item);
        break;
      case taskThu:
        setTaskThu(item);
        break;
      case taskFri:
        setTaskFri(item);
        break;
      default:
        console.log("WTF");
    }
  }

  //Rearrange list items
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position, day) => {
    dragItem.current = position;

  };

  const dragEnter = (e, position, day) => {
    dragOverItem.current = position;
  };

  const drop = (e, day) => {
    const copyListItems = [...day];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;

    writeDay(day, copyListItems);
  };


  //new button
  function handleNewItem(day, dayindex){
    const newTask = { taskName : 'Untitled', taskEditable: true, highlighted: true, day: dayindex};
    const newTasks = [...day, newTask];
    setThisHighlight([newTasks.indexOf(newTask), dayindex])
    writeDay(day, newTasks);
  }

  //handle click on task
 function handleTaskClick(index, day, dayindex) {
  const newTasks = [...day];
  if (newTasks[index].highlighted === false){
    newTasks[index].highlighted = true;
    console.log(index, dayindex)
    setThisHighlight([index, dayindex]);
    console.log("usestate", thisHighlight)
    
  }
  else if (newTasks[index].highlighted === true && newTasks[index].taskEditable === false){
    newTasks[index].highlighted = false;
  }

  writeDay(day, newTasks);
  // handleEditing(index, day);

} // Added closing brace here

  function handleEditing(index, day){
    if (index !== null && day !== null){
      const temp = [...taskMon, ...taskTue, ...taskWed, ...taskThu, ...taskFri];
      const newTasks = [...day];
      const allTasksEditable = temp.every((task) => task.taskEditable === false);
    
      if (allTasksEditable || newTasks[index].taskEditable === true) {
        newTasks[index].taskEditable = true;
      } else {
        newTasks[index].taskEditable = false;
      }
      writeDay(day, newTasks)
    }
  }

  //handle rename
  function handleTaskNameChange(index, newName, day){
    if (index !== null && day !== null){
      const newTasks = [...day];
      newTasks[index].taskName = newName;
      newTasks[index].taskEditable = false;
      writeDay(day, newTasks)    
      setInputValue("");
      setThisHighlight([null, null]);
      }
    
    }

    const handleDeleteTask = (index, day) => {
      if (index !== null && day !== null){
        console.log(index, day)
        const newTasks = day.filter((task, taskIndexhaha) => taskIndexhaha !== index);
        setThisHighlight([null, null]);
        writeDay(day, newTasks);
      }
      
    };



    //handle input location{
 
    const handleCityChange = (city) => {
      const newCity = city
      if (newCity !== null) {
        setCity(newCity);
      }
      else{
        alert("Error: Invalid City");
      }
    };

    function handleUnitChange(){
      console.log(degree)
      if (units === "metric"){
        setUnits("imperial");
        setUnitsDis("Farenheit");
        setDegree("°F");
      }
      else{
        setUnits("metric");
        setUnitsDis("Celcius");
        setDegree("°C");
      }
    }

    //Search City
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setInputValue("");
    };


  return (
    
      <Container sx={{px: '30px', py:'30px'}} className="App">
      <Dialog open={open} onClose={handleClose}>
      <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Autocomplete 
        freeSolo
        autoFocus
        
         options={options}
         
          renderInput={(params) => (
         
          <TextField
              {...params}
              
              margin="dense"
              id="name"
              label="Input City"
              type="search"
              fullWidth
              variant="standard"
              onKeyDown={(e) => {if (e.key === "Enter"){
                e.preventDefault();
                handleCityChange(params.inputProps.value);
                handleClose();
                e.stopPropagation();
                console.log(params.inputProps.value)
                }}}
              
            />)}
           />
        
        
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
      <Grid container spacing={6}>
        
        {days.map((thisday, index) => (
            <ThemeProvider theme={themevar[index]} key={days[index]+'theme'}>
              <Grid item md={2.4} key={days[index]+'DayContainer'} >
              <Typography key={days[index]+'DayText'}
                sx={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '32px', textAlign: 'left', mb:'10px' }}>
                  {days[index]}
              </Typography>
              <Stack sx={{backgroundColor: themevar[index].palette.primary.main, border: 2, borderColor: themevar[index].palette.primary.border, minHeight:'300px', mb:'15px', direction:"column", justifyContent:'space-between'
              , boxShadow: '0px 0px 8px -4px inset', px: '3px'}} key={days[index]+'stack'}>
                <Container disableGutters key={days[index]+'substack'}>
                  {daysvar[index].map((task, taskindex) => (
                    <Paper key={taskindex+'task'} square  
                      sx={{backgroundColor: themevar[index].palette.primary.task, 
                          height:'30px', lineHeight:'30px', my:'2px', px:'1px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',}} 
                      className='draggable-item'
                      elevation={task.highlighted ? 7 : 1}
                      draggable onClick={() => handleTaskClick(taskindex, daysvar[index], index)}
                      onDragStart={(e) => dragStart(e, taskindex, daysvar[index])}
                      onDragEnter={(e) => dragEnter(e, taskindex, daysvar[index])}
                      onDragEnd={(e) => drop(e, daysvar[index])}
  >
                      {task.taskEditable ? (
                        
                        <TextField key={taskindex+'textfield'}
                        autoFocus
                        size='small'
                        placeholder="Untitled Task"
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          style:{
                            fontSize:'16px',
                            maxWidth:'95px'
                          }
                        }}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {if (e.key === "Enter"){
                                              handleTaskNameChange(taskindex, inputValue, daysvar[index])
                                              daysvar[index][taskindex].highlighted = false;
                                              }
                                              
                                            else if (e.key === "Delete"){
                                              handleDeleteTask(taskindex, daysvar[index])
                                            }
                                              

                                          }} />
                      ) : (
                        <span>{task.taskName}</span>
                      )}
                    </Paper>
                  ))}
                </Container>
                
              <Button variant="text" key={days[index]+'button'} 
              onClick={() => handleNewItem(daysvar[index], index)} 
              sx={{position:'relative', bottom:'0', color:'#000000', opacity:'0.6'}}>Add Task</Button>
              
              
              </Stack>
              <Card sx={{backgroundColor: themevar[index].palette.primary.main, border: 2, borderColor: themevar[index].palette.primary.border, borderRadius:'10px', mb:'15px', boxShadow: '0px 0px 8px -4px inset'}} elevation={0}>
                <Weather city={city} units={units} degree={degree} dayindex={index} key={days[index]+'Weather'}/>
              </Card>
            </Grid>
          </ThemeProvider>

          ))}
        
      </Grid>
      <Stack direction="row-reverse" spacing={2} className='Buttons'>
        
        <Button variant="outlined" onClick={() => handleUnitChange(units)}>{unitdisplay}</Button>
        <Button variant="outlined" onClick={() => handleClickOpen()}>Select Location</Button>
        <Button variant="outlined" onClick={() => handleEditing(thisHighlight[0], daysvar[thisHighlight[1]])}>Rename Task</Button>
        <Button variant="outlined" onClick={() => handleDeleteTask(thisHighlight[0], daysvar[thisHighlight[1]])}>Delete Task</Button>
        {/* <Button variant="outlined" onClick={handleEditing(thisHighlight[0], daysvar[thisHighlight[1]])}>Rename Task</Button> */}
      </Stack>
      </Container>
      
      
    
  );
}

export default App;