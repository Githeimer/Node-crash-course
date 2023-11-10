const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) {
      this.employees = data;
    },
  };
  
  // CRUD
  
  // create
  const createNewEmployee = (req, res) => {
    const newEmployee = {
      id: data.employees[data.employees.length - 1].id + 1 || 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };
  
    if (!newEmployee.firstname || !newEmployee.lastname) {
      return res.status(400).json({ message: 'First and Last Names are required!' });
    }
  
    data.setEmployees([...data.employees, newEmployee]); 
    res.status(201).json(data.employees);
  };
  
  // read
  const getAllEmployees = (req, res) => {
    res.json(data.employees);
  };
  
  // update
  const updateEmployee = (req, res) => {
    const employeeId = parseInt(req.body.id);
    const findEmployeeByID = (emp) => emp.id === employeeId;
    const editedEmployee = data.employees.find(findEmployeeByID);
  
    if (!editedEmployee) {
      return res.status(400).json({ message: `employee id ${req.body.id} not found` });
    }
  
    if (req.body.firstname) editedEmployee.firstname = req.body.firstname;
    if (req.body.lastname) editedEmployee.lastname = req.body.lastname;
  
    const filteredArray = data.employees.filter((emp) => emp.id !== employeeId);
    const unsortedArray = [...filteredArray, editedEmployee];
    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
  };
  
  // delete
  const deleteEmployee = (req, res) => {
    const employeeId = parseInt(req.body.id);
    const findEmployeeByID = (emp) => emp.id === employeeId;
    const deletedemployee = data.employees.find(findEmployeeByID);
  
    if (!deletedemployee) {
      return res.status(400).json({ message: `Employee id ${employeeId} not found` });
    }
  
    const filteredArray = data.employees.filter((emp) => emp.id !== employeeId);
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
  };
  
  const getAnEmployee = (req, res) => {
    const employeeId = parseInt(req.params.id);
    const findEmployeeByID = (emp) => emp.id === employeeId;
    const getOneEmployee = data.employees.find(findEmployeeByID);
  
    if (!getOneEmployee) {
      return res.status(400).json({ message: `Employee id ${employeeId} not found` });
    }
    res.json(getOneEmployee);
  };
  
  module.exports = {
    createNewEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee,
    getAnEmployee,
  };
  