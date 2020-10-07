package ru.erasko.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
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
        restaurants.add(new Restaurant(1, "Aestaurant-1", "Address-1", "wert@rr.ru", "10-22"));
        restaurants.add(new Restaurant(2, "Bestaurant-2", "Address-2", "tynu@cc.ru", "11-23"));
        restaurants.add(new Restaurant(3, "Cestaurant-3", "Address-3", "rest@rr.ru", "10-20"));
        restaurants.add(new Restaurant(4, "Restaurant-4", "Address-4", "asdf@rr.ru", "10-17"));
        restaurants.add(new Restaurant(5, "Destaurant-5", "Address-4", "utrrr@rr.ru", "10-17"));
        restaurants.add(new Restaurant(6, "Restaur", "Address-4", "asda@rr.ru", "10-17"));
        restaurants.add(new Restaurant(7, "Eestaur-4", "Address-4", "logfgg@rr.ru", "10-17"));
        restaurants.add(new Restaurant(8, "Keant-4", "Address-4", "vvcxc@rr.ru", "10-17"));
        restaurants.add(new Restaurant(9, "Werant-4", "Address-4", "oooppp@rr.ru", "10-17"));
        restaurants.add(new Restaurant(10, "Zstaura", "Address-4", "fffff@rr.ru", "10-17"));

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
                res.getAddress(),
                res.getEmail(),
                res.getTime()));
    }

    public void deleteRestaurant(Restaurant restaurant) {
        Restaurant rest = new Restaurant(restaurant.getId(),
                restaurant.getName(),
                restaurant.getAddress(),
                restaurant.getEmail(),
                restaurant.getTime());

        logger.info("service: " + rest.toString());
        logger.info("size: " + restaurants.size());
        restaurants.remove(rest);
        logger.info("size: " + restaurants.size());
    }
}

