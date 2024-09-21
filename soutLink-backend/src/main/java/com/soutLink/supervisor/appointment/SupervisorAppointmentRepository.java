package com.soutLink.supervisor.appointment;

import com.soutLink.enums.AppointmentStatus;
import com.soutLink.student.appointments.RequestAppointments;
import com.soutLink.user.Student.Student;
import com.soutLink.user.Supervisor.Supervisor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface SupervisorAppointmentRepository extends JpaRepository<SupervisorAppointment, Long> {

    List<SupervisorAppointment> findAllByRequestStudent(Student student);
    Page<SupervisorAppointment> findByRequestSupervisorAndStatus(Supervisor supervisor, AppointmentStatus status,
                                                                 Pageable pageable);
    Optional<SupervisorAppointment> findByRequestId(Long requestId);

    Optional<SupervisorAppointment> findByRequest(RequestAppointments request);

    List<SupervisorAppointment> findByRequestSupervisorAndStatusAndAppointmentDate(Supervisor supervisor,
                                                                                 AppointmentStatus status,
                                                                              String appointmentDate);

}
