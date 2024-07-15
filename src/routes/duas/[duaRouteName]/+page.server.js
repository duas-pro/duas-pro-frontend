import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

    const { data, error } = await supabase.functions.invoke('duas/' + params.duaRouteName + '?languages=ar,translit,en');
	if (error) {
		console.error('Error fetching duas:', error);
	}

    return {
		dua: data
	};
}