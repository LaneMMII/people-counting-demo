INSERT INTO sensor ("name", "firmwareVersion", "mountHeight", "businessStartTime", "businessEndTime", "dataPushEndpoint")
VALUES
  -- Location 1
  ('American Eagle East Door', '1.1.0', 15, '09:00:00-04', '21:00:00-04', 'http://localhost:3001/v1/ingest'),
  ('American Eagle West Door', '1.1.0', 15, '09:00:00-04', '21:00:00-04', 'http://localhost:3001/v1/ingest'),
  -- Location 2
  ('Woods Grocery North Door', '1.2.0', 12, '07:00:00-04', '20:00:00-04', 'http://localhost:3001/v1/ingest'),
  ('Woods Grocery South Door', '1.2.0', 12, '07:00:00-04', '20:00:00-04', 'http://localhost:3001/v1/ingest'),
  -- Location 3
  ('Hot Topic', '1.0.0', 11, '10:00:00-04', '21:00:00-04', 'http://localhost:3001/v1/ingest'),
  -- Location 4
  ('Game Stop', '1.0.0', 14, '10:00:00-04', '20:00:00-04', 'http://localhost:3001/v1/ingest'),
  -- Location 5
  ('Best Buy East Door', '1.1.0', 17, '09:30:00-04', '21:30:00-04', 'http://localhost:3001/v1/ingest'),
  ('Best Buy West Door', '1.1.0', 17, '09:30:00-04', '21:30:00-04', 'http://localhost:3001/v1/ingest'),
  -- Location 6
  ('Target East Door', '1.0.0', 19, '08:30:00-04', '22:30:00-04', 'http://localhost:3001/v1/ingest'),
  ('Target West Door', '1.0.0', 19, '08:30:00-04', '22:30:00-04', 'http://localhost:3001/v1/ingest');
