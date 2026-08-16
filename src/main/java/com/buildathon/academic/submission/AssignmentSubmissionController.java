package com.buildathon.academic.submission;

import com.buildathon.academic.assignment.Assignment;
import com.buildathon.academic.assignment.AssignmentRepository;
import com.buildathon.academic.student.Student;
import com.buildathon.academic.student.StudentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class AssignmentSubmissionController {

    private final AssignmentSubmissionRepository submissionRepository;
    private final StudentRepository studentRepository;
    private final AssignmentRepository assignmentRepository;

    public AssignmentSubmissionController(
            AssignmentSubmissionRepository submissionRepository,
            StudentRepository studentRepository,
            AssignmentRepository assignmentRepository) {

        this.submissionRepository = submissionRepository;
        this.studentRepository = studentRepository;
        this.assignmentRepository = assignmentRepository;
    }

    @GetMapping
    public List<AssignmentSubmission> getAllSubmissions() {
        return submissionRepository.findAll();
    }

    @GetMapping("/{id}")
    public AssignmentSubmission getSubmissionById(@PathVariable Long id) {
        return submissionRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Submission not found"));
    }

    @GetMapping("/student/{studentId}")
    public List<AssignmentSubmission> getStudentSubmissions(
            @PathVariable Long studentId) {

        return submissionRepository.findByStudentId(studentId);
    }

    @GetMapping("/assignment/{assignmentId}")
    public List<AssignmentSubmission> getAssignmentSubmissions(
            @PathVariable Long assignmentId) {

        return submissionRepository.findByAssignmentId(assignmentId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AssignmentSubmission createSubmission(
            @RequestParam Long studentId,
            @RequestParam Long assignmentId,
            @RequestBody AssignmentSubmission submission) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Student not found"));

        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Assignment not found"));

        if (submissionRepository
                .findByStudentIdAndAssignmentId(studentId, assignmentId)
                .isPresent()) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Student has already submitted this assignment");
        }

        submission.setStudent(student);
        submission.setAssignment(assignment);

        if (submission.getSubmittedAt() == null) {
            submission.setSubmittedAt(LocalDateTime.now());
        }

        if (submission.getStatus() == null) {
            if (submission.getSubmittedAt().toLocalDate()
                    .isAfter(assignment.getDueDate())) {

                submission.setStatus(SubmissionStatus.LATE);

            } else {
                submission.setStatus(SubmissionStatus.SUBMITTED);
            }
        }

        return submissionRepository.save(submission);
    }

    @PutMapping("/{id}/grade")
    public AssignmentSubmission gradeSubmission(
            @PathVariable Long id,
            @RequestBody GradeSubmissionRequest request) {

        AssignmentSubmission submission = submissionRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Submission not found"));

        if (request.getMarks() == null || request.getMarks() < 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Marks cannot be negative");
        }

        Integer maxMarks = submission.getAssignment().getMaxMarks();

        if (maxMarks != null && request.getMarks() > maxMarks) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Marks cannot exceed assignment max marks: " + maxMarks);
        }

        submission.setMarks(request.getMarks());
        submission.setFeedback(request.getFeedback());
        submission.setStatus(SubmissionStatus.GRADED);

        return submissionRepository.save(submission);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSubmission(@PathVariable Long id) {

        if (!submissionRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Submission not found");
        }

        submissionRepository.deleteById(id);
    }
}
