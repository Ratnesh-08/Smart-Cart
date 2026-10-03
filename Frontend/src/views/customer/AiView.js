// Smart Cart AI - Customer AI Assistant View (Exact Google Stitch Design)
import { getIcon } from '../../components/icons.js';
import { store } from '../../store/state.js';
import { askSmartCartAi } from '../../services/geminiService.js';

let chatMessages = [
  {
    sender: 'ai',
    text: "Hello Alex! I'm your **Smart Cart AI Assistant**. Ask me where products are located, how much you've spent, or what fits in your ₹1,500 budget!",
    timestamp: 'Just now'
  }
];

let isListening = false;

export function renderCustomerAi() {
  const ctx = store.getAiContext();

  return `
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 12px; height: calc(100vh - 128px); background: #F8FAFC;">
      
      <!-- Screen Header -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h2 style="font-size: 18px; font-weight: 700; display: flex; align-items: center; gap: 6px; color: var(--text-primary);">
            <span style="color: #9333EA;">${getIcon('sparkles', 22)}</span> Smart Cart AI Assistant
          </h2>
          <p style="font-size: 11px; color: var(--text-secondary);">SuperMart Hazratganj • Live Cart & Budget Context</p>
        </div>
        <span class="stitch-badge badge-cyan" style="font-size: 10px;">Gemini Core</span>
      </div>

      <!-- Live Context Bar -->
      <div style="background: #FAF5FF; border: 1px solid #E9D5FF; border-radius: 8px; padding: 6px 10px; font-size: 11px; color: #7E22CE; display: flex; justify-content: space-between; align-items: center;">
        <span>Cart: <strong>${ctx.itemCount} items</strong> (₹${ctx.spent.toFixed(2)})</span>
        <span>Remaining: <strong>₹${ctx.remaining.toFixed(2)}</strong></span>
      </div>

      <!-- Suggested Question Chips (Matching Stitch Screenshots) -->
      <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 2px;" id="ai-suggestion-chips">
        <button class="ai-chip btn-secondary" data-prompt="Where is rice?" style="font-size: 11px; white-space: nowrap; border-radius: 99px; padding: 5px 12px; background: #FFFFFF;">
          🌾 Where is rice?
        </button>
        <button class="ai-chip btn-secondary" data-prompt="How much have I spent?" style="font-size: 11px; white-space: nowrap; border-radius: 99px; padding: 5px 12px; background: #FFFFFF;">
          💳 How much have I spent?
        </button>
        <button class="ai-chip btn-secondary" data-prompt="What can I buy with ₹300?" style="font-size: 11px; white-space: nowrap; border-radius: 99px; padding: 5px 12px; background: #FFFFFF;">
          💰 What can I buy with ₹300?
        </button>
      </div>

      <!-- Voice Waveform & Listening State Indicator Banner -->
      ${isListening ? `
        <div style="background: #0F172A; color: white; padding: 12px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; animation: fadeIn 0.2s ease;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="color: #38BDF8;">${getIcon('mic', 20)}</div>
            <div>
              <div style="font-size: 12px; font-weight: 700;">Listening to speech...</div>
              <div style="font-size: 10px; color: #94A3B8;">Say e.g. "Where is Milk?"</div>
            </div>
          </div>

          <!-- Animated Voice Waveform Bars -->
          <div style="display: flex; align-items: center; gap: 3px; height: 24px;">
            <div class="wave-bar" style="width: 3px; height: 100%; background: #38BDF8; animation: wave 0.8s infinite ease-in-out;"></div>
            <div class="wave-bar" style="width: 3px; height: 60%; background: #34D399; animation: wave 0.6s infinite ease-in-out 0.2s;"></div>
            <div class="wave-bar" style="width: 3px; height: 80%; background: #0EA5E9; animation: wave 0.7s infinite ease-in-out 0.4s;"></div>
            <div class="wave-bar" style="width: 3px; height: 40%; background: #38BDF8; animation: wave 0.5s infinite ease-in-out 0.1s;"></div>
          </div>
        </div>
      ` : ''}

      <!-- Chat Thread Messages Area -->
      <div id="ai-chat-thread" class="stitch-card" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; background: #FFFFFF; padding: 14px; border: 1px solid var(--border-light);">
        ${chatMessages.map(msg => renderChatMessage(msg)).join('')}
      </div>

      <!-- Input Bar & Microphone Button -->
      <div style="display: flex; gap: 8px; align-items: center;">
        <button id="btn-voice-input" class="btn-secondary ${isListening ? 'active-listening' : ''}" title="Voice Input" style="padding: 10px; border-radius: 10px; color: ${isListening ? '#EF4444' : '#0EA5E9'}; border-color: ${isListening ? '#FCA5A5' : 'var(--border-medium)'}; background: ${isListening ? '#FEE2E2' : '#FFFFFF'};">
          ${getIcon('mic', 20)}
        </button>
        <input type="text" id="ai-chat-input" class="form-input" placeholder="Ask AI: e.g. 'Where is rice?' or 'What can I buy with ₹300?'..." style="padding: 10px 12px; border-radius: 10px; font-size: 12px;"/>
        <button id="btn-send-ai" class="btn-primary" style="padding: 10px 14px; background: #0F172A; border-radius: 10px;">
          ${getIcon('arrow-right', 18)}
        </button>
      </div>

    </div>

    <style>
      @keyframes wave {
        0%, 100% { transform: scaleY(0.4); }
        50% { transform: scaleY(1.2); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
  `;
}

