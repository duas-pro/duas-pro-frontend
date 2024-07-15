import { supabase } from '$lib/supabaseClient';

export async function load() {

    const { data, error } = await supabase.functions.invoke('duas?languages=ar,translit,en&page=1&size=10');
	console.log("data: ", data);
	if (error) {
		console.error('Error fetching duas:', error);
	}
	
    return {
		duas: data.data
	};
}