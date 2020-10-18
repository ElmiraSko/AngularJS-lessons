package ru.erasko.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.erasko.model.ItemMenu;
import ru.erasko.model.Restaurant;
import ru.erasko.service.RestaurantService;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantsController {
    private static final Logger logger = LoggerFactory.getLogger(RestaurantsController.class);

    private RestaurantService restaurantService;

    @Autowired
    public void setRestaurantService(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    // возвращает json - список ресторанов
    @GetMapping
    public List<Restaurant> findAllRestaurant() {
        return  restaurantService.findAll();
    }

    // возвращает json для страницы с меню
    @GetMapping("/menu")
    public List<ItemMenu> findAllMenu() {
        return  restaurantService.findAllMenu();
    }

// получает json для добавления ресторана
    @PostMapping
    public void addRestaurant(@RequestBody Restaurant restaurant) {
        restaurantService.addRestaurant(restaurant);
    }

    @PostMapping("/delete")
    public void deleteRestaurant(@RequestBody Restaurant restaurant) {
        logger.info(restaurant.toString());
        restaurantService.deleteRestaurant(restaurant);
    }

}
