import { subscriptionmodel } from '@/app/lib/util';
import { currentUser, getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { env } from 'process';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {
    let body;
    let user;
    let userId;

    try {
        // Get authentication info using getAuth
        const auth = await getAuth(req);
        userId = auth.userId;

        // Check if user is authenticated
        if (!userId) {
            return NextResponse.json({ 
                error: "Authentication failed", 
                message: "You must be logged in to use this feature" 
            }, { status: 401 });
        }

        // Get user details with currentUser
        user = await currentUser();
        if (!user) {
            return NextResponse.json({ 
                error: "User not found", 
                message: "Unable to retrieve user information" 
            }, { status: 401 });
        }

        // Rate limiting check
        if (user.unsafeMetadata?.lastsort) {
            const lastSortTime = new Date(String(user.unsafeMetadata.lastsort));
            const cooldownTime = new Date();
            cooldownTime.setSeconds(cooldownTime.getSeconds() - 6); // 6 second cooldown
            
            if (lastSortTime >= cooldownTime) {
                return NextResponse.json({ 
                    error: "Rate limit exceeded", 
                    message: "Please wait at least 6 seconds between sort operations" 
                }, { status: 429 });
            }
        }

        // Parse request body
        try {
            body = await req.json();
        } catch (error) {
            return NextResponse.json({ 
                error: "Invalid request", 
                message: "The request body could not be parsed" 
            }, { status: 400 });
        }
        
        // Update user metadata to track sort operation
        try {
            await (await clerkClient()).users.updateUser(userId, {
                unsafeMetadata: {
                    ...user.unsafeMetadata,
                    lastsort: new Date()
                }
            });
        } catch (error) {
            console.error("Error updating user metadata:", error);
            // Continue execution even if metadata update fails
        }

        // Prepare form data for API call
        const filesFormData = new FormData();
        filesFormData.append('filejson', JSON.stringify(body));

        // Attempt API call with retries
        let sortedFiles;
        let attempts = 0;

        for (let i = 0; i <= 3; i++) {
            attempts++;
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
                
                if (sortedFiles.ok) {
                    break;
                }
                
                console.log(`Attempt ${i+1} failed with status: ${sortedFiles.status}`);
                await sleep(1000); // wait before retrying
            } catch (error) {
                console.error(`API call attempt ${i+1} failed:`, error);
                await sleep(1000);
            }
        }

        // Handle API failure
        if (!sortedFiles) {
            return NextResponse.json({ 
                error: "External API error", 
                message: "Could not connect to the sorting API after multiple attempts" 
            }, { status: 502 });
        }

        if (!sortedFiles.ok) {
            return NextResponse.json({ 
                error: "External API error", 
                message: `Sorting API returned error: ${sortedFiles.status}` 
            }, { status: 502 });
        }

        // Process successful response
        const sortFilesResponse = await sortedFiles.json();
        return NextResponse.json(sortFilesResponse, { status: 200 });

    } catch (error) {
        console.error("Unhandled error in sortdata API:", error);
        return NextResponse.json({ 
            error: "Server error", 
            message: "An unexpected error occurred while processing your request" 
        }, { status: 500 });
    }
}