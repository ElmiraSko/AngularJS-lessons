package ru.erasko.service;

import org.springframework.stereotype.Service;
import ru.erasko.model.Restaurant;

import java.util.ArrayList;
import java.util.List;

@Service
public class RestaurantService {

    List<Restaurant> restaurants = new ArrayList<>();
    {
        restaurants.add(new Restaurant("1", "Restaurant-1", "Address-1", "10-22"));
        restaurants.add(new Restaurant("2", "Restaurant-2", "Address-2", "11-23"));
        restaurants.add(new Restaurant("3", "Restaurant-3", "Address-3", "10-20"));
        restaurants.add(new Restaurant("4", "Restaurant-4", "Address-4", "10-17"));
        restaurants.add(new Restaurant("5", "Restaurant-5", "Address-4", "10-17"));
        restaurants.add(new Restaurant("6", "Restaur", "Address-4", "10-17"));
        restaurants.add(new Restaurant("7", "Restaur-4", "Address-4", "10-17"));
        restaurants.add(new Restaurant("8", "Reant-4", "Address-4", "10-17"));
        restaurants.add(new Restaurant("9", "Rerant-4", "Address-4", "10-17"));
        restaurants.add(new Restaurant("10", "Rstaura", "Address-4", "10-17"));
        restaurants.add(new Restaurant("14", "Resta==urant-4", "Address-4", "10-17"));
        restaurants.add(new Restaurant("47", "Rkkkjestaurant-4", "Address-4", "10-17"));
        restaurants.add(new Restaurant("49", "Rnt-4", "Address-4", "10-17"));
    }
    public List<Restaurant> findAll() {
        return restaurants;
    }
}
