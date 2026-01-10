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
    const { prompt } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: `You are a study planning expert. You create detailed, practical study timetables for students. 
            Always respond with valid JSON arrays only, no markdown or other text.
            Consider the student's priorities, available time, and learning needs.
            Include variety in study activities (reading, practice problems, revision, etc).
            Distribute subjects evenly across the week with high-priority subjects getting more time slots.` 
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
      return new Response(JSON.stringify({ error: "Failed to generate timetable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // Parse the JSON response
    let timetable;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        timetable = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON array found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse timetable JSON:", parseError);
      console.error("Raw content:", content);
      return new Response(JSON.stringify({ error: "Failed to parse timetable response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ timetable }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Generate timetable error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
