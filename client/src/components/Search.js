import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInput: '',
            employeeInfo: null,
            invalidSearch: false,
            employeeArray: [''],
            queryAll: true,
            insertForm: false,
            updateForm: false,
            insertObject: {
                employee_id: '',
                first_name: '',
                last_name: '',
                birthday: '',
                ssn: '',
                sex: '',
                marital_status: '',
                job_id: '',
                crew_id: ''
            },
            employeeInfoUpdate: {
                employee_id: '',
                first_name: '',
                last_name: '',
                birthday: '',
                ssn: '',
                sex: '',
                marital_status: '',
                job_id: '',
                crew_id: ''
            }
        }
    }

    handleSearchInput = (event) => {
        this.setState({
            searchInput: event.target.value
        })
    }

    handleSearchSubmission = (event) => {
        event.preventDefault();
        //console.log(this.state.searchInput);
        
        this.getData(this.state.searchInput);
        
        this.setState ({
            searchInput: ''
        })
        
    }

    handleQueryAll = (event) => {
        let temp = !this.state.queryAll;
        this.setState({
            queryAll: temp,
            invalidSearch: false
        })
    }

    async getData(dataParameter) {
        try {
            const response = await fetch(`employee/${dataParameter}`, {method: 'GET'});
            const data = await response.json();
            this.setState ({
                employeeInfo: data,
                invalidSearch: false,
                queryAll: false
            })
        }
        catch (err) {
            console.log(err);
            alert("INVALID ID OR ID DOES NOT EXISTS");
            this.setState ({
                invalidSearch: true
            })
        }
    }

    componentDidMount = () => {
        this.getAllEmployees();
        //console.log(this.state.employeeArray[0]);
    }

    async getAllEmployees() {
        try {
            const response = await fetch(`employee`, {method: 'GET'});
            const data = await response.json();
            this.setState ({
                employeeArray: data
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    renderTableHeader = () => {
        var keys = Object.keys(this.state.employeeInfo);
        let jsxArray = [];
        for (let i = 0; i < keys.length; i++) {
            jsxArray.push(<th key={i}>{keys[i]}</th>);
        }
        return jsxArray;
    }

    renderTableRows = () => {
        var keys = Object.keys(this.state.employeeInfo);
        let jsxArray = [];
        jsxArray.push(<td>{this.state.employeeInfo.employee_id}</td>);
        jsxArray.push(<td>{this.state.employeeInfo.first_name}</td>);
        jsxArray.push(<td>{this.state.employeeInfo.last_name}</td>);
        jsxArray.push(<td>{this.state.employeeInfo.birthday}</td>);
        jsxArray.push(<td>{this.state.employeeInfo.ssn}</td>);
        jsxArray.push(<td>{this.state.employeeInfo.sex}</td>);
        jsxArray.push(<td>{this.state.employeeInfo.marital_status}</td>);
        jsxArray.push(<td>{this.state.employeeInfo.job_id}</td>);
        jsxArray.push(<td>{this.state.employeeInfo.crew_id}</td>);
        return jsxArray;
    }

    renderTableHeaderAll = () => {
        var keys = Object.keys(this.state.employeeArray[0]);
        let jsxArray = [];
        for (let i = 0; i < keys.length; i++) {
            jsxArray.push(<th key={i}>{keys[i]}</th>);
        }
        return jsxArray;
    }

    renderTableRowsAll = () => {
        var keys = Object.keys(this.state.employeeArray[0]);
        let jsxArray = [];
        for (let i = 0; i < this.state.employeeArray.length; i++) {
            jsxArray.push(<tr><td>{this.state.employeeArray[i].employee_id}</td>
            <td>{this.state.employeeArray[i].first_name}</td>
            <td>{this.state.employeeArray[i].last_name}</td>
            <td>{this.state.employeeArray[i].birthday}</td>
            <td>{this.state.employeeArray[i].ssn}</td>
            <td>{this.state.employeeArray[i].sex}</td>
            <td>{this.state.employeeArray[i].marital_status}</td>
            <td>{this.state.employeeArray[i].job_id}</td>
            <td>{this.state.employeeArray[i].crew_id}</td></tr>);
        }
        return jsxArray;
    }

    async insertRequest() {
        try {
            const response = await fetch(`employee`, {method: 'POST',
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(this.state.insertObject)});
            const data = await response.json();
            this.setState ({
                insertForm: false,
                queryAll: true,
                insertObject: {
                    employee_id: '',
                    first_name: '',
                    last_name: '',
                    birthday: '',
                    ssn: '',
                    sex: '',
                    marital_status: '',
                    job_id: '',
                    crew_id: ''
                }
            })
            //this.getAllEmployees();
            alert("Success");
        }
        catch (err) {
            alert("Unsuccessful");
            console.log(err);
        }
    }

    async deleteRequest() {
        try {
            const response = await fetch(`employee/${this.state.employeeInfo.employee_id}`, {method: 'DELETE'});
            const data = await response.json();
            //this.getAllEmployees();
            this.setState ({
                queryAll: true
            })
            alert(JSON.stringify(data));
        }
        catch (err) {
            alert("Unsuccessful");
            console.log(err);
        }
    }

    async updateRequest() {
        try {
            const response = await fetch(`employee/${this.state.employeeInfo.employee_id}`, {method: 'PUT',
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(this.state.employeeInfoUpdate)});
            const data = await response.json();
            this.setState ({
                updateForm: false,
                queryAll: true,
                employeeInfoUpdate: {
                    employee_id: '',
                    first_name: '',
                    last_name: '',
                    birthday: '',
                    ssn: '',
                    sex: '',
                    marital_status: '',
                    job_id: '',
                    crew_id: ''
                }
            })
            //this.getAllEmployees();
            alert("Success");
        }
        catch (err) {
            alert("Unsuccessful");
            console.log(err);
        }
    }

    insertSubmit = () => {
        this.insertRequest();
    }

    updateSubmit = () => {
        this.updateRequest();
    }

    handleInsert = () => {
        this.setState ({
            insertForm: true,
            queryAll: false,
            invalidSearch: false,
            employeeInfo: null,
            updateForm: false
        });
    }

    handleUpdate = () => {
        let temp = !this.state.updateForm;

        //copy employeeInfo to employeeInfoUpdate
        let clone = Object.assign({}, this.state.employeeInfo);

        this.setState ({
            updateForm: temp,
            insertForm: false,
            invalidSearch: false,
            employeeInfoUpdate: clone
        })
    }

    handleDelete = () => {
        this.deleteRequest();
    }

    render() {
        return (
            <div className="searchClass">

                <button onClick={this.handleQueryAll}>Toggle show all employees</button>

                <div className="inpurWrapper">
                    <form onSubmit={this.handleSearchSubmission} className="searchIDForm">
                        <label>Enter employee ID: </label>
                        <input 
                                autocomplete="off"
                                pattern = "[A-Z][0-9]+"
                                maxLength = "6"
                                minLength = "6"
                                title = "Correct format: E#####"
                                type="text" 
                                id="searchInput"
                                value={this.state.searchInput}
                                onChange={this.handleSearchInput}
                                placeholder="E00000"/>
                    </form>
                </div>

                {/* insert,update, delete */}
                <div className = "buttonWrapper">
                    <button className = "insertButtonClass" onClick = {this.handleInsert}>Insert</button>
                    <button className = "updateButtonClass" onClick = {this.handleUpdate} disabled = {this.state.queryAll || this.state.employeeInfo === null ? true : false}>Update</button>
                    <button className = "deleteButtonClass" onClick = {this.handleDelete} disabled = {this.state.queryAll || this.state.employeeInfo === null ? true : false}>Delete</button>
                </div>

                {/* insertForm */}
                { this.state.insertForm && !this.state.queryAll && !this.state.invalidSearch && this.state.employeeInfo === null &&
                    <form className = "insertFormClass" onSubmit = {this.insertSubmit}>
                        <label className = "leftCol">Employee ID: </label>
                        <input 
                            autocomplete="off"
                            pattern = "[A-Z][0-9]+"
                            maxLength = "6"
                            minLength = "6"
                            title = "Correct format: E#####"
                            className = "rightCol"
                            placeholder = "E00000"
                            type="text" 
                            value={this.state.insertObject.employee_id}
                            onChange={event => {
                                this.setState({
                                    insertObject: {
                                        ...this.state.insertObject,
                                        employee_id: event.target.value
                                    }
                                });
                            }}/>
                        <br />
                        <label className = "leftCol">First name: </label>
                        <input 
                            autocomplete="off"
                            pattern = "[a-zA-Z]+"
                            maxLength = "20"
                            minLength = "1"
                            title = "20 characters or less"
                            className = "rightCol"
                            type="text" 
                            value={this.state.insertObject.first_name}
                            onChange={event => {
                                this.setState({
                                    insertObject: {
                                        ...this.state.insertObject,
                                        first_name: event.target.value
                                    }
                                });
                            }}/>
                        <br />
                        <label className = "leftCol">Last name: </label>
                        <input 
                            autocomplete="off"
                            pattern = "[a-zA-Z]+"
                            maxLength = "25"
                            minLength = "1"
                            title = "25 characters or less"
                            className = "rightCol"
                            type="text" 
                            value={this.state.insertObject.last_name}
                            onChange={event => {
                                this.setState({
                                    insertObject: {
                                        ...this.state.insertObject,
                                        last_name: event.target.value
                                    }
                                });
                            }}/>
                        <br />
                        <label className = "leftCol">Birthday: </label>
                        <input 
                            autocomplete = "off"
                            maxLength = "10"
                            minLength = "10"
                            pattern = "\d\d\d\d-\d\d-\d\d"
                            title="Correct format: YYYY-MM-DD"
                            className = "rightCol"
                            placeholder = "YYYY-MM-DD"
                            type="text" 
                            value={this.state.insertObject.birthday}
                            onChange={event => {
                                this.setState({
                                    insertObject: {
                                        ...this.state.insertObject,
                                        birthday: event.target.value
                                    }
                                });
                            }}/>
                        <br />
                        <label className = "leftCol">SSN: </label>
                        <input 
                            autocomplete = "off"
                            maxLength = "11"
                            minLength = "11"
                            pattern = "\d\d\d-\d\d-\d\d\d\d"
                            title="Correct format: ###-##-####"
                            className = "rightCol"
                            placeholder = "000-00-0000"
                            type="text" 
                            value={this.state.insertObject.ssn}
                            onChange={event => {
                                this.setState({
                                    insertObject: {
                                        ...this.state.insertObject,
                                        ssn: event.target.value
                                    }
                                });
                            }}/>
                        <br />
                        <label className = "leftCol">Sex: </label>
                        <div className = "rightCol">
                            <input type="radio" name="gender" id="m" value="Male" onChange={event => {
                                    this.setState({
                                        insertObject: {
                                            ...this.state.insertObject,
                                            sex: event.target.value
                                        }
                                    });
                                }}/>
                            <label htmlFor="male">Male</label>
                            <input type="radio" name="gender" id="f" value="Female" onChange={event => {
                                    this.setState({
                                        insertObject: {
                                            ...this.state.insertObject,
                                            sex: event.target.value
                                        }
                                    });
                                }}/>
                            <label htmlFor="female">Female</label>
                        </div>
                        <br />
                        <label className = "leftCol">Marital status: </label>
                        <div className = "rightCol">
                            <input type="radio" name="marital" id="s" value="Single" onChange={event => {
                                    this.setState({
                                        insertObject: {
                                            ...this.state.insertObject,
                                            marital_status: event.target.value
                                        }
                                    });
                                }}/>
                            <label htmlFor="Single">Single</label>
                            <input type="radio" name="marital" id="d" value="Divorced" onChange={event => {
                                    this.setState({
                                        insertObject: {
                                            ...this.state.insertObject,
                                            marital_status: event.target.value
                                        }
                                    });
                                }}/>
                            <label htmlFor="Divorced">Divorced</label>
                            <input type="radio" name="marital" id="m" value="Married" onChange={event => {
                                    this.setState({
                                        insertObject: {
                                            ...this.state.insertObject,
                                            marital_status: event.target.value
                                        }
                                    });
                                }}/>
                            <label htmlFor="Married">Married</label>
                        </div>
                        <br />
                        <label className = "leftCol">Job ID: </label>
                        <input 
                            autoComplete = "off"
                            minLength = "2"
                            maxlength = "2"
                            pattern = "[A-Z]+"
                            title = "2 capitalized characters"
                            className = "rightCol"
                            placeholder = "CS"
                            type="text" 
                            value={this.state.insertObject.job_id}
                            onChange={event => {
                                this.setState({
                                    insertObject: {
                                        ...this.state.insertObject,
                                        job_id: event.target.value
                                    }
                                });
                            }}/>
                        <br />
                        <label className = "leftCol">Crew ID: </label>
                        <input 
                            autocomplete="off"
                            pattern = "[A-Z][0-9]+"
                            maxLength = "4"
                            minLength = "4"
                            title = "[A-Z] and 3 digits"
                            className = "rightCol"
                            placeholder = "C000"
                            type="text" 
                            value={this.state.insertObject.crew_id}
                            onChange={event => {
                                this.setState({
                                    insertObject: {
                                        ...this.state.insertObject,
                                        crew_id: event.target.value
                                    }
                                });
                            }}/>
                        <br />

                        <button type="submit">Submit</button>
                    </form>
                }

                {/* display database */}
                <table>
                    <tr>
                        {this.state.employeeInfo !== null && !this.state.invalidSearch && !this.state.queryAll && this.renderTableHeader()}
                    </tr>
                    <tr>
                        {this.state.employeeInfo !== null && !this.state.invalidSearch && !this.state.queryAll && this.renderTableRows()}
                    </tr>
                </table>

                <table className = "employeeTableClass">
                    <tr>
                        {this.state.employeeArray !== null && this.state.queryAll && this.renderTableHeaderAll()}
                    </tr>
                    {this.state.employeeArray !== null && this.state.queryAll && this.renderTableRowsAll()}
                </table>

                {/* updateForm */}
                { !this.state.insertForm && !this.state.queryAll && !this.state.invalidSearch && this.state.employeeInfo !== null && this.state.updateForm &&
                    <form className = "updateFormClass" onSubmit = {this.updateSubmit}>
                        <label className = "leftCol">Employee ID: </label>
                        <input 
                            autocomplete="off"
                            pattern = "[A-Z][0-9]+"
                            maxLength = "6"
                            minLength = "6"
                            title = "Correct format: E#####"
                            className = "rightCol"
                            placeholder = "E00000"
                            type="text" 
                            value={this.state.employeeInfoUpdate.employee_id}
                            onChange={event => {
                                this.setState({
                                    employeeInfoUpdate: {
                                        ...this.state.employeeInfoUpdate,
                                        employee_id: event.target.value
                                    }
                                });
                            }}/>
                        <br />
                        <label className = "leftCol">First name: </label>
                        <input 
                            autocomplete="off"
                            pattern = "[a-zA-Z]+"
                            maxLength = "20"
                            minLength = "1"
                            title = "20 characters or less"
                            className = "rightCol"
                            type="text" 
                            value={this.state.employeeInfoUpdate.first_name}
                            onChange={event => {
                                this.setState({
                                    employeeInfoUpdate: {
                                        ...this.state.employeeInfoUpdate,
                                        first_name: event.target.value
                                    }
                                });
                            }}/>
                        <br />
                        <label className = "leftCol">Last name: </label>
                        <input 
                            autocomplete="off"
                            pattern = "[a-zA-Z]+"
                            maxLength = "25"
                            minLength = "1"
                            title = "25 characters or less"
                            className = "rightCol"
                            type="text" 
                            value={this.state.employeeInfoUpdate.last_name}
                            onChange={event => {
                                this.setState({
                                    employeeInfoUpdate: {
                                        ...this.state.employeeInfoUpdate,
                                        last_name: event.target.value
                                    }
                                });
                            }}/>
                        <br />
                        <label className = "leftCol">Birthday: </label>
                        <input 
                            autocomplete = "off"
                            minLength = "10"
                            title="YYYY-MM-DD"
                            className = "rightCol"
                            placeholder = "YYYY-MM-DD"
                            type="text" 
                            value={this.state.employeeInfoUpdate.birthday}
                            onChange={event => {
                                this.setState({
                                    employeeInfoUpdate: {
                                        ...this.state.employeeInfoUpdate,
                                        birthday: event.target.value
                                    }
                                });
                            }}/>
                        <br />
                        <label className = "leftCol">SSN: </label>
                        <input 
                            autocomplete = "off"
                            maxLength = "11"
                            minLength = "11"
                            pattern = "\d\d\d-\d\d-\d\d\d\d"
                            title="Correct format: ###-##-####"
                            className = "rightCol"
                            placeholder = "000-00-0000"
                            type="text" 
                            value={this.state.employeeInfoUpdate.ssn}
                            onChange={event => {
                                this.setState({
                                    employeeInfoUpdate: {
                                        ...this.state.employeeInfoUpdate,
                                        ssn: event.target.value
                                    }
                                });
                            }}/>
                        <br />
                        <label className = "leftCol">Sex: </label>
                        <div className = "rightCol">
                            <input type="radio" name="gender" id="m" value="Male" checked={this.state.employeeInfoUpdate.sex === 'Male' ? true : false} onChange={event => {
                                    this.setState({
                                        employeeInfoUpdate: {
                                            ...this.state.employeeInfoUpdate,
                                            sex: event.target.value
                                        }
                                    });
                                }}/>
                            <label htmlFor="male">Male</label>
                            <input type="radio" name="gender" id="f" value="Female" checked={this.state.employeeInfoUpdate.sex === 'Female' ? true : false} onChange={event => {
                                    this.setState({
                                        employeeInfoUpdate: {
                                            ...this.state.employeeInfoUpdate,
                                            sex: event.target.value
                                        }
                                    });
                                }}/>
                            <label htmlFor="female">Female</label>
                        </div>
                        <br />
                        <label className = "leftCol">Marital status: </label>
                        <div className = "rightCol">
                            <input type="radio" name="marital" id="s" value="Single" checked={this.state.employeeInfoUpdate.marital_status === 'Single' ? true : false} onChange={event => {
                                    this.setState({
                                        employeeInfoUpdate: {
                                            ...this.state.employeeInfoUpdate,
                                            marital_status: event.target.value
                                        }
                                    });
                                }}/>
                            <label htmlFor="Single">Single</label>
                            <input type="radio" name="marital" id="d" value="Divorced" checked={this.state.employeeInfoUpdate.marital_status === 'Divorced' ? true : false} onChange={event => {
                                    this.setState({
                                        employeeInfoUpdate: {
                                            ...this.state.employeeInfoUpdate,
                                            marital_status: event.target.value
                                        }
                                    });
                                }}/>
                            <label htmlFor="Divorced">Divorced</label>
                            <input type="radio" name="marital" id="m" value="Married" checked={this.state.employeeInfoUpdate.marital_status === 'Married' ? true : false} onChange={event => {
                                    this.setState({
                                        employeeInfoUpdate: {
                                            ...this.state.employeeInfoUpdate,
                                            marital_status: event.target.value
                                        }
                                    });
                                }}/>
                            <label htmlFor="Married">Married</label>
                        </div>
                        <br />
                        <label className = "leftCol">Job ID: </label>
                        <input 
                            autoComplete = "off"
                            minLength = "2"
                            maxlength = "2"
                            pattern = "[A-Z]+"
                            title = "2 capitalized characters"
                            className = "rightCol"
                            placeholder = "CS"
                            type="text" 
                            value={this.state.employeeInfoUpdate.job_id}
                            onChange={event => {
                                this.setState({
                                    employeeInfoUpdate: {
                                        ...this.state.employeeInfoUpdate,
                                        job_id: event.target.value
                                    }
                                });
                            }}/>
                        <br />
                        <label className = "leftCol">Crew ID: </label>
                        <input 
                            autocomplete="off"
                            pattern = "[A-Z][0-9]+"
                            maxLength = "4"
                            minLength = "4"
                            title = "[A-Z] and 3 digits"
                            className = "rightCol"
                            placeholder = "C000"
                            type="text" 
                            value={this.state.employeeInfoUpdate.crew_id}
                            onChange={event => {
                                this.setState({
                                    employeeInfoUpdate: {
                                        ...this.state.employeeInfoUpdate,
                                        crew_id: event.target.value
                                    }
                                });
                            }}/>
                        <br />

                        <button type="submit">Submit</button>
                    </form>
                }


            </div>
        )
    }
}

export default  Search