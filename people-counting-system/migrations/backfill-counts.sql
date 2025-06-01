-- backfill-counts.sql
-- Description: Backfills randomized count data for all active, non-deleted devices
-- for the past 7 days (including today up to the current minute).
-- Counts are randomized (0-15) for each minute between 8 AM (inclusive) and 9 PM (exclusive, i.e., up to 20:59).
-- Outside these hours, 'in' and 'out' counts are 0.

-- WARNING: This script does not check for existing data in the "Count" table for the
-- target devices and time range. If run multiple times, or if data already exists,
-- it will insert duplicate count entries. If the "Count" table had a unique
-- constraint on ("sensorId", "timestamp"), you could use "ON CONFLICT DO NOTHING".

DO $$
DECLARE
    -- Define the 7-day period:
    -- Starts from the beginning of the day, 6 days ago.
    -- Ends at the current timestamp.
    -- Example: If NOW() is '2025-05-30 15:30:00':
    --   start_datetime will be '2025-05-24 00:00:00'
    --   end_datetime will be '2025-05-30 15:30:00'
    v_start_datetime TIMESTAMP WITH TIME ZONE := date_trunc('day', NOW() - interval '6 days');
    v_end_datetime TIMESTAMP WITH TIME ZONE := NOW();
BEGIN
    RAISE NOTICE 'Starting backfill of count data from % to %', v_start_datetime, v_end_datetime;

    WITH
    -- 1. Generate a series of timestamps for every minute in the defined period
    time_series AS (
        SELECT minute_timestamp
        FROM generate_series(
            v_start_datetime,
            v_end_datetime,
            interval '1 minute'
        ) AS gs(minute_timestamp)
    ),
    -- 2. Get all active, non-deleted devices
    active_devices AS (
        SELECT
            "id" AS device_id,
            "name" AS device_name -- Included for potential logging, not used in insert
        FROM "Device"
        WHERE "active" = TRUE AND "deleted" IS NULL
    )
    -- 3. Insert into Count table
    INSERT INTO "Count" ("sensorId", "timestamp", "in", "out")
    SELECT
        ad.device_id,
        ts.minute_timestamp,
        CASE
            WHEN EXTRACT(HOUR FROM ts.minute_timestamp) >= 8 AND EXTRACT(HOUR FROM ts.minute_timestamp) < 21 THEN
                floor(random() * 16)::INT -- Random 'in' count (0-15)
            ELSE 0
        END AS in_val,
        CASE
            WHEN EXTRACT(HOUR FROM ts.minute_timestamp) >= 8 AND EXTRACT(HOUR FROM ts.minute_timestamp) < 21 THEN
                floor(random() * 16)::INT -- Random 'out' count (0-15)
            ELSE 0
        END AS out_val
    FROM
        active_devices ad
    CROSS JOIN
        time_series ts;

    RAISE NOTICE 'Backfill process completed. Please check the "Count" table.';
    RAISE NOTICE 'If no devices were active and non-deleted, no rows would have been inserted.';

END $$;