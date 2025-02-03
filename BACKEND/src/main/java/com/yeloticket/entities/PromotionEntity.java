package com.yeloticket.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;


@Entity
@Table(name = "promotions")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromotionEntity extends BaseEntity {
        private String promoCode;
        private BigDecimal discountPercentage;
        private Date validFrom;
        private Date validUntil;
        private BigDecimal minPurchaseAmount;

        // Getters and Setters
    }

