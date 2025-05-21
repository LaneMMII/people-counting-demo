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

INSERT INTO Count (device_id, timestamp, count_value)
VALUES
    (1, '2025-05-21 09:00:00', 25),
    (1, '2025-05-21 10:00:00', 30),
    (2, '2025-05-21 09:00:00', 20),
    (2, '2025-05-21 10:00:00', 35),
    (3, '2025-05-21 07:30:00', 15),
    (4, '2025-05-21 08:00:00', 18),
    (5, '2025-05-21 10:30:00', 12),
    (6, '2025-05-21 11:00:00', 10),
    (7, '2025-05-21 09:30:00', 40),
    (8, '2025-05-21 10:30:00', 45),
    (9, '2025-05-21 08:30:00', 50),
    (10, '2025-05-21 09:30:00', 55);