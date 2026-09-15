(() => {
    const launcher = document.createElement("button");
    launcher.id = "al-chat-launcher";
    launcher.setAttribute("aria-label", "Open AutomateLabs chatbot");
    launcher.innerHTML = `
        <img src="icons/favicon.png" alt="">
    `;

    const widget = document.createElement("div");
    widget.id = "al-chat-widget";
    widget.hidden = true;

    widget.innerHTML = `
        <div class="al-chat-header">
            <div class="al-chat-brand">
                <img src="icons/favicon.png" alt="">
                <div>
                    <strong>AutomateLabs</strong>
                    <span>Online assistant</span>
                </div>
            </div>

            <button class="al-chat-close" aria-label="Close chatbot">×</button>
        </div>

        <div class="al-chat-messages"></div>

        <div class="al-chat-input-area">
            <textarea
                class="al-chat-input"
                placeholder="Ask me anything..."
                rows="1"
                maxlength="2000"
            ></textarea>

            <button class="al-chat-send" aria-label="Send message">
                ↑
            </button>

            <small class="al-chat-disclaimer">
                AutomateLabs AI assistant
            </small>
        </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(widget);

    const messages = widget.querySelector(".al-chat-messages");
    const input = widget.querySelector(".al-chat-input");
    const send = widget.querySelector(".al-chat-send");
    const close = widget.querySelector(".al-chat-close");

    let history = [];

    function openChat() {
        widget.hidden = false;
        launcher.classList.add("is-hidden");

        if (!messages.children.length) {
            showWelcome();
        }

        setTimeout(() => input.focus(), 100);
    }

    function closeChat() {
        widget.hidden = true;
        launcher.classList.remove("is-hidden");
    }

    function addMessage(text, type = "assistant") {
        const message = document.createElement("div");
        message.className = `al-chat-message ${type}`;

        const bubble = document.createElement("div");
        bubble.className = "al-chat-bubble";
        bubble.textContent = text;

        message.appendChild(bubble);
        messages.appendChild(message);

        messages.scrollTop = messages.scrollHeight;
    }

    function addActionButtons() {
        const actions = document.createElement("div");
        actions.className = "al-chat-actions";

        actions.innerHTML = `
            <button data-action="build">
                Build my chatbot
            </button>

            <button data-action="products">
                Explore products
            </button>

            <button data-action="question">
                Ask a question
            </button>
        `;

        messages.appendChild(actions);

        actions.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", () => {
                const action = button.dataset.action;

                if (action === "build") {
                    sendMessage(
                        "I want to build my own chatbot. How does the 5-minute setup work?"
                    );
                }

                if (action === "products") {
                    sendMessage(
                        "Can you explain your products?"
                    );
                }

                if (action === "question") {
                    input.focus();
                }
            });
        });
    }

    function showWelcome() {
        addMessage(
            "Hi! 👋\n\nWant to build your own chatbot? It takes about 5 minutes."
        );

        addActionButtons();
    }

    function showTyping() {
        const typing = document.createElement("div");
        typing.className = "al-chat-message assistant al-chat-typing";
        typing.innerHTML = `
            <div class="al-chat-bubble">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        messages.appendChild(typing);
        messages.scrollTop = messages.scrollHeight;

        return typing;
    }

    async function sendMessage(text = null) {
        const message = (text ?? input.value).trim();

        if (!message) return;

        input.value = "";
        input.style.height = "auto";

        addMessage(message, "user");

        const previousHistory = [...history];

        history.push({
            role: "user",
            content: message
        });

        send.disabled = true;
        input.disabled = true;

        const typing = showTyping();

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message,
                    history: previousHistory
                })
            });

            const data = await response.json();

            typing.remove();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong.");
            }

            const reply =
                data.reply ||
                "Sorry, I couldn't generate a response.";

            addMessage(reply, "assistant");

            history.push({
                role: "assistant",
                content: reply
            });

            if (history.length > 12) {
                history = history.slice(-12);
            }

        } catch (error) {
            typing.remove();

            addMessage(
                "I'm having trouble connecting right now. Please try again in a moment.",
                "error"
            );

            console.error("AutomateLabs chatbot error:", error);

        } finally {
            send.disabled = false;
            input.disabled = false;
            input.focus();
        }
    }

    launcher.addEventListener("click", openChat);
    close.addEventListener("click", closeChat);

    send.addEventListener("click", () => {
        sendMessage();
    });

    input.addEventListener("keydown", event => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }

        if (event.key === "Escape") {
            closeChat();
        }
    });

    input.addEventListener("input", () => {
        input.style.height = "auto";
        input.style.height =
            Math.min(input.scrollHeight, 120) + "px";
    });
})();
