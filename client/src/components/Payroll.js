import React, { Component } from 'react'

class Payroll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayAll: true,
            payrollData: ['']
        }
    }

    async getAllPayroll() {
        try {
            const response = await fetch(`pay`, {method: 'GET'});
            const data = await response.json();
            this.setState ({
                payrollData: data
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    async getAscPayroll() {
        try {
            const response = await fetch(`pay/sort_by_salary_ascending`, {method: 'GET'});
            const data = await response.json();
            this.setState ({
                payrollData: data
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    async getDesPayroll() {
        try {
            const response = await fetch(`pay/sort_by_salary_descending`, {method: 'GET'});
            const data = await response.json();
            this.setState ({
                payrollData: data
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    async getHourPayroll() {
        try {
            const response = await fetch(`pay/sort_by_hour`, {method: 'GET'});
            const data = await response.json();
            this.setState ({
                payrollData: data
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    async getOvertimePayroll() {
        try {
            const response = await fetch(`pay/sort_by_overtime`, {method: 'GET'});
            const data = await response.json();
            this.setState ({
                payrollData: data
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    componentDidMount = () => {
        this.getAllPayroll();
    }

    renderTableHeaderAll = () => {
        var keys = Object.keys(this.state.payrollData[0]);
        let jsxArray = [];
        for (let i = 0; i < keys.length; i++) {
            jsxArray.push(<th key={i}>{keys[i]}</th>);
        }
        return jsxArray;
    }

    renderTableRowsAll = () => {
        var keys = Object.keys(this.state.payrollData[0]);
        let jsxArray = [];
        for (let i = 0; i < this.state.payrollData.length; i++) {
            jsxArray.push(<tr><td>{this.state.payrollData[i].employee_id}</td>
            <td>{this.state.payrollData[i].job_id}</td>
            <td>{this.state.payrollData[i].month_salary}</td>
            <td>{this.state.payrollData[i].taxes}</td>
            <td>{this.state.payrollData[i].pay_rate}</td>
            <td>{this.state.payrollData[i].hours_worked}</td>
            <td>{this.state.payrollData[i].overtime}</td></tr>);
        }
        return jsxArray;
    }

    handleNormalDisplay() {
        this.getAllPayroll();
    }

    handleAsc = () => {
        this.getAscPayroll();
    }

    handleDes = () => {
        this.getDesPayroll();
    }

    handleHours = () => {
        this.getHourPayroll();
    }

    handleOvertime = () => {
        this.getOvertimePayroll();
    }



    render() {
        return (
            <div className = "payrollClass">
                <div className = "buttonWrapper">
                    <button onClick = {this.handleAsc} className = "payrollButtons">Sort by salary (ASCENDING)</button> 
                    <button onClick = {this.handleDes} className = "payrollButtons">Sort by salary (DESCENDING)</button>    
                    <button onClick = {this.handleHours} className = "payrollButtons">Sort by hours worked</button>  
                    <button onClick = {this.handleOvertime} className = "payrollButtons">Sort by overtime</button>
                </div>

                <table className = "payrollTableClass">
                    <tr>
                        { this.payrollData !== null &&this.renderTableHeaderAll()}
                    </tr>
                    {this.payrollData !== null && this.renderTableRowsAll()}
                </table>
            </div>
        )
    }
}

export default Payroll