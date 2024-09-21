package com.soutLink.student.appointments;

import com.soutLink.enums.AppointmentStatus;
import com.soutLink.user.Student.Student;
import com.soutLink.user.Supervisor.Supervisor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequestAppointmentRepository extends JpaRepository<RequestAppointments, Long> {

    Page<RequestAppointments> findAllBySupervisorAndCompleteFalse(Supervisor supervisor, Pageable pageable);
    List<RequestAppointments> findAllBySupervisorAndCompleteFalse(Supervisor supervisor);
    Optional<RequestAppointments> findByIdAndSupervisor(Long requestId, Supervisor supervisor);

    List<RequestAppointments> findByStudent(Student student);
}
