<script lang="ts">
	import { browser } from '$app/environment';
	import { PopoverContent } from '$lib/components/ui/popover';
	import { Separator } from '$lib/components/ui/separator';
	import ThemeSelector from '$lib/components/header/settings/ThemeSelector.svelte';
	import SystemLanguageSelector from '$lib/components/header/settings/SystemLanguageSelector.svelte';
	import FullscreenToggle from '$lib/components/header/settings/FullscreenToggle.svelte';
	import FontSizeAdjuster from '$lib/components/header/settings/FontSizeAdjuster.svelte';
	import DuaLanguageSelector from './DuaLanguageSelector.svelte';
</script>

{#if browser}
	<PopoverContent class="w-80">
		<div class="grid gap-4">
			<div class="space-y-2">
				<h4 class="font-medium leading-none">System Einstellungen</h4>
			</div>
			<div class="grid gap-2">
				<ThemeSelector />

				<SystemLanguageSelector />

				<FullscreenToggle />

				<Separator class="my-2" />
			</div>
			<div class="space-y-2">
				<h4 class="font-medium leading-none">Font sizes</h4>
			</div>
			<div class="grid gap-2">

				<FontSizeAdjuster />
				
				<Separator class="my-2" />
							</div>
			<div class="space-y-2">
				<h4 class="font-medium leading-none">Dua languages</h4>
			</div>
			<div class="grid gap-2">
				
				<DuaLanguageSelector />
			</div>
		</div>
	</PopoverContent>
{/if}
