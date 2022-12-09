DROP DATABASE IF EXISTS staff_db;
CREATE DATABASE staff_db;

USE staff_db;

-- Creates the departments table --
CREATE TABLE departments (
  -- ID --
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- name of departments --
  name VARCHAR(100) NOT NULL
);

-- Creates the roles table --
CREATE TABLE roles (
  -- ID --
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- name of role --
  name VARCHAR(100) NOT NULL,
  -- department the role falls under --
  department VARCHAR(100) NOT NULL,
  -- salery of the role --
  salery INT NOT NULL
);

-- Creates the employees table --
CREATE TABLE employees (
  -- ID --
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  --First name --
  firstName VARCHAR(100) NOT NULL, 
  --Last Name--
  lastName VARCHAR(100) NOT NULL,
  -- role --
  name VARCHAR(100) NOT NULL,
  -- department --
  department VARCHAR(100) NOT NULL,
  -- salery of the role --
  salery INT NOT NULL,
  --manager--
  manager VARCHAR(100) NOT NULL
);