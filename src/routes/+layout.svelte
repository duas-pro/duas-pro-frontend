<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import '../app.css';
	import { headerStore } from '$lib/stores/headerStore';
	import { page } from '$app/stores';

	$: {
		// Überprüfen Sie, ob die aktuelle Route eine Dua-Seite ist
		const isDuaPage = $page.route.id?.startsWith('/duas/') ?? false;
		headerStore.update(state => ({ ...state, isDuaPage }));
	}
</script>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1">
		<slot />
	</main>
</div>
