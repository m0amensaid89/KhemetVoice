"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const agents_1 = require("@livekit/agents");
const agents_2 = require("@livekit/agents");
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("@khemet/db"));
const agents_plugin_deepgram_1 = require("@livekit/agents-plugin-deepgram");
const openai = __importStar(require("@livekit/agents-plugin-openai"));
dotenv.config({ path: path_1.default.join(__dirname, '../.env.local') });
exports.default = (0, agents_1.defineAgent)({
    entry: async (ctx) => {
        await ctx.connect();
        const participant = await ctx.waitForParticipant();
        let sessionId = 'default';
        if (ctx.room && ctx.room.name) {
            sessionId = ctx.room.name.replace('room-', '');
        }
        const sessionStartTime = Date.now();
        let agentPrompt = `You are Nour, an intelligent voice agent for Khemet Voice.
You speak naturally and professionally.
You automatically detect and respond in the same language the user speaks.
If the user speaks Arabic, respond in their specific dialect (Egyptian, Gulf, Levantine etc).
If the user speaks English, respond in clear professional English.

Your goal is to qualify the lead by naturally collecting:
- Full name
- Company name
- Email address
- Phone number
- Their main challenge or what they are looking for

Rules:
- Never ask for all information at once
- Ask one question at a time naturally within the conversation
- Be warm, human, and conversational — never robotic
- Once you have all 5 data points, confirm them back to the user and thank them
- Keep responses short — this is a voice conversation, not a chat
- MUST use the capture_lead tool once all the information is collected to save the data.`;
        const model = new openai.LLM({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENROUTER_API_KEY,
            model: 'openai/gpt-4o-mini',
        });
        const stt = new agents_plugin_deepgram_1.STT({ apiKey: process.env.DEEPGRAM_API_KEY });
        // using mock TTS for v1 as OpenRouter doesn't support TTS directly, relying on text rendering in UI
        const tts = null;
        const agent = new agents_2.pipeline.VoicePipelineAgent(null, // VAD
        stt, model, tts, { systemPrompt: agentPrompt });
        if (ctx.room) {
            agent.start(ctx.room, participant);
        }
        // Setup disconnect handler to save duration
        if (ctx.room) {
            ctx.room.on('disconnected', async () => {
                const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
                try {
                    await db_1.default.session.update({
                        where: { id: sessionId },
                        data: { duration, status: 'completed' }
                    });
                }
                catch (e) {
                    console.error("Failed to update session duration", e);
                }
            });
        }
        await agent.say('أهلاً وسهلاً — I am Nour from Khemet Voice. How can I help you today?', true);
    },
});
agents_1.cli.runApp(new agents_1.WorkerOptions({ agent: __filename }));
