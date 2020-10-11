package ru.erasko.model;

import java.io.Serializable;
import java.util.Objects;

public class Restaurant implements Serializable {
    private Integer id;
    private String name;
    private String description;
    private Contact contact;
    private String menu;

    public Restaurant(Integer id, String name, String description, Contact contact, String menu) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.contact = contact;
        this.menu = menu;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public String getMenu() {
        return menu;
    }

    public void setMenu(String menu) {
        this.menu = menu;
    }
}