function renderChatMessage(msg) {
  const isAi = msg.sender === 'ai';
  return `
    <div style="display: flex; gap: 8px; ${isAi ? '' : 'justify-content: flex-end;'}">
      ${isAi ? `
        <div style="width: 28px; height: 28px; border-radius: 99px; background: #9333EA; color: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 6px rgba(147, 51, 234, 0.3);">
          ${getIcon('sparkles', 14)}
        </div>
      ` : ''}

      <div style="max-width: 84%; background: ${isAi ? '#F8FAFC' : '#0F172A'}; color: ${isAi ? 'var(--text-primary)' : '#FFFFFF'}; padding: 10px 14px; border-radius: 12px; border: ${isAi ? '1px solid var(--border-light)' : 'none'}; box-shadow: var(--shadow-sm);">
        <div style="font-size: 12px; line-height: 1.5;">${msg.text}</div>
        
        ${msg.productCard ? `
          <div style="margin-top: 8px; background: #FFFFFF; border: 1px solid var(--border-light); border-radius: 8px; padding: 8px 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px; color: var(--text-primary);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="${msg.productCard.image}" style="width: 38px; height: 38px; border-radius: 6px; object-fit: cover;"/>
              <div>
                <div style="font-size: 11px; font-weight: 700;">${msg.productCard.name}</div>
                <div style="font-size: 10px; color: #0284C7; font-weight: 600;">₹${msg.productCard.price.toFixed(2)} • ${msg.productCard.locationName.split('–')[0]}</div>
              </div>
            </div>
            <button class="btn-primary btn-add-ai-prod" data-id="${msg.productCard.id}" style="padding: 4px 10px; font-size: 11px; background: #0F172A; border-radius: 6px; white-space: nowrap;">
              + ADD
            </button>
          </div>
        ` : ''}

        <div style="font-size: 9px; opacity: 0.6; margin-top: 4px; text-align: right;">${msg.timestamp}</div>
      </div>
    </div>
  `;
}

export function bindAiEvents(container) {
  const chatThread = container.querySelector('#ai-chat-thread');
  const chatInput = container.querySelector('#ai-chat-input');
  const sendBtn = container.querySelector('#btn-send-ai');
  const voiceBtn = container.querySelector('#btn-voice-input');

  const scrollToBottom = () => {
    if (chatThread) chatThread.scrollTop = chatThread.scrollHeight;
  };
  scrollToBottom();

  const handleSend = async (text) => {
    const userText = text || chatInput.value.trim();
    if (!userText) return;

    chatMessages.push({
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    if (chatInput) chatInput.value = '';
    chatThread.innerHTML = chatMessages.map(m => renderChatMessage(m)).join('');
    scrollToBottom();

    // Call Gemini AI Abstraction Service
    const aiResponse = await askSmartCartAi(userText);

    chatMessages.push({
      sender: 'ai',
      text: aiResponse.text,
      productCard: aiResponse.productCard,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    chatThread.innerHTML = chatMessages.map(m => renderChatMessage(m)).join('');
    bindAddEvents();
    scrollToBottom();
  };

  const bindAddEvents = () => {
    chatThread.querySelectorAll('.btn-add-ai-prod').forEach(b => {
      b.addEventListener('click', () => {
        const pId = b.dataset.id;
        const prod = store.products.find(p => p.id === pId);
        if (prod) store.addToCart(prod, 1);
      });
    });
  };

  bindAddEvents();

  if (sendBtn) sendBtn.addEventListener('click', () => handleSend());
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  // Voice Mic Listening toggle
  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      isListening = !isListening;
      store.notify(); // Re-renders to toggle waveform banner

      if (isListening) {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          const recognition = new SpeechRecognition();
          recognition.onresult = (e) => {
            const spoken = e.results[0][0].transcript;
            isListening = false;
            handleSend(spoken);
          };
          recognition.onerror = () => {
            isListening = false;
            store.notify();
          };
          recognition.start();
        } else {
          setTimeout(() => {
            isListening = false;
            handleSend("Where is rice?");
          }, 1500);
        }
      }
    });
  }

  // Question Chips click
  container.querySelectorAll('.ai-chip').forEach(c => {
    c.addEventListener('click', () => {
      handleSend(c.dataset.prompt);
    });
  });
}
