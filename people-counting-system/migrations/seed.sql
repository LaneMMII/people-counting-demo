INSERT INTO Location (name, address)
VALUES
    ('American Eagle', '123 Mall St'),
    ('Woods Grocery', '456 Market Ave'),
    ('Hot Topic', '789 Fashion Blvd'),
    ('Game Stop', '101 Gaming Ln'),
    ('Best Buy', '202 Tech Rd'),
    ('Target', '303 Retail Dr');

INSERT INTO Device (name, locationId, status)
VALUES
    ('American Eagle East Door', 1, TRUE), -- Changed 'active' to TRUE
    ('American Eagle West Door', 1, TRUE),
    ('Woods Grocery North Door', 2, TRUE),
    ('Woods Grocery South Door', 2, TRUE),
    ('Hot Topic', 3, TRUE),
    ('Game Stop', 4, TRUE),
    ('Best Buy East Door', 5, TRUE),
    ('Best Buy West Door', 5, TRUE),
    ('Target East Door', 6, TRUE),
    ('Target West Door', 6, TRUE);