<script lang="ts">
    import DuaCard from './DuaCard.svelte';

    export let data: {
        duas: Array<Dua>
    };
</script>

<div class="p-4 sm:p-6 md:p-8">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each data.duas as dua}            
            <DuaCard {dua} />
        {/each}
    </div>
</div>
