import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Customer() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const[customers,setCustomers]=useState([])
     const classes = useStyles();

  const handleClick=(e)=>{
    e.preventDefault()
    const customer={name,address}
    console.log(customer)
    fetch("http://localhost:8080/customer/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(customer)

  }).then(()=>{
    console.log("New customer added")
  })
}

useEffect(()=>{
  fetch("http://localhost:8080/customer/getAll")
  .then(res=>res.json())
  .then((result)=>{
    setCustomers(result);
  }
)
},[])
  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Customer</u></h1>

    <form className={classes.root} noValidate autoComplete="off">
    
      <TextField id="outlined-basic" label="Customer Name" variant="outlined" fullWidth 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Customer Adress" variant="outlined" fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>
  Submit
</Button>
    </form>
   
    </Paper>


    <Paper elevation={3} style={paperStyle}>

      {customers.map(customer=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={customer.id}>
         Id:{customer.id}<br/>
         Name:{customer.name}<br/>
         Address:{customer.address}

        </Paper>
      ))
}


    </Paper>



    </Container>
  );
}