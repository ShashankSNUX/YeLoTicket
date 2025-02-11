package com.yeloticket.service;

import com.yeloticket.dtos.ShowRequestDto;
import com.yeloticket.dtos.ShowSeatRequestDto;
import com.yeloticket.entities.*;
import com.yeloticket.repository.MovieRepository;
import com.yeloticket.repository.ShowRepository;
import com.yeloticket.repository.TheatreRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ShowService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private TheatreRepository theaterRepository;

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private ModelMapper mapper;

    public String associateShowSeats(ShowSeatRequestDto showSeatRequest) throws Exception {
        Optional<ShowEntity> showOpt = showRepository.findById(showSeatRequest.getShowId());

        if (showOpt.isEmpty()) {
            throw new Exception("Show does not exist");
        }

        ShowEntity show = showOpt.get();
        TheatreEntity theater = show.getTheatre();

        List<TheatreSeatEntity> theaterSeatList = theater.getTheaterSeatList();

        List<ShowSeatEntity> showSeatList = show.getShowSeatList();

        for (TheatreSeatEntity theaterSeat : theaterSeatList) {
            ShowSeatEntity showSeat = new ShowSeatEntity();
            showSeat.setSeatNo(theaterSeat.getSeatNo());
            showSeat.setSeatType(theaterSeat.getSeatType());

            if (showSeat.getSeatType().equals(SeatType.CLASSIC)) {
                showSeat.setPrice((showSeatRequest.getPriceOfClassicSeat()));
            } else {
                showSeat.setPrice(showSeatRequest.getPriceOfPremiumSeat());
            }

            showSeat.setShow(show);
            showSeat.setIsAvailable(Boolean.TRUE);
            showSeat.setIsFoodContains(Boolean.FALSE);

            showSeatList.add(showSeat);
        }

        showRepository.save(show);

        return "Show seats have been associated successfully";
    }

    public String addShow(ShowRequestDto showRequest) throws Exception {
        ShowEntity show = new ShowEntity();
        show.setDate(showRequest.getShowDate());
        show.setTime(showRequest.getShowStartTime());

        Optional<MovieEntity> movieOpt = movieRepository.findById(showRequest.getMovieId());
        if (movieOpt.isEmpty()) {
            throw new Exception("Movie does not exist");
        }

        Optional<TheatreEntity> theaterOpt = theaterRepository.findById(showRequest.getTheaterId());
        if (theaterOpt.isEmpty()) {
            throw new Exception("Theatre does not exist");
        }

        MovieEntity movie = movieOpt.get();
        TheatreEntity theater = theaterOpt.get();

        show.setMovie(movie);
        show.setTheatre(theater);
        show = showRepository.save(show);

        movie.getShows().add(show);
        theater.getShowList().add(show);

        movieRepository.save(movie);
        theaterRepository.save(theater);

        return "Show has been added Successfully";
    }

    public List<ShowEntity> getAll(Long id) {
        return showRepository.findAllByTheatreId(id);
    }

    public List<ShowSeatEntity> getById(Long id) {
        return showRepository.findById(id).get().getShowSeatList();
    }

    public String deleteShow(Long showId) throws Exception {
        Optional<ShowEntity> showOpt = showRepository.findById(showId);

        if (showOpt.isEmpty()) {
            throw new Exception("Show does not exist");
        }

        ShowEntity show = showOpt.get();

        // Remove the show seats associated with this show
        List<ShowSeatEntity> showSeats = show.getShowSeatList();
        if (!showSeats.isEmpty()) {
            showSeats.clear(); // Clearing the list to remove associations
        }

        // Remove the show from related movie and theatre entities
        MovieEntity movie = show.getMovie();
        TheatreEntity theatre = show.getTheatre();

        if (movie != null) {
            movie.getShows().remove(show);
            movieRepository.save(movie);
        }

        if (theatre != null) {
            theatre.getShowList().remove(show);
            theaterRepository.save(theatre);
        }

        // Delete the show
        showRepository.delete(show);

        return "Show and its associated seats have been deleted successfully";
    }

}
