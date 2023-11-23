import { supabase } from "../../supabase/client";

export const getImages = async() => {
  const banner = supabase.storage.from('home_page').list('banner');
  const empresa = supabase.storage.from('home_page').list('empresa');
  const cards = supabase.from('cards').select();

  const [ banner_imgs, empresa_imgs, cards_data ] = await Promise.all([ banner, empresa, cards ]);

  return { banner_imgs, empresa_imgs, cards_data: cards_data.data };
}