const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ofmqurgriqakkqrxvnfx.supabase.co';
const supabaseKey = 'sb_publishable_vC_RKx732oE5qWkcWV9Pyw_-65b2Vpq';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchPackages() {
  const { data, error } = await supabase.from('packages').select('id, slug, name, location, image_url');
  if (error) {
    console.error('Error fetching packages:', error);
    return;
  }
  console.log('Packages:', JSON.stringify(data, null, 2));
}

fetchPackages();
