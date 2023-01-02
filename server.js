const express = require('express');
const path = require('path');
//const exphbs = require('express-handlebars');
//const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.port || 5000;
const pool = require('./creds');
const cors = require('cors');

//for appending uses
const begin = `BEGIN TRANSACTION \n`;
const commit = `\nCOMMIT TRANSACTION \n`

//appending main queries
async function append_query(query){
    var fs = require('fs');
    fs.appendFile('query.sql',query +'\n', function (err){
        if (err) throw err});

    console.log('Query appended Successfully')
}

//appending transaction queries
async function append_trans(query){
    var fs = require('fs');
    fs.appendFile('transaction.sql',begin + query + commit, function (err){
        if (err) throw err});

    console.log('Transaction appended successfully')
}

// Set static folder
app.use(express.static('public'));

//middleware
app.use(cors());
app.use(express.json());


//create your endpoints/route handlers

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/about.html'));
});

//---------------------------------------------------------EMPLOYEE TAB----------------------------------------------------------------
// Display all data in employee table
app.get('/employee', async (req, res) => {
    try {
        const employee = await pool.query('SELECT * FROM employees');

        //appending query
        q = 'SELECT * FROM employees'
        await append_query(q);

        res.json(employee.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//Search for a particular employee
app.get('/employee/:id', async (req, res) => {
    try {
        const employeeInfo = await pool.query('SELECT * FROM employees WHERE employee_id = $1', [req.params.id]);
        console.log('Search completed');

        //appending query
        q = `SELECT * FROM employees WHERE employee_id = ${req.params.id}`;
        await append_query(q);

        res.json(employeeInfo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

//add employee
app.post('/employee', async (req, res) => {
    try {
        const { employee_id, first_name, last_name, birthday, ssn, sex, marital_status, job_id, crew_id} = req.body

        await pool.query(begin)
        const newEmployeee = await pool.query('INSERT INTO employees VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *', 
        [employee_id, first_name, last_name, birthday, ssn, sex, marital_status, job_id, crew_id]);
        await pool.query(commit)
        console.log('New employee added');

        //appending transaction
        q = `INSERT INTO employees VALUES 
        (${employee_id}, ${first_name}, ${last_name}, ${birthday}, ${ssn}, ${sex}, ${marital_status}, ${job_id}, ${crew_id}) 
        RETURNING *`;
        await append_trans(q)

        res.json(newEmployeee.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

//update employee
app.put("/employee/:id", async (req, res) => {
    try {
        const id = req.params.id
        const { first_name, last_name, birthday, ssn, sex, marital_status, job_id, crew_id } = req.body;

        await pool.query(begin)
        const updateEmployee = await pool.query(
            `UPDATE employees 
        SET first_name = $1, 
        last_name = $2, 
        birthday = $3, 
        ssn = $4,
        sex = $5,
        marital_status = $6,
        job_id = $7,
        crew_id = $8 
        WHERE employee_id = $9 RETURNING *`,
        [first_name, last_name, birthday, ssn, sex, marital_status, job_id, crew_id, id]
        );
        await pool.query(commit)
        res.json('Data updated');
        
        //appending transaction
        q = `UPDATE employees 
        SET first_name = ${first_name}, 
        last_name = ${last_name}, 
        birthday = ${birthday}, 
        ssn = ${ssn},
        sex = ${sex},
        marital_status = ${marital_status},
        job_id = ${job_id},
        crew_id = ${crew_id} 
        WHERE employee_id = ${id} RETURNING *`
        await append_trans(q)
        
    } catch (err) {
        console.error(err.message)
    }
})

//delete employee
app.delete("/employee/:id", async (req, res) => {
    try {
        const id = req.params.id
        await pool.query(begin)
        const employeeToBeRemove = await pool.query(
            `DELETE FROM employees WHERE employee_id = $1 RETURNING *`,[id]
        );
        await pool.query(commit)
        res.json(`Employee with ID:${id} is deleted from database`);

        //appending transaction
        q = `DELETE FROM employees WHERE employee_id = ${id} RETURNING *`
        await append_trans(q)

    } catch (err) {
        console.error(err.message)
    }
})
//-----------------------------------------------------------JOBS TAB-------------------------------------------
// Display all data in job table
app.get('/job', async (req, res) => {
    try {
        const job = await pool.query('SELECT * FROM jobs;');
        //append query
        q = 'SELECT * FROM jobs;'
        await append_query(q)

        res.json(job.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//Display all employee with this job id
app.get('/job/:id', async(req,res) =>{
    try {
        const id = req.params.id
        const job = await pool.query(`SELECT * FROM employees WHERE job_id LIKE UPPER($1);`,[id]);
        //appending query
        q = `SELECT * FROM employees WHERE job_id LIKE UPPER(${id});`
        append_query(q);

        res.json(job.rows);
    } catch (error) {
        console.log(error.message);
    }
});


//---------------------------------------------PAY ROLL--------------------------------------------------------------
//Display all payroll
app.get('/pay', async (req, res) => {
    try {
        const job = await pool.query('SELECT * FROM payroll;');
        //appending query
        q = 'SELECT * FROM payroll;'
        append_query(q)

        res.json(job.rows);
    } catch (error) {
        console.log(error.message);
    }
});
// Payroll sort by salary (DESCENDING)
app.get('/pay/sort_by_salary_descending', async (req, res) => {
    try {
        const job = await pool.query('SELECT * FROM payroll ORDER BY month_salary DESC;');
        //appending query
        q = 'SELECT * FROM payroll ORDER BY month_salary DESC;'
        append_query(q);

        res.json(job.rows);
    } catch (error) {
        console.log(error.message);
    }
});

// Payroll sort by salary (ASCENDING)
app.get('/pay/sort_by_salary_ascending', async (req, res) => {
    try {
        const job = await pool.query('SELECT * FROM payroll ORDER BY month_salary ASC;');
        //appending query
        q = 'SELECT * FROM payroll ORDER BY month_salary ASC;'
        append_query(q);

        res.json(job.rows);
    } catch (error) {
        console.log(error.message);
    }
});

// Payroll sort by hours worked
app.get('/pay/sort_by_hour', async (req, res) => {
    try {
        const job = await pool.query('SELECT * FROM payroll ORDER BY hours_worked DESC;');
        //appending query
        append_query('SELECT * FROM payroll ORDER BY hours_worked DESC;')

        res.json(job.rows);
    } catch (error) {
        console.log(error.message);
    }
});
// Payroll sort by overtime
app.get('/pay/sort_by_overtime', async (req, res) => {
    try {
        const job = await pool.query('SELECT * FROM payroll ORDER BY overtime DESC;');
        //appending query
        append_query('SELECT * FROM payroll ORDER BY overtime DESC;')
        
        res.json(job.rows);
    } catch (error) {
        console.log(error.message);
    }
});
//------------------------------------------------------------------------------------------------------------------
//404 error route
app.get('*', (req, res) => {
    res.send('My 404 page, url not found in directory')
});

//Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}, CTRL+C to end`));