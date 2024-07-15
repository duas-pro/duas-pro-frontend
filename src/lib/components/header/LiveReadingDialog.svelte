<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Users } from 'lucide-svelte';
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
    import { isLiveReading, liveReadingCode, liveReadingUsers } from '$lib/stores/liveReading';

    function startLiveReading() {
        const code = Math.random().toString(36).substring(7).toUpperCase();
        liveReadingCode.set(code);
        isLiveReading.set(true);
        liveReadingUsers.set(1);
    }

    function copyLiveReadingLink() {
        const link = `https://duas.pro/live/${$liveReadingCode}`;
        navigator.clipboard.writeText(link);
        // Hier könnten Sie eine Benachrichtigung anzeigen, dass der Link kopiert wurde
    }
</script>

<Dialog>
    <DialogTrigger>
        <Button variant="ghost" size="sm">
            <!-- <Users class="h-3 w-3" /> -->
            <span class="sr-only">Gemeinsames Lesen starten</span>
            <span>Join</span>
        </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>Gemeinsames Lesen starten</DialogTitle>
            <DialogDescription>
                Starten Sie eine Live-Lesung und laden Sie Freunde ein, gemeinsam zu lesen.
            </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
            <Button on:click={startLiveReading}>Broadcast starten</Button>
            {#if $liveReadingCode}
                <div>
                    <Label for="link">Einladungs-Link</Label>
                    <div class="mt-1 flex">
                        <Input id="link" value={`https://duas.pro/live/${$liveReadingCode}`} readonly />
                        <Button class="ml-2" on:click={copyLiveReadingLink}>Kopieren</Button>
                    </div>
                </div>
            {/if}
        </div>
    </DialogContent>
</Dialog>