package com.yeloticket.repository;

import com.yeloticket.entities.TicketEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRespository extends JpaRepository<TicketEntity, Long> {

}
