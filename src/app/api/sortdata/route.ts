
import { subscriptionmodel } from '@/app/lib/util';
import { currentUser, getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { env } from 'process';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {

    const { userId } = await getAuth(req);
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await currentUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("user:", user.unsafeMetadata);
    if (!(user?.unsafeMetadata?.lastsort === null)) {
        const lastSortTime = new Date(String(user?.unsafeMetadata?.lastsort));
        const cooldownTime = new Date();
        cooldownTime.setSeconds(cooldownTime.getSeconds() - 6); // 6 second cooldown
        
        if (lastSortTime >= cooldownTime) {
            return NextResponse.json({ error: "You are not allowed to sort files yet" }, { status: 400 });
        }
    }



    const body = await req.json();

    
    await (await clerkClient()).users.updateUser(userId, {
        unsafeMetadata: {
            ...user?.unsafeMetadata,
            lastsort: new Date()
        }
    });

    console.log("user: 1231313231", body);



    const filesFormData = new FormData();
    filesFormData.append('filejson', JSON.stringify(body));



    let sortedFiles;

    for (let i = 0; i <= 3; i++) {
        console.log(i);
        try {
            const apiUrl = (env.SORTAI_API_URL as string).trim();
            const fullUrl = (apiUrl.startsWith('http') ? apiUrl : `http://${apiUrl}`).replace(/\/?$/, "/") + "sortv2/";
            sortedFiles = await fetch(fullUrl, {
                headers: {
                    'access_token': env.SORTAI_API_KEY as string,
                },
                method: 'POST',
                body: filesFormData,
            });
            console.log("sortedFiles", sortedFiles);
            if (sortedFiles.ok) {
                break;
            }
        } catch (error) {
            console.error("Fetch error:", error);
            await sleep(1000); // wait a second before retrying
        }
    }
    if (!sortedFiles) {
        throw new Error(`Failed to upload file to SortAI API. Status code: 500`);
    }

    if (!sortedFiles.ok) {
        throw new Error(`Failed to upload file to SortAI API. Status code: ${sortedFiles.status}`);
    }

    const sortFilesRepsons = await sortedFiles.json();


    return NextResponse.json(sortFilesRepsons, { status: 200 });

}