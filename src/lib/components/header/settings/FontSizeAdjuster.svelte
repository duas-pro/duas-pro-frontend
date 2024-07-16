<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Minus, Plus } from 'lucide-svelte';

    export let type: 'primary' | 'secondary' | 'tertiary';
    export let fontSize: number;
    export let onAdjust: (type: 'primary' | 'secondary' | 'tertiary', increment: boolean) => void;
</script>

<div class="flex items-center justify-between">
    <Button
        variant="outline"
        size="icon"
        on:click={() => onAdjust(type, false)}
        disabled={fontSize <= 12}
    >
        <Minus class="h-4 w-4" />
    </Button>
    <span class="mx-2 min-w-[2ch] text-center">{fontSize}</span>
    <Button
        variant="outline"
        size="icon"
        on:click={() => onAdjust(type, true)}
        disabled={fontSize >= 24}
    >
        <Plus class="h-4 w-4" />
    </Button>
</div>