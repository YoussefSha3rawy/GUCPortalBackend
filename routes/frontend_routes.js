const express = require("express");
const jwt = require("jsonwebtoken");
const departmentModel = require("../models/department_model");
const courseModel = require("../models/course_model");
const academicMemberModel = require("../models/academic_member_model");
const hrMemberModel = require("../models/hr_member_model");
const roomModel = require('../models/room_model');
const facultyModel = require('../models/faculty_model');

const router = express.Router();


router.route("/get-academic-department")
.get(async (req, res) => {
    const token = jwt.decode(req.headers.token);
    const academicMember = await academicMemberModel.findOne({id: token.id});
    const department = await departmentModel.findById(academicMember.department);
    res.send(department);
});

router.route("/get-courses-by-department")
.get(async (req, res) => {
    let courses = await courseModel.find({department: req.query.department});
    res.send(courses);
});

router.route("/get-courses-by-academic")
.get(async (req, res) => {
    const courses = await courseModel.find({$or: [{courseInstructors: req.query.id}, {teachingAssistants: req.query.id}]});
    res.send(courses);
});

router.route("/get-rooms")
.get(async(req,res)=>{
    const rooms = await roomModel.find();
    res.send(rooms);
})

router.route("/get-academics")
.get(async(req,res)=>{
    const academics = await academicMemberModel.find();
    let departments = [];
    for (let i = 0; i<academics.length; i++) {
        if(academics[i].department==="UNASSIGNED") {
            departments.push(academics[i].department);
        }
        else {
            const department = await departmentModel.findOne({_id: academics[i].department});
            departments.push(department.name);
        }
    }
    let rooms = [];
    for (let i = 0; i<academics.length; i++) {
        const room = await roomModel.findOne({_id: academics[i].office});
        rooms.push(room.name);
    }

    res.send({academics: academics, departments: departments, rooms: rooms});
})

router.route("/get-hr-members")
.get(async(req,res)=>{
    const hrmembers = await hrMemberModel.find();
    let rooms = [];
    for (let i = 0; i<hrmembers.length; i++) {
        const room = await roomModel.findOne({_id: hrmembers[i].office});
        rooms.push(room.name);
    }
    res.send({hrmembers: hrmembers, rooms: rooms});
})

router.route("/get-faculties")
.get(async(req,res)=>{
    const faculties = await facultyModel.find();
    res.send(faculties);
})

router.route("/get-departments")
.get(async(req,res)=>{
    const departments = await departmentModel.find();
    let faculties = [];
    for (let i = 0; i<departments.length; i++) {
        if (departments[i].faculty==="UNASSIGNED") {
            faculties.push(departments[i].faculty);
        }
        else {
            const faculty = await facultyModel.findById(departments[i].faculty);
            faculties.push(faculty.name); 
        }
    }
    let heads = [];
    for (let i = 0; i<departments.length; i++) {
        if (departments[i].headOfDepartment==="UNASSIGNED") {
            heads.push(departments[i].headOfDepartment);
        }
        else {
            const headOfDepartment = await academicMemberModel.findOne({id: departments[i].headOfDepartment});
            heads.push(headOfDepartment.id); 
        }
    }
    
    res.send({departments: departments, faculties: faculties, heads: heads});
});

module.exports = router;