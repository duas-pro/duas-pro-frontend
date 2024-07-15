<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Popover, PopoverTrigger } from '$lib/components/ui/popover';
    import { Settings, Github, User } from 'lucide-svelte';
    import SettingsPopover from './settings/SettingsPopover.svelte';
</script>

<div class="flex h-[60px] items-center justify-between px-4 py-1">
    <div class="flex items-center space-x-4">
        <a href="/" class="text-xl font-bold transition-colors hover:text-primary">duas.pro</a>
        <a href="/duas" class="transition-colors hover:text-primary">Duas</a>
    </div>

    <div class="flex items-center space-x-2">
        <a href="https://github.com/yourusername/yourrepo" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
                <Github class="h-5 w-5" />
                <span class="sr-only">GitHub</span>
            </Button>
        </a>

        {#if false}
            <a href="/profile">
                <Button variant="ghost" size="icon">
                    <User class="h-5 w-5" />
                    <span class="sr-only">Profil</span>
                </Button>
            </a>
        {:else}
            <a href="/login">
                <Button variant="ghost" size="sm">
                    Login
                </Button>
            </a>
        {/if}

        <Popover>
            <PopoverTrigger asChild let:builder>
                <Button builders={[builder]} variant="ghost" size="icon">
                    <Settings class="h-5 w-5" />
                    <span class="sr-only">Einstellungen öffnen</span>
                </Button>
            </PopoverTrigger>

            <SettingsPopover />
        </Popover>
    </div>
</div>