<script lang="ts">
    import { headerStore } from '$lib/stores/headerStore';
    import DefaultHeader from './DefaultHeader.svelte';
    import DuaHeader from './DuaHeader.svelte';
</script>

<header
    class="sticky top-0 z-10 w-full bg-background shadow-md transition-all duration-300"
    style="height: {$headerStore.isExpandedHeader ? '90px' : '30px'};"
>
    <div class="relative h-full overflow-hidden">
        <div class="absolute w-full transition-transform duration-300"
             class:translate-y-0={$headerStore.isExpandedHeader}
             class:-translate-y-full={!$headerStore.isExpandedHeader}>
            <DefaultHeader />
        </div>
        {#if $headerStore.isDuaPage}
            <div class="absolute bottom-0 w-full">
                <DuaHeader />
            </div>
        {/if}
    </div>
</header>