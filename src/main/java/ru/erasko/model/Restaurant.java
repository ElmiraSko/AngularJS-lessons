package ru.erasko.model;

import java.io.Serializable;
import java.util.Objects;

public class Restaurant implements Serializable {
    private int id;
    private String name;
    private String address;
    private String email;
    private String time;

    public Restaurant(int id, String name, String address, String email, String time) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.email = email;
        this.time = time;
    }

    public int getId() {
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

    public String getEmail() {
        return email;
    }

    @Override
    public String toString() {
        return "Restaurant{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                ", time='" + time + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Restaurant that = (Restaurant) o;
        return id == that.id &&
                name.equals(that.name) &&
                address.equals(that.address) &&
                email.equals(that.email) &&
                time.equals(that.time);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, address, email, time);
    }
}
