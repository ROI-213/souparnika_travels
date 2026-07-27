const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ofmqurgriqakkqrxvnfx.supabase.co';
const supabaseKey = 'sb_publishable_vC_RKx732oE5qWkcWV9Pyw_-65b2Vpq';
const supabase = createClient(supabaseUrl, supabaseKey);

async function getFleets() {
  const { data, error } = await supabase
    .from('fleets')
    .select('id, name, image_url');
    
  if (error) {
    console.error('Error:', error);
  } else {
    data.forEach(f => console.log(`${f.id}: ${f.name} - ${f.image_url}`));
  }
}

getFleets();
