import { poolPromise } from "../utils/dbConnection.js";
const tableName = "employee";
class Employee {
  static async create(empData) {
      const pool = await poolPromise;
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        hireDate,
        salary,
        managerId,
        departmentId,
      } = empData;
      if (new Date(hireDate) > new Date())
        return { status: 400, msg: "Invalid date" };
      try{
      const sql = `insert into ${tableName}(employee_id,first_name,last_name,email,phone_number,hire_date,salary,manager_id,department_id) values(UUID(),?,?,?,?,?,?,?,?)`;
      const result = await pool.query(sql, [
        firstName,
        lastName,
        email,
        phoneNumber,
        hireDate,
        salary,
        managerId,
        departmentId,
      ]);
    }
    catch(err){
        return {status:409,msg:"Duplicate entry found"}
    }
      return { status: 200, msg: "Successfully added employee" };
  }

  static async update(empData) {
    try {
      const pool = await poolPromise;
      const { employeeId, salary } = empData;

      const old_data = await pool.query(
        `select salary from ${tableName} where employee_id=?`,
        [employeeId]
      );

      if (old_data[0].length <= 0) {
        return { status: 400, msg: "Employee not found" };
      }
      const old_salary = old_data[0][0].salary;
      if (salary < 0.2 * old_salary) {
        return { status: 400, msg: "Salary is not valid" };
      }

      const sql = `update ${tableName} set salary=? where employee_id = ?`;

      const result = await pool.query(sql, [salary, employeeId]);

      return { status: 200, msg: "Salary is successfully updated" };
    } catch (err) {
      console.log(err);
      return { status: 500, msg: "Internal server error" };
    }
  }

  static async assign(empData) {
    try {
      const pool = await poolPromise;
      const { employeeId, projectId, role, hoursWorked, departmentId } =
        empData;
      const empProject = await pool.query(
        `select e.employee_id,p.end_date,p.project_id from employee_projects ep join employee e join projects p on e.employee_id = ep.employee_id and p.project_id = ep.project_id where ep.employee_id = ? and current_date() > p.end_date`,
        [employeeId]
      );

      if (empProject[0].length > 0)
        return { status: 400, msg: "Employee not avilable" };

      const sql = `insert into employee_projects values(?,?,?,?,?)`;
      const result = await pool.query(sql, [
        employeeId,
        projectId,
        role,
        hoursWorked,
        departmentId,
      ]);
      return { status: 200, msg: "Project assigned successfully" };
    } catch (err) {
      console.log(err);
      return { status: 500, msg: "Internal server error" };
    }
  }

  static async delete(empData) {
    try {
      const pool = await poolPromise;
      const { employeeId } = empData;
      const empProject = await pool.query(`delete from ${tableName} where employee_id = ?`,[employeeId]);
      const emps = await pool.query(
        `select * from ${tableName} where manager_id = ?`,
        [employeeId]
      );
      if (emps[0].length > 0) {
        const managers = await pool.query(`select employee_id from ${tableName} where manager_id is null`)
        const mid = managers[0][0]["employee_id"]
        // console.log(mid)
        await pool.query(`update ${tableName} set manager_id = ${mid} where manager_id = ${employeeId}`);
      }
      // const sql = `insert into employee_projects values(?,?,?,?,?)`;
      // const result = await pool.query(sql,[employeeId,projectId,role,hoursWorked,departmentId]);
      return { status: 200, msg: "employee deletedsuccessfully" };
    } catch (err) {
      console.log(err);
      return { status: 500, msg: "Internal server error" };
    }
  }

  static async fetch(empData) {
    try {
      const {projectId} = empData;
      const pool = await poolPromise;
      const result = await pool.query(`select d.department_id,d.department_name,sum(budget) from projects p join departments d on p.department_id = d.department_id where p.project_id = ? group by d.department_id`,[projectId])
      return { status: 200, data: result[0] };
    } catch (err) {
      console.log(err);
      return { status: 500, msg: "Internal server error" };
    }
  }

}


// duplicate entry - 409
export default Employee;
