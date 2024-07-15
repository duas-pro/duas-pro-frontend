<script lang="ts">
    import {
        Select,
        SelectTrigger,
        SelectValue,
        SelectContent,
        SelectItem
    } from '$lib/components/ui/select';
    import { settingsStore, stringToLanguage, type Language } from '$lib/stores/settings';

    let language: Language;
    settingsStore.subscribe((settings) => {
        language = settings.systemLanguage;
    });

    function setLanguage(newLanguage: Language) {
        settingsStore.update(settings => ({
            ...settings,
            systemLanguage: newLanguage
        }));
    }
</script>

<div class="grid grid-cols-3 items-center gap-4">
    <label for="language">Sprache</label>
    <Select
        onSelectedChange={(v) => {
            if (v) {
                const newLanguage = stringToLanguage(v.value);
                setLanguage(newLanguage);
            }
        }}
    >
        <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Sprache wählen" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="de">Deutsch</SelectItem>
            <SelectItem value="en">English</SelectItem>
        </SelectContent>
    </Select>
</div>