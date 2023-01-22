const Ship = require('../ship');

test("test isSunk()", () => {
    const ship = Ship(1);
    expect(ship.isSunk()).toEqual(false);
});

test("test hit()", () => {
    const ship = Ship(1);
    ship.hit();
    expect(ship.isSunk()).toEqual(true);
});