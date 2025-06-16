INSERT INTO sensor ("name", "firmwareVersion", "mountHeight", "businessStartTime", "businessEndTime", "dataPushEndpoint")
VALUES
  -- Location 1:
  ('American Eagle East Door', '1.1.0', 15, '13:00:00+00', '01:00:00+00', 'http://localhost:3001/v1/ingest'),
  ('American Eagle West Door', '1.1.0', 15, '13:00:00+00', '01:00:00+00', 'http://localhost:3001/v1/ingest'),
  -- Location 2:
  ('Woods Grocery North Door', '1.2.0', 12, '11:00:00+00', '00:00:00+00', 'http://localhost:3001/v1/ingest'),
  ('Woods Grocery South Door', '1.2.0', 12, '11:00:00+00', '00:00:00+00', 'http://localhost:3001/v1/ingest'),
  -- Location 3:
  ('Hot Topic', '1.0.0', 11, '14:00:00+00', '01:00:00+00', 'http://localhost:3001/v1/ingest'),
  -- Location 4:
  ('Game Stop', '1.0.0', 14, '14:00:00+00', '00:00:00+00', 'http://localhost:3001/v1/ingest'),
  -- Location 5:
  ('Best Buy East Door', '1.1.0', 17, '13:30:00+00', '01:30:00+00', 'http://localhost:3001/v1/ingest'),
  ('Best Buy West Door', '1.1.0', 17, '13:30:00+00', '01:30:00+00', 'http://localhost:3001/v1/ingest'),
  -- Location 6:
  ('Target East Door', '1.0.0', 19, '12:30:00+00', '02:30:00+00', 'http://localhost:3001/v1/ingest'),
  ('Target West Door', '1.0.0', 19, '12:30:00+00', '02:30:00+00', 'http://localhost:3001/v1/ingest');
