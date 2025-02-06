package com.yeloticket.service;

import com.yeloticket.dtos.DetailsDto;
import com.yeloticket.entities.TheatreEntity;
import com.yeloticket.repository.TheatreRepository;
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

    public DetailsDto getAllDetails() {
        List<TheatreEntity> theatres = theatreRepository.findAll();

        List<String> locations = theatres.stream()
                .map(TheatreEntity::getLocation)
                .distinct()
                .collect(Collectors.toList());

        List<String> cinemas = theatres.stream()
                .map(TheatreEntity::getName)
                .collect(Collectors.toList());

        return new DetailsDto(locations, cinemas);
    }
}
