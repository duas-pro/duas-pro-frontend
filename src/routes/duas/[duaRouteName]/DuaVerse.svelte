<!-- TODO: Add buttons for each verse:
        - Play beginning with the selected verse
        - Share 
        - Bookmark
        - Copy arabic text of verse
        - Copy link to the specific verse
     -->
<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';

	export let line: DuaLine;
	export let index: number;
	export let currentVerseIndex: number;
</script>

<div class="verse-span flex justify-center" id="verse-{index}">
	<Card
		class="w-full max-w-5xl transition-colors duration-300 ease-in-out {index === currentVerseIndex
			? 'bg-gray-300 dark:bg-gray-800'
			: ''}"
	>
		<CardContent class="p-2">
			<div class="text-center">
				<span
					class="mb-1 inline-block rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300"
				>
					{index + 1}
				</span>
				<p class="font-arabic arabic-font-size">{line['ar']}</p>
				<p class="text-sm">{line['translit']}</p>
				<p class="text-sm">{line['en']}</p>
			</div>
		</CardContent>
	</Card>
</div>

<style>
	.font-arabic {
		font-family: 'Amiri', serif;
	}
</style>
