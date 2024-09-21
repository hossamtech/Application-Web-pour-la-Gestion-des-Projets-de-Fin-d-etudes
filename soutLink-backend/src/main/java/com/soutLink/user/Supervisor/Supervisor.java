package com.soutLink.user.Supervisor;


import com.soutLink.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("Supervisor")
@Table(name = "_supervisor")
public class Supervisor extends User {

    @Column(nullable = false)
    private String department;

}