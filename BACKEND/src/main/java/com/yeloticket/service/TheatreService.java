package com.yeloticket.service;

import com.yeloticket.dtos.DetailsDto;
import com.yeloticket.dtos.TheatreRequestDto;
import com.yeloticket.dtos.TheatreSeatRequest;
import com.yeloticket.entities.SeatType;
import com.yeloticket.entities.TheatreEntity;
import com.yeloticket.entities.TheatreSeatEntity;
import com.yeloticket.repository.TheatreRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TheatreService {
    @Autowired
    private TheatreRepository theatreRepository;

    @Autowired
    private ModelMapper mapper;

    public List<TheatreEntity> getAllDetails() {
        List<TheatreEntity> theatres = theatreRepository.findAll();
        return theatres;
    }

    public String addTheater(TheatreRequestDto theatreRequest) throws Exception {

        TheatreEntity theater = theatreRepository.findByName(theatreRequest.getName());

        if (theatreRepository.findByName(theatreRequest.getName()) != null && theater.getLocation().equals(theatreRequest.getLocation())) {
            throw new Exception("Theater already exists");
        }

        theater = mapper.map(theatreRequest, TheatreEntity.class);

        theatreRepository.save(theater);
        return "Theater has been saved Successfully";
    }

    public String addTheaterSeat(TheatreSeatRequest entryDto) throws Exception {
        if (theatreRepository.findByName(entryDto.getName()) == null) {
            throw new Exception("Theatre Does not exist");
        }

        Integer noOfSeatsInRow = entryDto.getNoOfSeatInRow();
        Integer noOfPremiumSeats = entryDto.getNoOfPremiumSeat();
        Integer noOfClassicSeat = entryDto.getNoOfClassicSeat();
        String name = entryDto.getName();

        TheatreEntity theater = theatreRepository.findByName(name);

        List<TheatreSeatEntity> seatList = theater.getTheaterSeatList();

        int counter = 1;
        int fill = 0;
        char ch = 'A';

        for (int i = 1; i <= noOfClassicSeat; i++) {
            String seatNo = Integer.toString(counter) + ch;

            ch++;
            fill++;
            if (fill == noOfSeatsInRow) {
                fill = 0;
                counter++;
                ch = 'A';
            }

            TheatreSeatEntity theaterSeat = new TheatreSeatEntity();
            theaterSeat.setSeatNo(seatNo);
            theaterSeat.setSeatType(SeatType.CLASSIC);
            theaterSeat.setTheatre(theater);
            seatList.add(theaterSeat);
        }

        for (int i = 1; i <= noOfPremiumSeats; i++) {
            String seatNo = Integer.toString(counter) + ch;

            ch++;
            fill++;
            if (fill == noOfSeatsInRow) {
                fill = 0;
                counter++;
                ch = 'A';
            }

            TheatreSeatEntity theaterSeat = new TheatreSeatEntity();
            theaterSeat.setSeatNo(seatNo);
            theaterSeat.setSeatType(SeatType.PREMIUM);
            theaterSeat.setTheatre(theater);
            seatList.add(theaterSeat);
        }

        theatreRepository.save(theater);

        return "Theater Seats have been added successfully";
    }
}
