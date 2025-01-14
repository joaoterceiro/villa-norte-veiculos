import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const WEBHOOK_URL = "https://n8n.villanortevelculos.com/webhook/6e61ea1a0-2b4f-4d8d-998c-62696d8057b8"

serve(async (req) => {
  try {
    const data = await req.json()
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Webhook request failed')
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})