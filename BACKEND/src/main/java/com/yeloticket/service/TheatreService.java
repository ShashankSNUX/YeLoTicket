package com.yeloticket.service;

import com.yeloticket.entities.TheatreEntity;
import com.yeloticket.repository.TheatreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
@Service
@Transactional
public class TheatreService {
    @Autowired
    private TheatreRepository theatreRepository;

    public List<TheatreEntity> getAllDetails(){
        return theatreRepository.findAll();
    }
}
