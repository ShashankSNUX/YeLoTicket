package com.yeloticket.service;

import com.yeloticket.dtos.BookingRequestDto;
import com.yeloticket.dtos.BookingResponseDto;
import com.yeloticket.entities.ShowEntity;
import com.yeloticket.entities.ShowSeatEntity;
import com.yeloticket.entities.TicketEntity;
import com.yeloticket.entities.UserEntity;
import com.yeloticket.repository.BookingRespository;
import com.yeloticket.repository.ShowRepository;
import com.yeloticket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BookingService {

    @Autowired
    private BookingRespository bookingRespository;

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTService jwtService;

    public BookingResponseDto ticketBooking(BookingRequestDto bookingRequest, HttpServletRequest request) throws Exception {
        String authHeader = request.getHeader("Authorization");
        String token = authHeader.split(" ")[1].trim();
        String username = jwtService.extractUserName(token);
        Optional<ShowEntity> showOpt = showRepository.findById(bookingRequest.getShowId());

        if (showOpt.isEmpty()) {
            throw new Exception("Show does not exist");
        }

        UserEntity user = userRepository.findByUsername(username);

        if (user == null) {
            throw new Exception("User does not exist");
        }

        ShowEntity show = showOpt.get();

        Boolean isSeatAvailable = isSeatAvailable(show.getShowSeatList(), bookingRequest.getRequestSeats());

        if (!isSeatAvailable) {
            throw new Exception("Seats are not available");
        }

        updateSeatAvailability(show.getShowSeatList(), bookingRequest.getRequestSeats());

        Integer getPriceAndAssignSeats = getPriceAndAssignSeats(show.getShowSeatList(),	bookingRequest.getRequestSeats());

        String seats = listToString(bookingRequest.getRequestSeats());

        TicketEntity ticket = new TicketEntity();
        ticket.setTotalTicketsPrice(getPriceAndAssignSeats);
        ticket.setBookedSeats(seats);
        ticket.setUser(user);
        ticket.setShow(show);

        ticket = bookingRespository.save(ticket);

        user.getTicketList().add(ticket);
        show.getTicketList().add(ticket);
        userRepository.save(user);
        showRepository.save(show);

        BookingResponseDto bookingResponse = new BookingResponseDto();
        bookingResponse.setLocation(show.getTheatre().getLocation());
        bookingResponse.setMovieName(show.getMovie().getTitle());
        bookingResponse.setTheaterName(show.getTheatre().getName());
        bookingResponse.setTime(show.getTime());
        bookingResponse.setDate(show.getDate());
        bookingResponse.setBookedSeats(ticket.getBookedSeats());
        bookingResponse.setTotalPrice(ticket.getTotalTicketsPrice());

        return bookingResponse;
    }

    private Boolean isSeatAvailable(List<ShowSeatEntity> showSeatList, List<String> requestSeats) {
        for (ShowSeatEntity showSeat : showSeatList) {
            String seatNo = showSeat.getSeatNo();

            if (requestSeats.contains(seatNo) && !showSeat.getIsAvailable()) {
                return false;
            }
        }

        return true;
    }

    private Integer getPriceAndAssignSeats(List<ShowSeatEntity> showSeatList, List<String> requestSeats) {
        Integer totalAmount = 0;

        for (ShowSeatEntity showSeat : showSeatList) {
            if (requestSeats.contains(showSeat.getSeatNo())) {
                totalAmount += showSeat.getPrice();
                showSeat.setIsAvailable(Boolean.FALSE);
            }
        }

        return totalAmount;
    }

    private String listToString(List<String> requestSeats) {
        StringBuilder sb = new StringBuilder();

        for (String s : requestSeats) {
            sb.append(s).append(",");
        }

        return sb.toString();
    }

    private void updateSeatAvailability(List<ShowSeatEntity> showSeatList, List<String> requestSeats) {
        for (ShowSeatEntity showSeat : showSeatList) {
            if (requestSeats.contains(showSeat.getSeatNo())) {
                showSeat.setIsAvailable(false);
            }
        }
    }
}
