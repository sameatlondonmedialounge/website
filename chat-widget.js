(function () {
    const style = document.createElement('style');
    style.textContent = `
    /* ====== CHAT WIDGET — PREMIUM MINIMAL ====== */

    /* Bubble prompt */
    .lml-chat-bubble {
        position: fixed;
        bottom: 112px;
        right: 32px;
        background: #18181f;
        color: rgba(255,255,255,0.85);
        padding: 13px 18px 13px 15px;
        border-radius: 14px 14px 4px 14px;
        font-family: 'Inter', sans-serif;
        font-size: 0.84rem;
        font-weight: 450;
        line-height: 1.5;
        max-width: 250px;
        border: 1px solid rgba(255,255,255,0.06);
        box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        z-index: 9997;
        opacity: 0;
        transform: translateY(8px);
        transition: all 0.35s ease;
        pointer-events: none;
    }
    .lml-chat-bubble.show {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
        cursor: pointer;
    }
    .lml-bubble-close {
        position: absolute;
        top: -7px;
        right: -7px;
        width: 20px;
        height: 20px;
        background: #28283a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 10px;
        color: rgba(255,255,255,0.5);
        line-height: 1;
        transition: background 0.2s;
    }
    .lml-bubble-close:hover { background: #3a3a50; color: white; }

    /* Toggle button */
    .lml-chat-btn {
        position: fixed;
        bottom: 32px;
        right: 32px;
        width: 68px;
        height: 68px;
        border-radius: 50%;
        background: #7c3aed;
        border: none;
        cursor: pointer;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 18px rgba(124,58,237,0.3);
        transition: all 0.25s ease;
    }
    .lml-chat-btn:hover {
        background: #6d28d9;
        box-shadow: 0 6px 24px rgba(124,58,237,0.4);
        transform: translateY(-2px);
    }
    .lml-chat-btn svg { width: 30px; height: 30px; fill: white; transition: all 0.2s; }
    .lml-chat-btn .lml-close-icon { display: none; width: 20px; height: 20px; }
    .lml-chat-btn.active .lml-chat-icon { display: none; }
    .lml-chat-btn.active .lml-close-icon { display: block; }
    .lml-chat-btn.active {
        width: 50px; height: 50px;
        border-radius: 50%;
        background: #5b21b6;
    }
    .lml-notif {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 12px;
        height: 12px;
        background: #f59e0b;
        border-radius: 50%;
        border: 2.5px solid #06081a;
    }
    .lml-chat-btn.active .lml-notif { display: none; }

    /* Panel */
    .lml-chat-panel {
        position: fixed;
        bottom: 112px;
        right: 32px;
        width: 380px;
        max-height: 580px;
        background: #0e0e15;
        border: 1px solid rgba(124,58,237,0.1);
        border-radius: 24px;
        z-index: 9998;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0,0,0,0.55);
        opacity: 0;
        transform: translateY(12px);
        pointer-events: none;
        transition: all 0.3s ease;
    }
    .lml-chat-panel.open {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
    }

    /* Header */
    .lml-chat-header {
        padding: 18px 20px;
        background: linear-gradient(135deg, #13121d 0%, #110f18 100%);
        border-bottom: 1px solid rgba(124,58,237,0.08);
        display: flex;
        align-items: center;
        gap: 13px;
    }
    .lml-chat-avatar {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: rgba(124,58,237,0.12);
        border: 1px solid rgba(124,58,237,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 19px;
        flex-shrink: 0;
    }
    .lml-chat-header-info { flex: 1; }
    .lml-chat-header-info h4 {
        margin: 0;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 0.9rem;
        color: rgba(255,255,255,0.9);
        letter-spacing: 0.2px;
    }
    .lml-chat-header-info span {
        font-size: 0.7rem;
        color: rgba(255,255,255,0.4);
        font-family: 'Inter', sans-serif;
        display: flex;
        align-items: center;
        gap: 5px;
        margin-top: 2px;
    }
    .lml-chat-status-dot {
        width: 6px;
        height: 6px;
        background: #4ade80;
        border-radius: 50%;
    }

    /* Welcome */
    .lml-chat-welcome {
        padding: 24px 20px 20px;
    }
    .lml-chat-welcome p {
        font-family: 'Inter', sans-serif;
        font-size: 0.84rem;
        color: rgba(255,255,255,0.45);
        margin: 0 0 18px;
        line-height: 1.5;
    }
    .lml-welcome-options { display: flex; flex-direction: column; gap: 6px; }
    .lml-welcome-btn {
        display: flex;
        align-items: center;
        gap: 13px;
        padding: 14px 16px;
        border-radius: 14px;
        border: 1px solid rgba(124,58,237,0.06);
        background: rgba(124,58,237,0.03);
        color: rgba(255,255,255,0.82);
        font-family: 'Inter', sans-serif;
        font-size: 0.85rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
    }
    .lml-welcome-btn:hover {
        background: rgba(124,58,237,0.08);
        border-color: rgba(124,58,237,0.18);
        transform: translateX(3px);
    }
    .lml-welcome-btn svg {
        width: 20px;
        height: 20px;
        fill: rgba(124,108,246,0.6);
        flex-shrink: 0;
    }
    .lml-welcome-btn div { flex: 1; }
    .lml-welcome-btn span {
        font-size: 0.7rem;
        color: rgba(255,255,255,0.3);
        display: block;
        font-weight: 400;
        margin-top: 1px;
    }

    /* Messages */
    .lml-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px 18px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        scrollbar-width: none;
        min-height: 250px;
        max-height: 330px;
    }
    .lml-chat-messages::-webkit-scrollbar { display: none; }

    .lml-msg {
        max-width: 82%;
        padding: 10px 14px;
        font-size: 0.835rem;
        line-height: 1.6;
        font-family: 'Inter', sans-serif;
        word-wrap: break-word;
        animation: lmlFadeIn 0.25s ease;
    }
    @keyframes lmlFadeIn {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .lml-msg-bot {
        align-self: flex-start;
        background: #161620;
        border: 1px solid rgba(255,255,255,0.04);
        color: rgba(255,255,255,0.82);
        border-radius: 14px 14px 14px 4px;
    }
    .lml-msg-user {
        align-self: flex-end;
        background: #2a2545;
        color: rgba(255,255,255,0.92);
        border-radius: 14px 14px 4px 14px;
    }
    .lml-msg-bot a {
        color: #9b8afb;
        text-decoration: underline;
        text-underline-offset: 2px;
    }
    .lml-msg-bot a:hover { color: #bdb0ff; }

    /* Typing */
    .lml-typing {
        align-self: flex-start;
        display: flex;
        gap: 5px;
        padding: 13px 16px;
        background: #161620;
        border: 1px solid rgba(255,255,255,0.04);
        border-radius: 14px 14px 14px 4px;
    }
    .lml-typing-dot {
        width: 5px;
        height: 5px;
        background: rgba(255,255,255,0.2);
        border-radius: 50%;
        animation: lmlDot 1.2s ease-in-out infinite;
    }
    .lml-typing-dot:nth-child(2) { animation-delay: 0.15s; }
    .lml-typing-dot:nth-child(3) { animation-delay: 0.3s; }
    @keyframes lmlDot {
        0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
        30% { opacity: 1; transform: translateY(-4px); }
    }

    /* Input */
    .lml-chat-input {
        padding: 14px 16px;
        border-top: 1px solid rgba(255,255,255,0.04);
        display: flex;
        gap: 10px;
        align-items: center;
        background: #0f0f14;
    }
    .lml-chat-input input {
        flex: 1;
        background: #161620;
        border: 1px solid rgba(255,255,255,0.05);
        border-radius: 12px;
        padding: 11px 14px;
        color: rgba(255,255,255,0.88);
        font-size: 0.84rem;
        font-family: 'Inter', sans-serif;
        outline: none;
        transition: border-color 0.2s;
    }
    .lml-chat-input input::placeholder { color: rgba(255,255,255,0.22); }
    .lml-chat-input input:focus { border-color: rgba(124,108,246,0.25); }
    .lml-chat-send {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #7c3aed;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        flex-shrink: 0;
    }
    .lml-chat-send:hover { background: #6d28d9; }
    .lml-chat-send:disabled { opacity: 0.3; cursor: not-allowed; }
    .lml-chat-send svg { width: 16px; height: 16px; fill: white; }

    /* Footer */
    .lml-chat-footer {
        text-align: center;
        padding: 8px;
        font-size: 0.6rem;
        color: rgba(255,255,255,0.12);
        font-family: 'Inter', sans-serif;
        letter-spacing: 0.3px;
    }

    /* View states */
    .lml-chat-welcome-view .lml-chat-messages,
    .lml-chat-welcome-view .lml-chat-input { display: none; }
    .lml-chat-active-view .lml-chat-welcome { display: none; }

    /* Tablet */
    @media (max-width: 768px) {
        .lml-chat-panel { width: 360px; max-height: 520px; }
        .lml-chat-btn { width: 62px; height: 62px; bottom: 24px; right: 24px; }
        .lml-chat-bubble { right: 24px; bottom: 98px; }
        .lml-chat-panel { bottom: 98px; right: 24px; }
    }
    /* Phone */
    @media (max-width: 480px) {
        .lml-chat-panel {
            right: 10px; left: 10px; bottom: 90px;
            width: auto; max-height: 72vh; border-radius: 18px;
        }
        .lml-chat-btn { bottom: 18px; right: 18px; width: 56px; height: 56px; border-radius: 50%; }
        .lml-chat-btn svg { width: 26px; height: 26px; }
        .lml-chat-bubble { right: 18px; bottom: 86px; max-width: 230px; font-size: 0.8rem; padding: 11px 15px; }
        .lml-chat-header { padding: 14px 16px; }
        .lml-chat-avatar { width: 36px; height: 36px; font-size: 16px; }
        .lml-chat-header-info h4 { font-size: 0.84rem; }
        .lml-chat-welcome { padding: 18px 16px 16px; }
        .lml-welcome-btn { padding: 12px 14px; font-size: 0.82rem; }
        .lml-chat-messages { padding: 12px 14px; min-height: 200px; }
        .lml-msg { font-size: 0.8rem; padding: 9px 12px; }
        .lml-chat-input { padding: 10px 12px; }
        .lml-chat-input input { padding: 10px 12px; font-size: 0.82rem; }
        .lml-chat-send { width: 36px; height: 36px; }
    }
    /* Very small phone */
    @media (max-width: 360px) {
        .lml-chat-panel { border-radius: 16px; max-height: 68vh; }
        .lml-welcome-btn { padding: 10px 12px; gap: 10px; font-size: 0.78rem; }
        .lml-welcome-btn svg { width: 18px; height: 18px; }
        .lml-chat-bubble { max-width: 200px; }
    }
    `;
    document.head.appendChild(style);

    const widget = document.createElement('div');
    widget.id = 'lml-chat-widget';
    widget.innerHTML = `
    <div class="lml-chat-bubble" id="lmlBubble">
        Have a question about our studios?<br>We're here to help.
        <div class="lml-bubble-close" id="lmlBubbleClose">&times;</div>
    </div>
    <button class="lml-chat-btn" id="lmlChatToggle" aria-label="Chat with us">
        <span class="lml-notif"></span>
        <svg class="lml-chat-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 5.58 2 10c0 2.24 1.12 4.27 2.94 5.72L4 20l4.46-2.23C9.56 17.92 10.76 18 12 18c5.52 0 10-3.58 10-8s-4.48-8-10-8z"/><circle cx="8.5" cy="10" r="1.2"/><circle cx="12" cy="10" r="1.2"/><circle cx="15.5" cy="10" r="1.2"/></svg>
        <svg class="lml-close-icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    </button>
    <div class="lml-chat-panel lml-chat-welcome-view" id="lmlChatPanel">
        <div class="lml-chat-header">
            <div class="lml-chat-avatar">🎙️</div>
            <div class="lml-chat-header-info">
                <h4>London Media Lounge</h4>
                <span><span class="lml-chat-status-dot"></span> Typically replies instantly</span>
            </div>
        </div>
        <div class="lml-chat-welcome" id="lmlWelcome">
            <p>How can we help you today?</p>
            <div class="lml-welcome-options">
                <div class="lml-welcome-btn" data-msg="What services do you offer?">
                    <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>
                    <div>Explore services<span>Studios, editing, growth packages</span></div>
                </div>
                <div class="lml-welcome-btn" data-msg="What are your prices?">
                    <svg viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
                    <div>View pricing<span>From £45/hr — 50% off first session</span></div>
                </div>
                <div class="lml-welcome-btn" data-msg="I want to book a session">
                    <svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/></svg>
                    <div>Book a session<span>Online or call — your choice</span></div>
                </div>
                <div class="lml-welcome-btn" data-msg="Tell me about your studio">
                    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    <div>About the studio<span>Equipment, location, team</span></div>
                </div>
            </div>
        </div>
        <div class="lml-chat-messages" id="lmlMessages"></div>
        <div class="lml-chat-input">
            <input type="text" id="lmlInput" placeholder="Type a message..." autocomplete="off">
            <button class="lml-chat-send" id="lmlSend" aria-label="Send">
                <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
        </div>
        <div class="lml-chat-footer">London Media Lounge AI Assistant</div>
    </div>`;
    document.body.appendChild(widget);

    const toggle = document.getElementById('lmlChatToggle');
    const panel = document.getElementById('lmlChatPanel');
    const messagesEl = document.getElementById('lmlMessages');
    const input = document.getElementById('lmlInput');
    const sendBtn = document.getElementById('lmlSend');
    const bubble = document.getElementById('lmlBubble');
    const bubbleClose = document.getElementById('lmlBubbleClose');
    const welcome = document.getElementById('lmlWelcome');
    let isOpen = false, chatStarted = false, messages = [], isLoading = false, bubbleDismissed = false;

    setTimeout(() => { if (!isOpen && !bubbleDismissed) bubble.classList.add('show'); }, 1000);
    setTimeout(() => { if (!isOpen) bubble.classList.remove('show'); }, 18000);

    bubbleClose.addEventListener('click', (e) => {
        e.stopPropagation();
        bubble.classList.remove('show');
        bubbleDismissed = true;
    });

    bubble.addEventListener('click', () => {
        bubble.classList.remove('show');
        bubbleDismissed = true;
        if (!isOpen) toggleChat();
    });

    function toggleChat() {
        isOpen = !isOpen;
        panel.classList.toggle('open', isOpen);
        toggle.classList.toggle('active', isOpen);
        bubble.classList.remove('show');
        bubbleDismissed = true;
        if (isOpen && chatStarted) setTimeout(() => input.focus(), 300);
    }

    function startChat(msg) {
        chatStarted = true;
        panel.classList.remove('lml-chat-welcome-view');
        panel.classList.add('lml-chat-active-view');
        addBotMessage("Hey there 👋 Welcome to London Media Lounge. How can I help you today?");
        setTimeout(() => input.focus(), 100);
        if (msg) setTimeout(() => sendMessage(msg), 500);
    }

    function addBotMessage(text) {
        messages.push({ role: 'assistant', content: text });
        const div = document.createElement('div');
        div.className = 'lml-msg lml-msg-bot';
        div.innerHTML = formatMessage(text);
        messagesEl.appendChild(div);
        scrollBottom();
    }

    function addUserMessage(text) {
        messages.push({ role: 'user', content: text });
        const div = document.createElement('div');
        div.className = 'lml-msg lml-msg-user';
        div.textContent = text;
        messagesEl.appendChild(div);
        scrollBottom();
    }

    function formatMessage(text) {
        let h = text.replace(/(https?:\/\/[^\s<\)]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
        return h.replace(/\n/g, '<br>');
    }

    function showTyping() {
        const d = document.createElement('div');
        d.className = 'lml-typing'; d.id = 'lmlTyping';
        d.innerHTML = '<div class="lml-typing-dot"></div><div class="lml-typing-dot"></div><div class="lml-typing-dot"></div>';
        messagesEl.appendChild(d); scrollBottom();
    }

    function hideTyping() { const e = document.getElementById('lmlTyping'); if (e) e.remove(); }
    function scrollBottom() { requestAnimationFrame(() => { messagesEl.scrollTop = messagesEl.scrollHeight; }); }

    async function sendMessage(text) {
        const msg = text || input.value.trim();
        if (!msg || isLoading) return;
        if (!chatStarted) { startChat(); setTimeout(() => sendMessage(msg), 600); return; }
        input.value = '';
        addUserMessage(msg);
        isLoading = true; sendBtn.disabled = true;
        showTyping();
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: messages.filter(m => m.role !== 'system') })
            });
            if (!res.ok) throw new Error();
            const data = await res.json();
            hideTyping();
            addBotMessage(data.message);
        } catch {
            hideTyping();
            addBotMessage("I'm having trouble connecting right now. Please reach us directly:\n\n📞 +44 7700 175079\n🌐 https://londonmedialoungestudio.simplybook.it/v2/#book");
        }
        isLoading = false; sendBtn.disabled = false; input.focus();
    }

    toggle.addEventListener('click', toggleChat);
    sendBtn.addEventListener('click', () => sendMessage());
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });
    welcome.addEventListener('click', (e) => { const b = e.target.closest('.lml-welcome-btn'); if (b) startChat(b.dataset.msg); });
    input.addEventListener('focus', () => { if (!chatStarted) startChat(); });
})();

// Close the mobile offcanvas menu when a nav link is tapped.
// (We removed data-bs-dismiss from the links because it cancelled navigation
// on mobile; this closes the menu without blocking the link.)
(function () {
    function bindMobileNav() {
        var mobileNav = document.getElementById('mobileNav');
        if (!mobileNav || !window.bootstrap || !window.bootstrap.Offcanvas) return;
        mobileNav.querySelectorAll('a[href]').forEach(function (link) {
            link.addEventListener('click', function () {
                window.bootstrap.Offcanvas.getOrCreateInstance(mobileNav).hide();
            });
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindMobileNav);
    } else {
        bindMobileNav();
    }
})();
