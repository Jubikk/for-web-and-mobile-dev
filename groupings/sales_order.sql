CREATE DATABASE sales_order;

USE sales_order;

CREATE TABLE customer (
    customernumber VARCHAR(5) NOT NULL PRIMARY KEY,
    customername VARCHAR(45) NOT NULL,
    homeaddress VARCHAR(50) NOT NULL,
    officeaddress VARCHAR(50) NOT NULL,
    mobilenumber VARCHAR(12) NOT NULL,
    emailaddress VARCHAR(35) NOT NULL,
    nameofcontact VARCHAR(45) NOT NULL
);

CREATE TABLE vendor (
    vendornumber VARCHAR(5) NOT NULL PRIMARY KEY,
    vendorname VARCHAR(45) NOT NULL,
    officeaddress VARCHAR(45) NOT NULL,
    mobilenumber VARCHAR(11) NOT NULL,
    emailaddress VARCHAR(35) NOT NULL
);

CREATE TABLE items (
    itemnumber VARCHAR(7) NOT NULL PRIMARY KEY,
    vendornumber VARCHAR(5) NOT NULL,
    itemdescription VARCHAR(45) NOT NULL,
    itemamount DECIMAL(6,2) NOT NULL,
    onstockinventory INT NOT NULL,
    datepurchased DATE NOT NULL,
    FOREIGN KEY (vendornumber) REFERENCES vendor(vendornumber)
);

CREATE TABLE orders (
    ordernumber VARCHAR(5) NOT NULL PRIMARY KEY,
    orderdate DATE NOT NULL,
    customernumber VARCHAR(5) NOT NULL,
    orderamount DECIMAL(9,2) NOT NULL,
    FOREIGN KEY (customernumber) REFERENCES customer(customernumber)
);

CREATE TABLE order_details (
    ordernumber VARCHAR(5) NOT NULL,
    itemnumber VARCHAR(7) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (ordernumber, itemnumber),
    FOREIGN KEY (ordernumber) REFERENCES orders(ordernumber),
    FOREIGN KEY (itemnumber) REFERENCES items(itemnumber)
);



x