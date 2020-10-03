package ru.erasko.model;

public class Restaurant {
    private String id;
    private String name;
    private String address;
    private String time;

    public Restaurant(String id, String name, String address, String time) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.time = time;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public String getTime() {
        return time;
    }
}
