<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Minus, Plus } from 'lucide-svelte';
    import { settingsStore } from '$lib/stores/settings';

    let fontSize: number;
    settingsStore.subscribe((settings) => {
        fontSize = settings.fontSize;
    });

    function decreaseFontSize() {
        settingsStore.update(settings => ({
            ...settings,
            fontSize: Math.max(12, settings.fontSize - 1)
        }));
    }

    function increaseFontSize() {
        settingsStore.update(settings => ({
            ...settings,
            fontSize: Math.min(24, settings.fontSize + 1)
        }));
    }
</script>

<div class="grid grid-cols-3 items-center gap-4">
    <label for="fontSize">Arabic</label>
    <div class="col-span-2 flex items-center justify-between">
        <Button
            variant="outline"
            size="icon"
            on:click={decreaseFontSize}
            disabled={fontSize <= 12}
        >
            <Minus class="h-4 w-4" />
        </Button>
        <span class="mx-2 min-w-[2ch] text-center">{fontSize}</span>
        <Button
            variant="outline"
            size="icon"
            on:click={increaseFontSize}
            disabled={fontSize >= 24}
        >
            <Plus class="h-4 w-4" />
        </Button>
    </div>
</div>