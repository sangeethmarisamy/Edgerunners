package com.buildathon.academic.classroom;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classrooms")
public class ClassroomController {

    private final ClassroomRepository classroomRepository;

    public ClassroomController(ClassroomRepository classroomRepository) {
        this.classroomRepository = classroomRepository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Classroom createClassroom(@RequestBody Classroom classroom) {
        return classroomRepository.save(classroom);
    }

    @GetMapping
    public List<Classroom> getAllClassrooms() {
        return classroomRepository.findAll();
    }

    @GetMapping("/{id}")
    public Classroom getClassroomById(@PathVariable Long id) {
        return classroomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Classroom not found"));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteClassroom(@PathVariable Long id) {
        classroomRepository.deleteById(id);
    }
}
