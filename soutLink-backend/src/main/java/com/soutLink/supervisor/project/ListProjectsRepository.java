package com.soutLink.supervisor.project;

import com.soutLink.enums.SummaryStatus;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListProjectsRepository extends JpaRepository<ListProjects, Long> {
    ListProjects findBySupervisorIdAndStatus(Long userId, SummaryStatus summaryStatus);
    List<ListProjects> findAllByStatus(SummaryStatus summaryStatus, Sort sort);


}
