package ru.erasko.model;

public class Contact {
    private Integer id;
    private String address;
    private String phone;
    private String email;
    private String website;

    public Contact(Integer id, String address, String phone, String email, String website) {
        this.id = id;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.website = website;
    }

    public Integer getId() {
        return id;
    }

    public String getAddress() {
        return address;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getWebsite() {
        return website;
    }
}
