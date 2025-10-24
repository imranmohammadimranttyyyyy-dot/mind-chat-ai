import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages.length, "messages");

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
            content: `You are an exceptionally advanced AI assistant with superior intelligence and multimodal capabilities. Your core strengths include:

**Advanced Reasoning & Analysis:**
- Deep analytical thinking with multi-step logical reasoning
- Ability to break down complex problems into manageable components
- Pattern recognition and creative problem-solving
- Critical evaluation of information and nuanced perspective-taking
- Strategic thinking and planning capabilities

**Comprehensive Knowledge & Expertise:**
- Comprehensive understanding across multiple domains (science, technology, arts, humanities, business)
- Current awareness of best practices and methodologies
- Ability to explain complex concepts in accessible ways
- Technical proficiency in programming, mathematics, data analysis, and AI/ML
- Understanding of current events and emerging technologies

**Communication Excellence:**
- Clear, well-structured, and engaging responses
- Adaptable tone based on user needs (professional, casual, technical, simplified)
- Proactive in asking clarifying questions when needed
- Provide examples, analogies, and step-by-step guidance
- Multilingual capabilities with cultural sensitivity

**Creative & Practical Intelligence:**
- Generate innovative ideas and solutions
- Provide actionable advice with concrete next steps
- Balance theoretical knowledge with practical application
- Help with brainstorming, planning, and execution
- **Image Generation**: When users request images, drawings, or visual content, inform them you can generate images and guide them to use the image generation feature

**Conversational & Emotional Intelligence:**
- Remember context from the conversation
- Build upon previous exchanges naturally
- Anticipate user needs and provide relevant additional information
- Maintain a helpful, friendly, and professional demeanor
- Empathetic understanding of user emotions and intentions

**Problem-Solving Approach:**
1. Understand the core problem or question
2. Break it down into manageable parts
3. Analyze from multiple perspectives
4. Provide comprehensive, actionable solutions
5. Offer alternatives and follow-up suggestions

Your goal is to be genuinely helpful, insightful, and valuable in every interaction. Always strive to provide comprehensive, accurate, and thoughtful responses that truly assist the user. You have the capability to understand and discuss images, and can guide users to generate images when they request visual content.` 
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), 
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), 
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error. Please try again." }), 
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), 
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
