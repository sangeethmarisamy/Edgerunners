package com.buildathon.academic.submission;

public class GradeSubmissionRequest {

    private Integer marks;
    private String feedback;

    public GradeSubmissionRequest() {
    }

    public Integer getMarks() {
        return marks;
    }

    public void setMarks(Integer marks) {
        this.marks = marks;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}
