<script lang="ts">
	import { browser } from '$app/environment';
	import { PopoverContent } from '$lib/components/ui/popover';
	import { Separator } from '$lib/components/ui/separator';
	import ThemeSelector from '$lib/components/header/settings/ThemeSelector.svelte';
	import FullscreenToggle from '$lib/components/header/settings/FullscreenToggle.svelte';
	import DuaLanguageSelector from './DuaLanguageSelector.svelte';
</script>

{#if browser}
	<PopoverContent class="w-80 max-h-[70vh] overflow-hidden flex flex-col">
		<div class="overflow-y-auto">
			<div class="grid gap-4">
				<div class="space-y-2">
					<h4 class="font-medium leading-none">System Einstellungen</h4>
				</div>
				<div class="grid gap-2">
					<ThemeSelector />

					<FullscreenToggle />

					<Separator class="my-2" />
				</div>

				<div class="grid gap-2">
					<DuaLanguageSelector />
				</div>
			</div>
		</div>
	</PopoverContent>
{/if}

<style>
	:global(.popover-content) {
		max-height: 70vh !important;
		overflow: hidden !important;
	}
</style>