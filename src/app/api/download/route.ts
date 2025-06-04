import { NextRequest, NextResponse } from 'next/server';
import { env } from 'process';
import { currentUser, getAuth } from '@clerk/nextjs/server';

type Params = {
    data: string
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {
    try {
        // Get authentication info using getAuth
        const { userId } = await getAuth(req);

        // Check if user is authenticated
        if (!userId) {
            return NextResponse.json({ 
                error: "Authentication failed", 
                message: "You must be logged in to use this feature" 
            }, { status: 401 });
        }

        // Get user details with currentUser
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ 
                error: "User not found", 
                message: "Unable to retrieve user information" 
            }, { status: 401 });
        }

        // Parse request body
        let body;
        try {
            body = await req.json();
        } catch (error) {
            return NextResponse.json({ 
                error: "Invalid request", 
                message: "The request body could not be parsed" 
            }, { status: 400 });
        }

        const { data } = body as Params;
        if (!data) {
            return NextResponse.json({
                error: "Missing data",
                message: "No file data was provided"
            }, { status: 400 });
        }

        // Prepare form data for API call
        const filesFormData = new FormData();
        filesFormData.append('request', JSON.stringify(data));

        // Attempt API call with retries
        let response;
        let apiError = null;

        for (let i = 0; i <= 3; i++) {
            try {
                response = await fetch(env.SORTAI_API_URL as string + "create-zip/", {
                    headers: {
                        'access_token': env.SORTAI_API_KEY as string,
                    },
                    method: 'POST',
                    body: filesFormData,
                });

                if (response.ok) {
                    break;
                }
                
                // Wait before retry
                await sleep(1000);
            } catch (error) {
                apiError = error;
                console.error(`API call attempt ${i} failed:`, error);
            }
        }

        // Handle API failure
        if (!response || !response.ok) {
            return NextResponse.json({ 
                error: "External API error", 
                message: "Could not generate zip file with the sorting API" 
            }, { status: 502 });
        }

        // Return the zip file
        return new NextResponse(await response.blob(), { 
            status: 200, 
            headers: { 
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename="sorted_files.zip"'
            } 
        });

    } catch (error) {
        console.error("Unhandled error in download API:", error);
        return NextResponse.json({ 
            error: "Server error", 
            message: "An unexpected error occurred while processing your request" 
        }, { status: 500 });
    }
}