import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom"; // React router for handles the frontend route
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";


export default class CreateRoomPage extends Component{
    defaultVotes = 2;

    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes,
        };
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this)
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this)
    }

    // some functions

    // e is the object who calls this function, e.target.value will the the value of the object
    // for example, if we call this function in the textfield as a callback function, then the object should be textfield
    handleVotesChange(e) {
        this.setState({
            votesToSkip: e.target.value,
        });  
    }

    handleGuestCanPauseChange(e) {
        this.setState({
            guestCanPause: e.target.value === "true" ? true : false,
        });
    }

    handleRoomButtonPressed() {
        // wrapping up the state data as a POST request and send it to backend
        // the data name has to be the same as model in order to make a sucessful request
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
                
            }),
        };
        // this is a fetch request, take the request and send it to the url/route
        // then take the respone (the response to our POST request) and convert it to json format
        // then take the data of json and log
        fetch('/api/create-room', requestOptions)
            .then((response) => response.json())
            // redirect user to the room page, when you press create button, it will go to the room (with unique id) page
            .then((data) => this.props.history.push('/room/'+data.code));
     }

    // render()
    render() {
        return (
            <Grid container spacing={1} >

                {/* a header */}
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4'>
                        Create A Room
                    </Typography>
                </Grid>

                {/* subtitle */}
                <Grid item xs={12} align="center">
                    <FormControl component='fieldset'>
                        <FormHelperText>
                            <div align='center'>
                                Guest Control of Playback State
                            </div>
                        </FormHelperText>
                        {/* control group */}
                        <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>  {/* row prop mean, all component inside RadioGroup will be row aligned */}
                            <FormControlLabel value="true" control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />
                             <FormControlLabel value="false" control={<Radio color="secondary" />}
                                label="No Control"
                                labelPlacement="bottom"
                            />                           
                        </RadioGroup>
                    </FormControl>
                </Grid>

                {/*  */}
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                            required={true}
                            type='number'
                            onChange={this.handleVotesChange}
                            defaultValue={this.defaultVotes}
                            inputProps={
                              {min:1,}  
                            }
                        />
                        <FormHelperText>
                            <div align='center'>Votes Required to Skip Song</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12} align="center">
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={this.handleRoomButtonPressed}
                    >
                        Create A Room
                    </Button>
                </Grid>

                <Grid item xs={12} align="center">
                    {/* to = '/' will be the url you want to direct to when you press the button, and component for button is link */}
                    <Button color='secondary' variant='contained' to='/' component={Link}>
                        Back
                    </Button>
                </Grid>
                
            </Grid>
        );
    }
}