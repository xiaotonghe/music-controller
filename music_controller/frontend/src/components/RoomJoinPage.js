import React, { Component } from 'react';
import { TextField, Button, Grid, Typography } from "@material-ui/core"
import {Link} from "react-router-dom"

export default class RoomJoinPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            roomCode: "",
            error:"",
        }
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
        this.roomButtomPressed = this.roomButtomPressed.bind(this)
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                <Typography variant='h4' component='h4'>Join a Room</Typography>
                </Grid>

                <Grid item xs={12} align='center'>
                    <TextField
                        error={this.state.error}
                        label='code'
                        placeholder='Enter a Room Code'
                        value={this.state.roomCode}
                        helperText={this.state.error}
                        variant='outlined'
                        // this onchange can actually write as a arrow function
                        // e is the object who calls this function, here e is TextField, so we'll get the value of object.
                        onChange = {this.handleTextFieldChange}
                    />          
                </Grid>

                {/* OnClick, compared enter room button and back button */}
                <Grid item xs={12} align='center'>
                    <Button variant="contained" color='primary' onClick={this.roomButtomPressed}>Enter Room</Button>
                </Grid>

                <Grid item xs={12} align='center'>
                    {/* using react router here, when we click the button, it will go back to "/" and it acts like a Link component */}
                    <Button variant="contained" color='primary' to="/" component={Link}>Back</Button>
                </Grid>
            </Grid>
        )
    }

    // capture the value of TextField (capture the value from frontend(object))
    handleTextFieldChange(e) {
        this.setState({
            roomCode:e.target.value,
        })
    }

    roomButtomPressed() {
        // define a post request info 
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({
                code: this.state.roomCode
            })
        };

        // send a post request to fetch data from backend 
        // get post request response from backend and send to frontend
        fetch('/api/join-room', requestOptions)
            // then get the response as return
            .then((response) => {
                // if response is ok whicih means we successfully joined the room, then we'll redirect to the room
                // otherwise it will show a error message
                if (response.ok) {
                    this.props.history.push(`/room/${this.state.roomCode}`) // `` is for strinig formatting
                } else {
                    this.setState({ error: "Room not found." })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}