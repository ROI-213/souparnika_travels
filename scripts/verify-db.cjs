const { Pool } = require('pg');

const pool = new Pool({
  host: '168.119.64.101',
  port: 5432,
  database: 'soupa839',
  user: 'soupa839',
  password: '5yLMTWjNFmPByXLA8d47Zvdnz'
});

async function verify() {
  console.log('Connecting to PostgreSQL soupa839...');
  const res = await pool.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name
  `);
  
  console.log(`Found ${res.rows.length} tables in PostgreSQL:`);
  for (const row of res.rows) {
    const countRes = await pool.query(`SELECT count(*) FROM "${row.table_name}"`);
    console.log(` - ${row.table_name}: ${countRes.rows[0].count} rows`);
  }

  // 1. Test insert enquiry
  console.log('\nTesting insert into enquiries...');
  const insertEnquiry = await pool.query(`
    INSERT INTO enquiries (
      reference, name, phone, email, pickup, destination,
      travel_date, return_date, passengers, vehicle_type,
      trip_type, message, source, status
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING id, reference
  `, [
    'ST-TEST-' + Math.floor(1000 + Math.random() * 9000),
    'Test Customer',
    '+919876543210',
    'customer@example.com',
    'Bangalore Airport',
    'Mysore Palace',
    '2026-10-01',
    '2026-10-03',
    4,
    'Innova Crysta',
    'Round Trip',
    'Looking for clean cab with polite driver',
    'verification_test',
    'new'
  ]);
  console.log('Inserted enquiry:', insertEnquiry.rows[0]);

  // 2. Test insert and query storage object (Native Postgres media storage)
  console.log('\nTesting insert into storage_objects...');
  const testFileName = `test-upload-${Date.now()}.png`;
  const insertStorage = await pool.query(`
    INSERT INTO storage_objects (bucket_id, name, mime_type, size_bytes, content_base64, public_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, public_url
  `, [
    'media',
    testFileName,
    'image/png',
    1024,
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    `/api/storage/media/${testFileName}`
  ]);
  console.log('Inserted storage object:', insertStorage.rows[0]);

  // 3. Test insert new review / testimonial
  console.log('\nTesting insert into testimonials...');
  const insertReview = await pool.query(`
    INSERT INTO testimonials (
      customer_name, customer_location, rating, review,
      travel_type, destination, fleet_used, is_approved, is_featured
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id, customer_name
  `, [
    'Ramesh Kumar',
    'Bangalore',
    5,
    'Remarkable service! Our trip to Coorg was smooth and memorable.',
    'Outstation',
    'Coorg',
    'Toyota Innova Crysta',
    true,
    true
  ]);
  console.log('Inserted review:', insertReview.rows[0]);

  // 4. Test fetch data from fleets, packages, destinations, areas
  console.log('\nVerifying site core entities:');
  const fleets = await pool.query('SELECT name, starting_price FROM fleets LIMIT 3');
  console.log('Fleets sample:', fleets.rows);

  const packages = await pool.query('SELECT name, price FROM packages LIMIT 3');
  console.log('Packages sample:', packages.rows);

  const areas = await pool.query('SELECT name, slug FROM areas LIMIT 3');
  console.log('Areas sample:', areas.rows);

  console.log('\nALL VERIFICATION TESTS COMPLETED SUCCESSFULLY!');
  await pool.end();
}

verify().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});
