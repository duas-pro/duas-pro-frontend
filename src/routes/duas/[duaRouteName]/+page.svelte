<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { Book, Languages, Presentation } from 'lucide-svelte';
	import DuaContent from './DuaContent.svelte';
	import DuaPresentationView from './DuaPresentationView.svelte';
	import DuaReadingView from './DuaReadingView.svelte';
	import DuaTranslationView from './DuaTranslationView.svelte';
	import AudioPlayer from './AudioPlayer.svelte';
	import { duaStore } from '$lib/stores/dua';
	import { headerStore } from '$lib/stores/headerStore';
	import { onMount } from 'svelte';
	
    export let data: {
        dua: Dua
    };

	let viewTabsElement: HTMLElement;

	let scrollReference = 0;
	let scrollThreshold = 75; // Schwellenwert für Header-Änderungen
	let isExpandedHeader = true;

	onMount(() => {
		headerStore.update((state) => ({
			...state,
			duaTitle: data.dua.title['en'],
			showViewTabs: false,
			isDuaPage: true,
			isExpandedHeader: true
		}));

		const handleScroll = () => {
			const currentScrollTop = Math.round(window.scrollY || document.documentElement.scrollTop);
			// Berechne die Scroll-Distanz seit dem letzten Referenzpunkt
			const scrollDistance = currentScrollTop - scrollReference;

			if (Math.abs(scrollDistance) >= scrollThreshold) {
				const scrollingUp = scrollDistance < 0;

				if (scrollingUp !== isExpandedHeader) {
					isExpandedHeader = scrollingUp;
					headerStore.update((state) => ({
						...state,
						isExpandedHeader
					}));
				}

				// Setze den neuen Referenzpunkt
				scrollReference = currentScrollTop;
			}

			const viewTabsPosition = viewTabsElement?.getBoundingClientRect().top;
			const showViewTabs = viewTabsPosition !== undefined && viewTabsPosition <= 60;
			headerStore.update((state) => ({
				...state,
				showViewTabs
			}));
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			headerStore.update((state) => ({
				...state,
				isDuaPage: false,
				showViewTabs: false,
				isExpandedHeader: true
			}));
		};
	});

	$: if (typeof window !== 'undefined') {
		scrollToCurrentVerse($duaStore.currentVerse);
	}

	function scrollToCurrentVerse(index: number) {
		const verseElement = document.getElementById(`verse-${index}`);
		if (verseElement) {
			verseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}

	function setActiveTab(tab: string | undefined) {
		if (tab) {
			duaStore.update((state) => ({ ...state, currentTab: tab }));
		}
	}
</script>

<div class="container mx-auto px-4 py-8">
	<DuaContent dua={data.dua} />

	<div class="mb-8 flex justify-center" bind:this={viewTabsElement}>
		<Tabs class="w-full" bind:value={$duaStore.currentView} onValueChange={setActiveTab}>
			<TabsList class="grid w-full grid-cols-3">
				<TabsTrigger value="translation" class="flex items-center justify-center">
					<Languages class="mr-2 h-5 w-5" />
					Translation
				</TabsTrigger>
				<TabsTrigger value="reading" class="flex items-center justify-center">
					<Book class="mr-2 h-5 w-5" />
					Reading
				</TabsTrigger>
				<TabsTrigger value="presentation" class="flex items-center justify-center">
					<Presentation class="mr-2 h-5 w-5" />
					Presentation
				</TabsTrigger>
			</TabsList>
			<TabsContent value="translation">
				<DuaTranslationView lines={data.dua.lines} currentVerseIndex={$duaStore.currentVerse} />
			</TabsContent>
			<TabsContent value="reading">
				<DuaReadingView lines={data.dua.lines} currentVerseIndex={$duaStore.currentVerse} />
			</TabsContent>
			<TabsContent value="presentation">
				<DuaPresentationView lines={data.dua.lines} />
			</TabsContent>
		</Tabs>
	</div>
</div>

<AudioPlayer totalVerses={data.dua.lines.length} />
