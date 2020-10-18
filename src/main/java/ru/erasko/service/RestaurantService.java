package ru.erasko.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ru.erasko.model.Contact;
import ru.erasko.model.ItemMenu;
import ru.erasko.model.Restaurant;

import java.util.ArrayList;
import java.util.List;

@Service
public class RestaurantService {
    private static final Logger logger = LoggerFactory.getLogger(RestaurantService.class);

    List<Restaurant> restaurants = new ArrayList<>();
    List<ItemMenu> itemMenus = new ArrayList<>();

    {
        restaurants.add(new Restaurant(1, "Айсберг",
                "Отличный ресторан морепродуктов на любой вкус!",
                 new Contact(1, "ул. Малая, 15, Екатеринбург, Время: 10-22", "+7911923456543", "aysberg@am.ru", "hhtp://aysberg.com"),
                "меню"));
        restaurants.add(new Restaurant(2, "Быстро и вкусно",
                "Самый быстрый ресторан!",
                new Contact(2, "ул. Петрова, 20, Екатеринбург, Время: 8-22",  "+7911923456543", "eda@vsem.ru", "hhtp://eda.com"),
        "menu"));
        restaurants.add(new Restaurant(3, "Три бочки", "Самый сытный ресторан!",
                new Contact(3, "ул. Садовая, 7, Екатеринбург, Время: 8-19", "+7980454322", "E-mail: eda@dom.ru", "hhtp://eda-sem.com"),
                "menu"));

        itemMenus.add(new ItemMenu("1", "Маргарита", "100"));
        itemMenus.add(new ItemMenu("2", "Пепперони", "150"));
        itemMenus.add(new ItemMenu("3", "Фартуна", "100"));
        itemMenus.add(new ItemMenu("4", "Сырная", "260"));
        itemMenus.add(new ItemMenu("5", "Острая", "180"));
        itemMenus.add(new ItemMenu("6", "Грибная", "270"));
        itemMenus.add(new ItemMenu("7", "Цезарь", "260"));
        itemMenus.add(new ItemMenu("8", "Латук", "280"));
        itemMenus.add(new ItemMenu("9", "Грибная-острая", "300"));
    }

    public List<Restaurant> findAll() {
        return restaurants;
    }

    public List<ItemMenu> findAllMenu() {
        return itemMenus;
    }

    public void addRestaurant(Restaurant res) {
        restaurants.add(new Restaurant(res.getId(),
                res.getName(),
                res.getDescription(),
                res.getContact(),
                res.getMenu()));
    }

    public void deleteRestaurant(Restaurant restaurant) {
        Restaurant rest = new Restaurant(restaurant.getId(),
                restaurant.getName(),
                restaurant.getDescription(),
                restaurant.getContact(),
                restaurant.getMenu());

        logger.info("service: " + rest.toString());
        logger.info("size: " + restaurants.size());
        restaurants.remove(rest);
        logger.info("size: " + restaurants.size());
    }
}

