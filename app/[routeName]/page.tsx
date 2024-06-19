// app/[routeName]/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import TextContent from "@/components/text-content";
import {UserPrefProvider} from "@/components/UserPrefProvider";

export default async function Page({ params }: { params: { routeName: string } }) {
    const { routeName } = params;

    // Fetch text data
    const { data, error } = await supabase.functions.invoke('duas/' + routeName);
    if (error || !data) {
        console.error(`Error fetching text: ${error?.message}`);
        return notFound();
    }

    return (
        <UserPrefProvider>
            <div>
                <Header />
                <div className="flex flex-col items-center p-8">
                    <h1 className="text-3xl font-bold">{data['titles']['tl']}</h1>
                    <TextContent textLines={data['lines']} />
                </div>
            </div>
        </UserPrefProvider>
    );
}
