INSERT INTO Location (name, address)
VALUES
    ('American Eagle', '123 Mall St'),
    ('Woods Grocery', '456 Market Ave'),
    ('Hot Topic', '789 Fashion Blvd'),
    ('Game Stop', '101 Gaming Ln'),
    ('Best Buy', '202 Tech Rd'),
    ('Target', '303 Retail Dr');

INSERT INTO Device (name, location_id, status)
VALUES
    ('American Eagle East Door', 1, 'active'),
    ('American Eagle West Door', 1, 'active'),
    ('Woods Grocery North Door', 2, 'active'),
    ('Woods Grocery South Door', 2, 'active'),
    ('Hot Topic', 3, 'active'),
    ('Game Stop', 4, 'active'),
    ('Best Buy East Door', 5, 'active'),
    ('Best Buy West Door', 5, 'active'),
    ('Target East Door', 6, 'active'),
    ('Target West Door', 6, 'active');