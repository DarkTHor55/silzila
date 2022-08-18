package org.silzila.app.dto;

import lombok.Data;

@Data
public class DBConnectionDTO {

    private String id;

    private String userId;

    private String vendor;

    private String server;

    private Integer port;

    private String database;

    private String username;

    private String connectionName;

}
