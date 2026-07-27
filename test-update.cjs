const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ofmqurgriqakkqrxvnfx.supabase.co';
const supabaseKey = 'sb_publishable_vC_RKx732oE5qWkcWV9Pyw_-65b2Vpq';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpdate() {
  const { data, error } = await supabase
    .from('packages')
    .update({ image_url: '/images/services/tour-packages.webp' })
    .eq('id', '38b53568-bf07-456d-950f-468a820ff8db')
    .select();
    
  if (error) {
    console.error('Error updating:', error);
  } else {
    console.log('Update success:', data);
  }
}

testUpdate();
