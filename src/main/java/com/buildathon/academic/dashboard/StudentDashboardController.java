package com.buildathon.academic.dashboard;

import com.buildathon.academic.assignment.Assignment;
import com.buildathon.academic.assignment.AssignmentRepository;
import com.buildathon.academic.attendance.Attendance;
import com.buildathon.academic.attendance.AttendanceRepository;
import com.buildathon.academic.exam.Exam;
import com.buildathon.academic.exam.ExamRepository;
import com.buildathon.academic.grade.Grade;
import com.buildathon.academic.grade.GradeRepository;
import com.buildathon.academic.student.Student;
import com.buildathon.academic.student.StudentRepository;
import com.buildathon.academic.submission.AssignmentSubmission;
import com.buildathon.academic.submission.AssignmentSubmissionRepository;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
public class StudentDashboardController {

    private final StudentRepository studentRepository;
    private final AssignmentRepository assignmentRepository;
    private final AssignmentSubmissionRepository submissionRepository;
    private final GradeRepository gradeRepository;
    private final AttendanceRepository attendanceRepository;
    private final ExamRepository examRepository;

    public StudentDashboardController(
            StudentRepository studentRepository,
            AssignmentRepository assignmentRepository,
            AssignmentSubmissionRepository submissionRepository,
            GradeRepository gradeRepository,
            AttendanceRepository attendanceRepository,
            ExamRepository examRepository) {

        this.studentRepository = studentRepository;
        this.assignmentRepository = assignmentRepository;
        this.submissionRepository = submissionRepository;
        this.gradeRepository = gradeRepository;
        this.attendanceRepository = attendanceRepository;
        this.examRepository = examRepository;
    }

    @GetMapping("/{studentId}/dashboard")
    public Map<String, Object> getStudentDashboard(
            @PathVariable Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Student not found"));

        List<AssignmentSubmission> submissions =
                submissionRepository.findByStudentId(studentId);

        List<Grade> allGrades = gradeRepository.findAll();

        List<Grade> grades = allGrades.stream()
                .filter(grade ->
                        grade.getStudent() != null &&
                        grade.getStudent().getId().equals(studentId))
                .toList();

        List<Attendance> allAttendance = attendanceRepository.findAll();

        List<Attendance> attendance = allAttendance.stream()
                .filter(record ->
                        record.getStudent() != null &&
                        record.getStudent().getId().equals(studentId))
                .toList();

        List<Assignment> assignments =
                assignmentRepository.findAll();

        List<Exam> exams =
                examRepository.findAll();

        Map<String, Object> dashboard = new HashMap<>();

        dashboard.put("student", student);
        dashboard.put("assignments", assignments);
        dashboard.put("submissions", submissions);
        dashboard.put("grades", grades);
        dashboard.put("attendance", attendance);
        dashboard.put("exams", exams);

        return dashboard;
    }
}
