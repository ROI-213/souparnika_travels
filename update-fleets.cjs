const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ofmqurgriqakkqrxvnfx.supabase.co';
const supabaseKey = 'sb_publishable_vC_RKx732oE5qWkcWV9Pyw_-65b2Vpq';
const supabase = createClient(supabaseUrl, supabaseKey);

// High-quality white cars/vans from Unsplash as temporary stand-ins
const updates = {
  '6016ce37-34f7-4b6c-98a6-a162cae8badf': 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1200&q=80', // White SUV/Innova style
  '2949b539-c91b-4d52-8eb3-b17872dc6ccf': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80', // White Sedan (Etios style)
  '1e175fd4-beff-463a-98a1-c6e11405f556': 'https://images.unsplash.com/photo-1620021316692-0b82eb295796?w=1200&q=80', // White Van (Tempo)
  '1de5cb13-e650-4869-8cce-f12520115345': 'https://images.unsplash.com/photo-1562916669-e77be5e523f3?w=1200&q=80', // White Luxury Van
  '6763fdfe-9ff5-436a-ae90-e14e79dc8dd2': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80', // White compact sedan
  '501ae55e-7f73-4902-818f-46a51aef3f80': 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=1200&q=80', // White Mercedes
};

async function updateFleets() {
  for (const [id, url] of Object.entries(updates)) {
    const { error } = await supabase
      .from('fleets')
      .update({ image_url: url })
      .eq('id', id);
    if (error) console.error(`Error updating ${id}:`, error);
    else console.log(`Updated ${id}`);
  }
}

updateFleets();
