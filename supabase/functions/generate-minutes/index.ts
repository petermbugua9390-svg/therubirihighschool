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

    const prompt = `You are tasked with generating HIGHLY DETAILED, PROFESSIONAL meeting minutes that read as authentic official records. Generate minutes based on:

═══════════════════════════════════════════════════════════════
MEETING DETAILS
═══════════════════════════════════════════════════════════════
Title: ${meetingTitle || "General Meeting"}
Date: ${meetingDate || new Date().toLocaleDateString()}
Venue: ${venue || "Conference Room"}
Attendees: ${attendees || "Committee Members"}

═══════════════════════════════════════════════════════════════
AGENDA ITEMS TO EXPAND
═══════════════════════════════════════════════════════════════
${agendas}

═══════════════════════════════════════════════════════════════
QUALITY REQUIREMENTS - FOLLOW STRICTLY
═══════════════════════════════════════════════════════════════

1. **DISCUSSION CONTENT** (Most Critical):
   - Write 150-300 words per agenda item
   - Include specific names of speakers with their contributions in quotes
   - Show back-and-forth dialogue: "Mr. Kamau raised concerns about... Mrs. Wanjiku responded by clarifying that..."
   - Add realistic statistics, figures, and data points where applicable
   - Include phrases like "After extensive deliberation...", "Following a motion by...", "The committee unanimously agreed..."
   - Reference previous meetings, policies, or documents when relevant
   - Show different perspectives: concerns raised, solutions proposed, compromises reached

2. **DECISIONS** (Be Specific):
   - State decisions formally: "RESOLVED: That the committee shall..."
   - Include voting outcomes where applicable: "The motion was carried by majority vote (8-2)"
   - Add conditions or timelines: "...subject to budget approval", "...effective from Term 2"

3. **ACTION ITEMS** (Detailed & Accountable):
   - Be specific about tasks: Not "Review budget" but "Prepare detailed budget breakdown for infrastructure repairs totaling KSh 2.5M"
   - Assign to specific named individuals with titles
   - Include realistic deadlines: "By Friday, 24th January 2025" not just "Next week"
   - Add follow-up mechanisms: "to be tabled at the next BOM meeting"

4. **PROFESSIONAL LANGUAGE**:
   - Use formal minute-writing conventions
   - Include procedural language: "The motion was duly seconded by..."
   - Reference attendee titles: "The Principal", "The Chairperson", "Hon. Member"
   - Use passive voice appropriately: "It was noted that...", "The matter was deferred..."

5. **ADDITIONAL ELEMENTS**:
   - Include an "Apologies" section with reasons where possible
   - Add a "Matters Arising" section referencing follow-ups from previous minutes
   - Make AOB section substantive with 2-3 items discussed
   - Include exact adjournment time and a formal closing

Return ONLY valid JSON in this exact format:
{
  "header": {
    "title": "Full formal meeting title",
    "date": "Full date with day (e.g., Friday, 17th January 2025)",
    "time": "Meeting time (e.g., 2:00 PM - 4:30 PM)",
    "venue": "Full venue name with location details",
    "attendees": ["List each attendee with their title/role"],
    "absentees": ["List absentees with apology reasons"],
    "chairperson": "Full name and title",
    "secretary": "Full name and title",
    "quorum": "Statement confirming quorum was met"
  },
  "callToOrder": "Detailed paragraph about meeting commencement, prayer if applicable, and chairperson's opening remarks",
  "previousMinutes": "Detailed paragraph about reading, corrections if any, and adoption of previous minutes including proposer and seconder",
  "mattersArising": [
    {
      "item": "Brief item description",
      "status": "Update on status with details",
      "remarks": "Any additional comments or carry-forward notes"
    }
  ],
  "agendaItems": [
    {
      "number": "1",
      "title": "Exact agenda title",
      "presenter": "Name and title of person presenting",
      "discussion": "EXTENSIVE discussion content (150-300 words) with named speakers, their contributions in quotes, different viewpoints, statistics, and deliberations",
      "decisions": ["Formal resolution statements with specific details"],
      "actionItems": [
        {
          "task": "Specific, detailed task description",
          "responsible": "Full name with title",
          "deadline": "Specific date (e.g., 24th January 2025)",
          "followUp": "How progress will be monitored"
        }
      ]
    }
  ],
  "aob": {
    "items": [
      {
        "topic": "Topic title",
        "raisedBy": "Name of person",
        "discussion": "Brief discussion summary",
        "outcome": "What was decided or action to take"
      }
    ]
  },
  "nextMeeting": {
    "date": "Proposed date",
    "time": "Proposed time",
    "venue": "Proposed venue",
    "tentativeAgenda": ["Key items for next meeting"]
  },
  "adjournment": {
    "time": "Exact time of adjournment",
    "closingRemarks": "Summary of chairperson's closing remarks",
    "closingPrayer": "Who led the closing prayer if applicable",
    "vote_of_thanks": "Who proposed and brief content"
  },
  "signatures": {
    "chairperson": "Space for chairperson signature and date",
    "secretary": "Space for secretary signature and date"
  }
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
            content: `You are an expert executive secretary with 20+ years of experience writing official meeting minutes for corporate boards, government committees, and educational institutions. 

Your minutes are known for being:
- EXCEPTIONALLY DETAILED - capturing the full essence of discussions
- PROFESSIONALLY FORMATTED - following international minute-writing standards
- AUTHENTIC - reading as if you were present at the actual meeting
- ACTIONABLE - with clear, specific, and trackable action items

Key principles:
1. Every discussion section must be substantial (150-300 words minimum)
2. Always include named speakers with their actual quoted statements
3. Show the deliberation process - concerns raised, solutions proposed, consensus reached
4. Use precise language: "RESOLVED", "NOTED", "AGREED", "ACTION"
5. Include realistic Kenyan context where appropriate (institutions, currency in KSh, local references)
6. Make action items specific with named individuals and exact dates

CRITICAL: Respond with valid JSON only. No markdown, no code blocks, just pure JSON.` 
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 8000,
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
      // Try to extract JSON from the response - handle potential markdown wrapping
      let jsonStr = content;
      
      // Remove markdown code blocks if present
      if (jsonStr.includes("```json")) {
        jsonStr = jsonStr.replace(/```json\s*/g, "").replace(/```\s*/g, "");
      } else if (jsonStr.includes("```")) {
        jsonStr = jsonStr.replace(/```\s*/g, "");
      }
      
      // Find the JSON object
      const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        minutes = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON object found in response");
      }
      
      // Ensure backward compatibility with older format
      if (!minutes.mattersArising) {
        minutes.mattersArising = [];
      }
      if (typeof minutes.aob === 'string') {
        minutes.aob = { items: [{ topic: "General", discussion: minutes.aob, outcome: "Noted" }] };
      }
      if (typeof minutes.adjournment === 'string') {
        minutes.adjournment = { time: "End of meeting", closingRemarks: minutes.adjournment };
      }
      if (typeof minutes.nextMeeting === 'string') {
        minutes.nextMeeting = { date: minutes.nextMeeting, time: "TBD", venue: "TBD" };
      }
      
    } catch (parseError) {
      console.error("Failed to parse minutes JSON:", parseError);
      console.error("Raw content:", content);
      return new Response(JSON.stringify({ error: "Failed to parse minutes response. Please try again." }), {
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
