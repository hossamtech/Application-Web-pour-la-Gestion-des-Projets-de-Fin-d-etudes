package com.soutLink.Domains;

public class EmailUtil {
    public static String getDomain(String email) {
        int index = email.indexOf('@');
        if (index > -1) {
            return email.substring(index + 1);
        }
        throw new IllegalArgumentException("Invalid email address");
    }
}
