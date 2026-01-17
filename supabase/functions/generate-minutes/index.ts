import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { agendas, meetingTitle, meetingDate, attendees, venue } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const prompt = `Generate detailed, professional meeting minutes based on the following information:

MEETING TITLE: ${meetingTitle || "Meeting"}
DATE: ${meetingDate || new Date().toLocaleDateString()}
VENUE: ${venue || "Not specified"}
ATTENDEES: ${attendees || "Not specified"}

AGENDA ITEMS:
${agendas}

Please generate comprehensive meeting minutes that include:
1. A formal header with meeting details
2. Call to order
3. Each agenda item with:
   - Discussion points (create realistic, detailed discussion content)
   - Key decisions made
   - Action items with responsible persons and deadlines
4. Any other business (AOB)
5. Date and time of next meeting (suggest one)
6. Adjournment

Format the minutes professionally with clear sections. Use formal language appropriate for official meeting records. Make the content detailed and realistic as if the meeting actually took place.

Return ONLY valid JSON in this exact format:
{
  "header": {
    "title": "string",
    "date": "string",
    "venue": "string",
    "attendees": ["array of attendee names"],
    "absentees": ["array if any"],
    "chairperson": "string",
    "secretary": "string"
  },
  "callToOrder": "string describing when meeting was called to order",
  "previousMinutes": "string about approval of previous minutes",
  "agendaItems": [
    {
      "number": "1",
      "title": "string",
      "discussion": "detailed discussion content",
      "decisions": ["array of decisions"],
      "actionItems": [
        {
          "task": "string",
          "responsible": "string",
          "deadline": "string"
        }
      ]
    }
  ],
  "aob": "any other business discussed",
  "nextMeeting": "date and time of next meeting",
  "adjournment": "string describing when meeting was adjourned"
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { 
            role: "system", 
            content: `You are an expert meeting secretary who creates professional, detailed meeting minutes. 
            Always respond with valid JSON only, no markdown or other text.
            Create realistic, comprehensive content that reads as if the meeting actually happened.
            Be formal and professional in tone.` 
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to generate minutes" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    console.log("Raw AI response:", content);
    
    // Parse the JSON response
    let minutes;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        minutes = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON object found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse minutes JSON:", parseError);
      console.error("Raw content:", content);
      return new Response(JSON.stringify({ error: "Failed to parse minutes response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ minutes }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Generate minutes error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
