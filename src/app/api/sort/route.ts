import { subscriptionmodel } from '@/app/lib/util';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { env } from 'process';
import { currentUser } from '@clerk/nextjs/server';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function convertLinkToFormData(formData: FormData, url: string, fieldName: string, filename: string): Promise<FormData> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to download file from ${url}. Status code: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    // In browsers, you can directly use Blob for file data in FormData
    const blob = new Blob([arrayBuffer], { type: response.headers.get("content-type")! });

    // Append the file (as a Blob) to the form data
    formData.append(fieldName, blob, filename);

    return formData;
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

        // Parse request body
        try {
            body = await req.json();
        } catch (error) {
            return NextResponse.json({ 
                error: "Invalid request", 
                message: "The request body could not be parsed" 
            }, { status: 400 });
        }

        // Check subscription limits
        const subscriptionId = user.unsafeMetadata?.subscriptionid as number;
        const maxFiles = subscriptionmodel(subscriptionId)?.maxfiles || 0;
        
        // Check if the number of files exceeds the subscription limit
        if (Array.isArray(body) && body.length > maxFiles) {
            return NextResponse.json({ 
                error: "Subscription limit exceeded", 
                message: `Dein Abonnement erlaubt maximal ${maxFiles} Dateien. Du hast ${body.length} Dateien hochgeladen.` 
            }, { status: 403 });
        }
        
        // Also check if the user has a valid subscription
        if (maxFiles === 0) {
            return NextResponse.json({ 
                error: "Invalid subscription", 
                message: "Du hast kein aktives Abonnement. Bitte wähle ein Abonnement aus." 
            }, { status: 403 });
        }

        // Check rate limiting
        if (user.unsafeMetadata?.lastfileupload) {
            const lastUploadTime = new Date(String(user.unsafeMetadata.lastfileupload));
            const cooldownTime = new Date();
            cooldownTime.setSeconds(cooldownTime.getSeconds() - 30); // 30 second cooldown
            
            if (lastUploadTime >= cooldownTime) {
                return NextResponse.json({ 
                    error: "Rate limit exceeded", 
                    message: "Please wait at least 30 seconds between uploads" 
                }, { status: 429 });
            }
        }

        console.log("file:", body);

        // Prepare form data for API call
        const filesFormData = new FormData();
        filesFormData.append('filejson', JSON.stringify(body));

        // Attempt API call with retries
        let response;
        let apiError = null;

        for (let i = 0; i <= 3; i++) {
            try {
                response = await fetch(env.SORTAI_API_URL as string + "uploadfilev2/", {
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
        if (!response?.ok) {
            return NextResponse.json({ 
                error: "External API error", 
                message: "Could not process files with the sorting API" 
            }, { status: 502 });
        }

        // Process successful response
        const responseData = await response.json();
        console.log("responseData:", responseData);

        // Update user metadata after successful operation
        try {
            await (await clerkClient()).users.updateUser(userId, {
                unsafeMetadata: {
                    ...user.unsafeMetadata,
                    lastsort: new Date()
                }
            });
        } catch (error) {
            console.error("Error updating user metadata after sort:", error);
            // Continue since the operation was successful
        }

        return NextResponse.json(responseData, { status: 200 });

    } catch (error) {
        console.error("Unhandled error in sort API:", error);
        return NextResponse.json({ 
            error: "Server error", 
            message: "An unexpected error occurred while processing your request" 
        }, { status: 500 });
    }
}