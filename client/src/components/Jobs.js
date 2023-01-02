import React, { Component } from 'react'

class Jobs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobsData: [''],
            employeeData: [],
            inputID: '',
            showingEmployee: false,
            invalidInput: true
        }
    }

    condition = () => {
        if (this.state.invalidInput) {
            //alert("INVALID ID OR ID DOES NOT EXISTS");
        }
    }

    componentDidMount = () => {
        this.getJobsAll();
    }

    handleNormalDisplay() {
        this.getJobsAll();
    }

    async getJobsAll() {
        try {
            const response = await fetch(`job`, {method: 'GET'});
            const data = await response.json();
            this.setState ({
                jobsData: data,
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    async getJobsID() {
        try {
            const response = await fetch(`job/${this.state.inputID}`, {method: 'GET'});
            const data = await response.json();
            this.setState ({
                employeeData: data,
                invalidInput: false
            });
            
        }
        catch (err) {
            //alert("INVALID ID OR ID DOES NOT EXISTS");
            this.setState({
                invalidInput: true
            });
            console.log(err);
        }
    }

    renderTableHeaderAll = () => {
        var keys = Object.keys(this.state.jobsData[0]);
        let jsxArray = [];
        for (let i = 0; i < keys.length; i++) {
            jsxArray.push(<th key={i}>{keys[i]}</th>);
        }
        return jsxArray;
    }

    renderTableRowsAll = () => {
        var keys = Object.keys(this.state.jobsData[0]);
        let jsxArray = [];
        for (let i = 0; i < this.state.jobsData.length; i++) {
            jsxArray.push(<tr><td>{this.state.jobsData[i].job_id}</td>
            <td>{this.state.jobsData[i].title}</td>
            <td>{this.state.jobsData[i].pay_rate}</td>
            <td>{this.state.jobsData[i].department_name}</td>
            <td>{this.state.jobsData[i].airport_id}</td></tr>);
        }
        return jsxArray;
    }

    renderTableHeaderEmployee = () => {
        var keys = Object.keys(this.state.employeeData[0]);
        let jsxArray = [];
        for (let i = 0; i < keys.length; i++) {
            jsxArray.push(<th key={i}>{keys[i]}</th>);
        }
        return jsxArray;
    }

    renderTableRowsEmployee = () => {
        var keys = Object.keys(this.state.employeeData[0]);
        let jsxArray = [];
        for (let i = 0; i < this.state.employeeData.length; i++) {
            jsxArray.push(<tr><td>{this.state.employeeData[i].employee_id}</td>
            <td>{this.state.employeeData[i].first_name}</td>
            <td>{this.state.employeeData[i].last_name}</td>
            <td>{this.state.employeeData[i].birthday}</td>
            <td>{this.state.employeeData[i].ssn}</td>
            <td>{this.state.employeeData[i].sex}</td>
            <td>{this.state.employeeData[i].marital_status}</td>
            <td>{this.state.employeeData[i].job_id}</td>
            <td>{this.state.employeeData[i].crew_id}</td></tr>);
        }
        return jsxArray;
    }

    handleSearchSubmission = (event) => {
        event.preventDefault();

        this.getJobsID();

        if (this.state.invalidInput) {
            //alert("INVALID ID OR ID DOES NOT EXISTS");
        }

        this.setState({
            inputID: ''
        })
    }

    render() {
        return (
            <div className = "jobsClass">
                <div className="inpurWrapper">
                    <form onSubmit={this.handleSearchSubmission} className="searchIDForm">
                        <label>Enter Job ID: </label>
                        <input 
                                autoComplete = "off"
                                minLength = "2"
                                maxlength = "2"
                                pattern = "[A-Z]+"
                                title = "2 capitalized characters"
                                type = "text" 
                                id = "searchInput"
                                value={this.state.inputID}
                                onChange={event => {
                                    this.setState({
                                        inputID: event.target.value
                                    })
                                }}
                                placeholder="..."/>
                    </form>
                </div>

                
                <table className = "jobsTableClass">
                    <tr>
                        { this.state.jobsData !== null && this.renderTableHeaderAll()}
                    </tr>
                    {this.state.jobsData !== null && this.renderTableRowsAll()}
                </table>

                {this.condition}
                
                    <table className = "jobsTableClass">
                        <tr>
                            {this.state.employeeData.length > 0 && this.state.invalidInput == false && this.renderTableHeaderEmployee()}
                        </tr>
                        {this.state.employeeData.length > 0 && this.state.invalidInput == false && this.renderTableRowsEmployee()}
                    </table>
                
                
            </div>
        )
    }

}

export default Jobs