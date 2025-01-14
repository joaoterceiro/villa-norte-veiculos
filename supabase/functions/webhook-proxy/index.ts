import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const WEBHOOK_URL = "https://n8n.villanortevelculos.com/webhook/6e61ea1a0-2b4f-4d8d-998c-62696d8057b8"
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendWebhookWithRetry(data: any, retryCount = 0): Promise<Response> {
  try {
    console.log(`Attempt ${retryCount + 1} - Sending data to webhook:`, data);
    console.log('Webhook URL:', WEBHOOK_URL);
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
      // @ts-ignore - Deno fetch has different type definitions
      redirect: 'follow',
    });

    console.log(`Webhook response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Webhook error response:', errorText);
      console.error('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying in ${RETRY_DELAY}ms...`);
        await sleep(RETRY_DELAY);
        return sendWebhookWithRetry(data, retryCount + 1);
      }
      
      throw new Error(`Webhook request failed with status ${response.status}: ${errorText}`);
    }

    let responseData;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }
    
    console.log('Webhook response data:', responseData);
    return new Response(JSON.stringify({ success: true, data: responseData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error(`Attempt ${retryCount + 1} failed:`, error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying in ${RETRY_DELAY}ms...`);
      await sleep(RETRY_DELAY);
      return sendWebhookWithRetry(data, retryCount + 1);
    }
    
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    })
  }

  try {
    const data = await req.json()
    console.log('Received request data:', data);
    
    const response = await sendWebhookWithRetry(data);
    return response;
  } catch (error) {
    console.error('Error in webhook-proxy:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error instanceof Error ? error.stack : undefined 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})