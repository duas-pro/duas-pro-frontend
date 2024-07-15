<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import DuaLanguageItem from '$lib/components/header/settings/DuaLanguageItem.svelte';
    import {
        Command,
        CommandEmpty,
        CommandGroup,
        CommandInput,
        CommandItem
    } from '$lib/components/ui/command';
    import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
    import { Check, ChevronsUpDown } from 'lucide-svelte';
    import { dndzone } from 'svelte-dnd-action';
    import { settingsStore, type LanguageItem } from '$lib/stores/settings';

    const languages: LanguageItem[] = [
        { value: 'ar', label: 'Arabic', id: 'ar' },
        { value: 'en', label: 'English', id: 'en' },
        { value: 'fr', label: 'French', id: 'fr' },
        { value: 'de', label: 'German', id: 'de' },
        { value: 'id', label: 'Indonesian', id: 'id' },
        { value: 'tr', label: 'Turkish', id: 'tr' }
    ];

    let selectedLanguages: LanguageItem[];
    settingsStore.subscribe(settings => {
        selectedLanguages = settings.selectedLanguages;
    });

    let open = false;

    function toggleLanguage(language: LanguageItem) {
        settingsStore.update(settings => {
            const index = settings.selectedLanguages.findIndex((lang) => lang.value === language.value);
            if (index === -1) {
                return { ...settings, selectedLanguages: [...settings.selectedLanguages, language] };
            } else {
                return { ...settings, selectedLanguages: settings.selectedLanguages.filter((lang) => lang.value !== language.value) };
            }
        });
        open = false;
    }

    function removeLanguage(language: LanguageItem) {
        settingsStore.update(settings => ({
            ...settings,
            selectedLanguages: settings.selectedLanguages.filter((lang) => lang.value !== language.value)
        }));
    }

    function handleDndConsider(e: CustomEvent<DndEvent>) {
        settingsStore.update(settings => ({
            ...settings,
            selectedLanguages: e.detail.items
        }));
    }

    function handleDndFinalize(e: CustomEvent<DndEvent>) {
        settingsStore.update(settings => ({
            ...settings,
            selectedLanguages: e.detail.items
        }));
    }
</script>

<div class="flex flex-col space-y-4">
    <div 
        use:dndzone={{items: selectedLanguages, flipDurationMs: 300}}
        on:consider={handleDndConsider}
        on:finalize={handleDndFinalize}
        class="flex flex-wrap gap-2"
    >
        {#each selectedLanguages as language (language.id)}
            <div class="dnd-item">
                <DuaLanguageItem {language} onRemove={removeLanguage} />
            </div>
        {/each}
    </div>

    <Popover bind:open>
        <PopoverTrigger asChild let:builder>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                class="w-full justify-between"
                builders={[builder]}
            >
                {selectedLanguages.length > 0
                    ? `${selectedLanguages.length} selected`
                    : 'Select languages...'}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-full p-0">
            <Command>
                <CommandInput placeholder="Search language..." />
                <CommandEmpty>No language found.</CommandEmpty>
                <CommandGroup>
                    {#each languages as language}
                        <CommandItem onSelect={(_) => toggleLanguage(language)}>
                            <Check
                                class={selectedLanguages.some((lang) => lang.value === language.value)
                                    ? 'opacity-100'
                                    : 'opacity-0'}
                            />
                            {language.label}
                        </CommandItem>
                    {/each}
                </CommandGroup>
            </Command>
        </PopoverContent>
    </Popover>
</div>

<style>
    .dnd-item {
        cursor: move;
    }
</style>