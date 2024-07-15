type DuaLine = {
    [key: string]: string;
    repetitions_number: number | null;
    end_of_section: boolean;
};

type Dua = {
    route_name: string;
    image_url: string;
    languages: string[];
    title: { [key: string]: string };
    description: { [key: string]: string | null };
    tags: string[];
    lines: DuaLine[];
};