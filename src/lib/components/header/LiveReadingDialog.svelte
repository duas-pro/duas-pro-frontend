<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Users, Copy, X } from 'lucide-svelte';
    import {
        Dialog,
        DialogContent,
        DialogDescription,
        DialogHeader,
        DialogTitle,
        DialogTrigger
    } from '$lib/components/ui/dialog';
    import { Label } from '$lib/components/ui/label';
    import { Input } from '$lib/components/ui/input';
    import { liveReadingStore } from '$lib/stores/liveReading';
    import SvgQR from '@svelte-put/qr/svg/QR.svelte';

    let copied = false;
    let qrSize = 150;
    let logo = 'https://svelte-put.vnphanquang.com/images/svelte-put-logo.svg';
    let dialogOpen = false;

    function startLiveReading() {
        const code = Math.random().toString(36).substring(7).toUpperCase();
        liveReadingStore.update((state) => ({ 
            ...state, 
            liveReadingCode: code,
            isLiveReading: true,
            liveReadingUsers: 1,
        }));
    }

    function endLiveReadingAndCloseDialog() {
        liveReadingStore.update((state) => ({ 
            ...state, 
            liveReadingCode: null,
            isLiveReading: false,
            liveReadingUsers: 0,
        }));
        dialogOpen = false;
    }

    function copyLiveReadingLink() {
        const link = `https://duas.pro/live/${$liveReadingStore.liveReadingCode}`;
        navigator.clipboard.writeText(link);
        copied = true;
        setTimeout(() => copied = false, 2000);
    }

    $: liveReadingLink = $liveReadingStore.liveReadingCode 
        ? `https://duas.pro/live/${$liveReadingStore.liveReadingCode}` 
        : '';
</script>

<Dialog bind:open={dialogOpen}>
    <DialogTrigger>
        <Button variant="ghost" size="sm">
            <Users class="h-4 w-4 mr-2" />
            <span>Join</span>
        </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader class="mb-4">
            <DialogTitle>Gemeinsames Lesen</DialogTitle>
        </DialogHeader>
        <div class="grid gap-4">
            {#if !$liveReadingStore.isLiveReading}
                <DialogDescription>
                    Starten Sie eine Live-Lesung und laden Sie Freunde ein, gemeinsam zu lesen.
                </DialogDescription>
                <img src="https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png" alt="Erklärung der Funktionsweise" class="w-full max-w-[300px] mx-auto">
                <Button on:click={startLiveReading}>Broadcast starten</Button>
            {:else}
                <div class="text-center">
                    <p class="font-semibold">Live-Lesung aktiv</p>
                    <p class="text-sm text-gray-500">
                        {$liveReadingStore.liveReadingUsers} Teilnehmer online
                    </p>
                </div>
                <div class="flex justify-center">
                    <SvgQR 
                        data={liveReadingLink} 
                        logo={logo}
                        width={qrSize} 
                        height={qrSize}
                    />
                </div>
                <div>
                    <Label for="link" class="mb-1 block">Einladungs-Link</Label>
                    <div class="flex flex-col sm:flex-row">
                        <Input id="link" value={liveReadingLink} readonly class="mb-2 sm:mb-0 sm:mr-2" />
                        <Button on:click={copyLiveReadingLink} class="whitespace-nowrap">
                            {#if copied}
                                Kopiert!
                            {:else}
                                <Copy class="h-4 w-4 mr-2" />
                                Kopieren
                            {/if}
                        </Button>
                    </div>
                </div>
                <Button variant="destructive" on:click={endLiveReadingAndCloseDialog}>
                    <X class="h-4 w-4 mr-2" />
                    Broadcast beenden
                </Button>
            {/if}
        </div>
    </DialogContent>
</Dialog>